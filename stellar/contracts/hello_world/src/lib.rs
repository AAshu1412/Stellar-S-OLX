#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token, vec, Address, Bytes, Env, Map,
    Symbol, Vec,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    all_data,
    specific_user(Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct Item_place {
    pub nft_hash: Bytes,
    pub name: Bytes,
    pub owner: Address,
    pub cost: i128,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct Item_own {
    pub nft_hash: Bytes,
    pub name: Bytes,
    pub owner: Address,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct UserDetail {
    pub name: Bytes,
    pub address: Address,
    pub user_balance: i128,
    pub itemPlace: Vec<Item_place>,
    pub itemOwn: Vec<Item_own>,
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
    // pub const allData: Vec<UserDetail>;

    pub fn initialize(env: Env, _name: Bytes, _address: Address) -> u32 {

        let user = token::Client::new(&env, &_address);
        // let mut op=Map::<Address, UserDetail>::new(&env);

        // init allData
        // let mut allData = Vec::<UserDetail>::new(&env);

        // let mut count:u32 = 69;
        // env.storage().instance().set(&symbol_short!("uwu"), &count);

        // set all data
        // env.storage().instance().set(&symbol_short!("all_data"), &allData);

        // get all data
        let mut allD: Vec<UserDetail> = env.storage().instance().get(&DataKey::all_data).unwrap_or(Vec::new(&env));
        let mut _userDetails = UserDetail {
            name: _name,
            address: _address.clone(),
            user_balance: user.balance(&_address),
            itemPlace: Vec::new(&env),
            itemOwn: Vec::new(&env),
        };
        allD.push_back(_userDetails.clone());
        env.storage().instance().set(&DataKey::specific_user(_address.clone()), &_userDetails);
        env.storage().instance().set(&DataKey::all_data, &allD);
        env.storage().instance().extend_ttl(100, 100);
        1
    }

    pub fn place_item(env: Env,_nft_hash: Bytes,_name: Bytes,_owner: Address,_cost: i128,) -> u32 {

        let mut _item_place = Item_place {
            nft_hash: _nft_hash,
            name: _name,
            owner: _owner.clone(),
            cost: _cost,
        };
        let mut allD: Vec<UserDetail> = env.storage().instance().get(&DataKey::all_data).unwrap_or(Vec::new(&env));

        for mut users in allD.iter() {
            if users.address == _owner {
                users.itemPlace.push_back(_item_place.clone());
            }
        }
        env.storage().instance().set(&DataKey::all_data, &allD);

        let specific_user_default = UserDetail {
            name: Bytes::new(&env),
            address: _owner.clone(),
            user_balance: 0,
            itemPlace: Vec::new(&env),
            itemOwn: Vec::new(&env),
        };

        let mut _specific_user: UserDetail = env.storage().instance().get(&DataKey::specific_user(_owner.clone())).unwrap_or(specific_user_default);
        env.storage().instance().set(&DataKey::specific_user(_owner.clone()), &_specific_user);
        env.storage().instance().extend_ttl(100, 100);
        1
    }

    
}

mod test;
