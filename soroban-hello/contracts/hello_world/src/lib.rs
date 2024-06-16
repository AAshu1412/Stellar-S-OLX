#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token, vec, Address, Bytes, Env, Map,
    String, Symbol, Vec,
};
use soroban_token_sdk::TokenUtils;

mod admin;
mod balance;
mod storage_types;

use crate::admin::{has_administrator, read_administrator, write_administrator};
use crate::balance::{read_balance, receive_balance, spend_balance};
use crate::storage_types::{INSTANCE_BUMP_AMOUNT, INSTANCE_LIFETIME_THRESHOLD};

#[contracttype]
#[derive(Clone)]
pub enum GetData {
    AllData,
    SpecificUser(Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct ItemPlace {
    pub nft_hash: String,
    pub name: String,
    pub owner: Address,
    pub cost: i128,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct ItemOwn {
    pub nft_hash: String,
    pub name: String,
    pub owner: Address,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct UserDetail {
    pub name: String,
    pub address: Address,
    pub user_balance: i128,
    pub item_place: Vec<ItemPlace>,
    pub item_own: Vec<ItemOwn>,
}

fn check_nonnegative_amount(amount: i128) {
    if amount < 0 {
        panic!("negative amount is not allowed: {}", amount);
    }
}

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn initialize(env: Env, name: String, address: Address) -> u32 {
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        let balance = read_balance(&env, address.clone());

        let mut all_data: Vec<UserDetail> = env.storage().instance().get(&GetData::AllData).unwrap_or(Vec::new(&env));
        let user_details = UserDetail {
            name,
            address: address.clone(),
            user_balance: balance,
            item_place: Vec::new(&env),
            item_own: Vec::new(&env),
        };
        all_data.push_back(user_details.clone());
        env.storage().instance().set(&GetData::SpecificUser(address.clone()), &user_details);
        env.storage().instance().set(&GetData::AllData, &all_data);
        env.storage().instance().extend_ttl(100, 100);
        1
    }

    pub fn place_item(env: Env, nft_hash: String, name: String, owner: Address, cost: i128) -> u32 {
        let item_place = ItemPlace {
            nft_hash,
            name,
            owner: owner.clone(),
            cost,
        };
        let mut all_data: Vec<UserDetail> = env.storage().instance().get(&GetData::AllData).unwrap_or(Vec::new(&env));

        for mut user in all_data.iter() {
            if user.address == owner {
                user.item_place.push_back(item_place.clone());
            }
        }
        env.storage().instance().set(&GetData::AllData, &all_data);

        let specific_user_default = UserDetail {
            name: String::from_str(&env, ""),
            address: owner.clone(),
            user_balance: 0,
            item_place: Vec::new(&env),
            item_own: Vec::new(&env),
        };

        let specific_user: UserDetail = env.storage().instance().get(&GetData::SpecificUser(owner.clone())).unwrap_or(specific_user_default);
        env.storage().instance().set(&GetData::SpecificUser(owner.clone()), &specific_user);
        env.storage().instance().extend_ttl(100, 100);
        1
    }

    pub fn get_all_data(env: Env) -> Vec<UserDetail> {
        env.storage().instance().get(&GetData::AllData).unwrap_or(Vec::new(&env))
    }

    pub fn get_user_data(env: Env, address: Address) -> UserDetail {
        let specific_user_default = UserDetail {
            name: String::from_str(&env, ""),
            address: address.clone(),
            user_balance: 0,
            item_place: Vec::new(&env),
            item_own: Vec::new(&env),
        };
        env.storage().instance().get(&GetData::SpecificUser(address.clone())).unwrap_or(specific_user_default)
    }

    pub fn mint(env: Env, to: Address, amount: i128) {
        check_nonnegative_amount(amount);
        let admin = read_administrator(&env);
        to.require_auth();
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        receive_balance(&env, to.clone(), amount);
        TokenUtils::new(&env).events().mint(admin, to, amount);
    }

    pub fn balance(env: Env, id: Address) -> i128 {
        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        read_balance(&env, id)
    }

    pub fn buy(env: Env, current_owner: Address, buyer_address: Address, nft_hash: String, buy_price: i128) {
        buyer_address.require_auth();

        let specific_user_default = UserDetail {
            name: String::from_str(&env, ""),
            address: current_owner.clone(),
            user_balance: 0,
            item_place: Vec::new(&env),
            item_own: Vec::new(&env),
        };

        let mut seller: UserDetail = env.storage().instance().get(&GetData::SpecificUser(current_owner.clone())).unwrap_or(specific_user_default.clone());
        let mut buyer: UserDetail = env.storage().instance().get(&GetData::SpecificUser(buyer_address.clone())).unwrap_or(specific_user_default);

        if buyer.user_balance < buy_price {
            panic!("Not enough money");
        }

        check_nonnegative_amount(buy_price);

        env.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        spend_balance(&env, buyer_address.clone(), buy_price);
        receive_balance(&env, current_owner.clone(), buy_price);
        TokenUtils::new(&env).events().transfer(buyer_address.clone(), current_owner.clone(), buy_price);

        let own_item = ItemOwn {
            nft_hash: nft_hash.clone(),
            name: buyer.name.clone(),
            owner: buyer_address.clone(),
        };

        let mut finding_index = 0;
        for search_nft_hash in seller.item_place.iter() {
            if nft_hash == search_nft_hash.nft_hash && current_owner == search_nft_hash.owner {
                if buy_price < search_nft_hash.cost {
                    panic!("Not enough funds to buy this product");
                }
                seller.user_balance = read_balance(&env, current_owner.clone());
                buyer.user_balance = read_balance(&env, buyer_address.clone());
                seller.item_place.remove(finding_index);
                buyer.item_own.push_back(own_item);
                break;
            }
            finding_index += 1;
        }

        env.storage().instance().set(&GetData::SpecificUser(current_owner.clone()), &seller);
        env.storage().instance().set(&GetData::SpecificUser(buyer_address.clone()), &buyer);

        let mut all_data: Vec<UserDetail> = env.storage().instance().get(&GetData::AllData).unwrap_or(Vec::new(&env));
        let mut finding_index = 0;
        for user in all_data.iter() {
            if user.address == current_owner {
                all_data.remove(finding_index);
                all_data.push_back(seller.clone());
            } else if user.address == buyer_address {
                all_data.remove(finding_index);
                all_data.push_back(buyer.clone());
            } 
            finding_index += 1;
        }
    }
}
