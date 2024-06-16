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
pub enum DataKey {
    all_data,
    specific_user(Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct Item_place {
    pub nft_hash: String,
    pub name: String,
    pub owner: Address,
    pub cost: i128,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct Item_own {
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
    pub itemPlace: Vec<Item_place>,
    pub itemOwn: Vec<Item_own>,
}

fn check_nonnegative_amount(amount: i128) {
    if amount < 0 {
        panic!("negative amount is not allowed: {}", amount)
    }
}

// Bytes::from_slice(
//         &e,
//     &[
//         0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
//         0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01,
//         0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
//         0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
//         0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
//         0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
//         0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02,
//     ],
// )

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn initialize(env: Env, _name: String, _address: Address) -> u32 {
        let user = token::Client::new(&env, &_address);
        // let mut op=Map::<Address, UserDetail>::new(&env);

        // init allData
        // let mut allData = Vec::<UserDetail>::new(&env);

        // let mut count:u32 = 69;
        // env.storage().instance().set(&symbol_short!("uwu"), &count);

        // set all data
        // env.storage().instance().set(&symbol_short!("all_data"), &allData);

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        let _balance = read_balance(&env, _address.clone());

        // get all data
        let mut allD: Vec<UserDetail> = env
            .storage()
            .instance()
            .get(&DataKey::all_data)
            .unwrap_or(Vec::new(&env));
        let mut _userDetails = UserDetail {
            name: _name,
            address: _address.clone(),
            user_balance: _balance,
            itemPlace: Vec::new(&env),
            itemOwn: Vec::new(&env),
        };
        allD.push_back(_userDetails.clone());
        env.storage()
            .instance()
            .set(&DataKey::specific_user(_address.clone()), &_userDetails);
        env.storage().instance().set(&DataKey::all_data, &allD);
        env.storage().instance().extend_ttl(100, 100);
        1
    }

    pub fn place_item(
        env: Env,
        _nft_hash: String,
        _name: String,
        _owner: Address,
        _cost: i128,
    ) -> u32 {
        let mut _item_place = Item_place {
            nft_hash: _nft_hash,
            name: _name,
            owner: _owner.clone(),
            cost: _cost,
        };
        let mut allD: Vec<UserDetail> = env
            .storage()
            .instance()
            .get(&DataKey::all_data)
            .unwrap_or(Vec::new(&env));

        for mut users in allD.iter() {
            if users.address == _owner {
                users.itemPlace.push_back(_item_place.clone());
            }
        }
        env.storage().instance().set(&DataKey::all_data, &allD);

        let specific_user_default = UserDetail {
            name: String::from_str(&env, ""),
            address: _owner.clone(),
            user_balance: 0,
            itemPlace: Vec::new(&env),
            itemOwn: Vec::new(&env),
        };

        let mut _specific_user: UserDetail = env
            .storage()
            .instance()
            .get(&DataKey::specific_user(_owner.clone()))
            .unwrap_or(specific_user_default);
        env.storage()
            .instance()
            .set(&DataKey::specific_user(_owner.clone()), &_specific_user);
        env.storage().instance().extend_ttl(100, 100);
        1
    }

    pub fn get_all_data(env: Env) -> Vec<UserDetail> {
        let mut allD: Vec<UserDetail> = env
            .storage()
            .instance()
            .get(&DataKey::all_data)
            .unwrap_or(Vec::new(&env));
        allD
    }

    pub fn get_user_data(env: Env, _address: Address) -> UserDetail {
        let specific_user_default = UserDetail {
            name: String::from_str(&env, ""),
            address: _address.clone(),
            user_balance: 0,
            itemPlace: Vec::new(&env),
            itemOwn: Vec::new(&env),
        };
        let mut _specific_user: UserDetail = env
            .storage()
            .instance()
            .get(&DataKey::specific_user(_address.clone()))
            .unwrap_or(specific_user_default);
        _specific_user
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////

    pub fn mint(e: Env, to: Address, amount: i128) {
        check_nonnegative_amount(amount);
        let admin = read_administrator(&e);
        to.require_auth();

        e.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        receive_balance(&e, to.clone(), amount);
        TokenUtils::new(&e).events().mint(admin, to, amount);
    }

    pub fn balance(e: Env, id: Address) -> i128 {
        e.storage().instance().extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);
        read_balance(&e, id)
    }

    pub fn buy(e: Env,current_owner: Address,buyer_address: Address,_nft_hash: String,buy_price: i128,) {

        buyer_address.require_auth();

        let specific_user_default = UserDetail {
            name: String::from_str(&e, ""),
            address: current_owner.clone(),
            user_balance: 0,
            itemPlace: Vec::new(&e),
            itemOwn: Vec::new(&e),
        };
        let mut seller: UserDetail = e.storage().instance().get(&DataKey::specific_user(current_owner.clone())).unwrap_or(specific_user_default.clone());
        let mut buyer: UserDetail = e.storage().instance().get(&DataKey::specific_user(buyer_address.clone())).unwrap_or(specific_user_default);

        if buyer.user_balance < buy_price {
            panic!("Not enough money");
        }

        check_nonnegative_amount(buy_price);

        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        spend_balance(&e, buyer_address.clone(), buy_price);
        receive_balance(&e, current_owner.clone(), buy_price);
        TokenUtils::new(&e).events().transfer(
            buyer_address.clone(),
            current_owner.clone(),
            buy_price,
        );

        let own_item = Item_own {
            nft_hash: _nft_hash.clone(),
            name: buyer.name.clone(),
            owner: buyer_address.clone(),
        };

        let mut finding_index = 0;
        for mut search_nft_hash in seller.itemPlace.iter() {
            if _nft_hash == search_nft_hash.nft_hash && current_owner == search_nft_hash.owner {
                if buy_price < search_nft_hash.cost{
                    panic!("Not enough funds to buy this product");
                }
                seller.user_balance = read_balance(&e, current_owner.clone());
                buyer.user_balance = read_balance(&e, buyer_address.clone());
                seller.itemPlace.remove(finding_index);
                buyer.itemOwn.push_back(own_item);
                break;
            }
            finding_index += 1;
        }

        e.storage().instance().set(&DataKey::specific_user(current_owner.clone()), &seller);
        e.storage().instance().set(&DataKey::specific_user(buyer_address.clone()), &buyer);

        let mut allD: Vec<UserDetail> = e.storage().instance().get(&DataKey::all_data).unwrap_or(Vec::new(&e));
        let mut finding_index = 0;
        for mut users in allD.iter() {
            if users.address == current_owner {
                allD.remove(finding_index);
                allD.push_back(seller.clone());
            } else if users.address == buyer_address {
                allD.remove(finding_index);
                allD.push_back(buyer.clone());
            } else {
                panic!("Seller and Buyer address not found");
            }
            finding_index += 1;
        }
    }
}

// mod test;
