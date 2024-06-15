#![no_std]
use soroban_sdk::{contract,Bytes, contracttype,contractimpl,token, Address, symbol_short, vec, Env, Symbol, Vec,Map};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct Item_place {
    pub nft_hash: Bytes,
    pub name: Bytes,
    pub owner: Address,
    pub cost: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct Item_own {
    pub nft_hash: Bytes,
    pub name: Bytes,
    pub owner: Address
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
pub struct UserDetail {
    pub name: Bytes,
    pub address: Address,
    pub user_balance:i128,
    pub itemPlace: Vec<Item_place>,
    pub itemOwn: Vec<Item_own>
}
// const env = Env::default();
const COUNTER: Symbol = symbol_short!("COUNTER");


// Bytes::from_slice(
    //     &e,
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
pub struct HelloContract{
    // pub allData:Vec<UserDetail>
}

#[contractimpl]
impl HelloContract {
    // pub const allData: Vec<UserDetail>; 

    pub fn initialize(env: Env,_name:Bytes, _address:Address)->Bytes{
        let user=token::Client::new(&env, &_address);
        let mut op=Map::<Address, UserDetail>::new(&env);
        // env.storage().instance().set(&UserDetail.name, &_name);
        // unsafe {
        //     allData = Vec::new(&env);
        // }

        // init allData
        let mut allData = Vec::<UserDetail>::new(&env);
        
        // let mut data=UserDetail{
        //     name:_name,
        //     address:_address,
        //     user_balance:user.balance(&env,&_address),

        let mut count:u32 = 69;
        env.storage().instance().set(&symbol_short!("uwu"), &count);

        // set all data
        env.storage().instance().set(&symbol_short!("all_data"), &allData);

        // get all data
        let mut allD:Vec<UserDetail> = env.storage().instance().get(&symbol_short!("all_data")).unwrap_or(Vec::new(&env));
            
        // }
        // env.storage().instance().set(&COUNTER, &count);
        // env.storage().instance().extend_ttl(100, 100);
        
    }
}

mod test;
