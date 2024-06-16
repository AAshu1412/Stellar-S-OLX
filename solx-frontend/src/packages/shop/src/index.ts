import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CAEMDGD37TBPYEA2LYUFUI5WR5W37RWWE5U7AU7JWQ3ACERAO5WVAPSK",
  }
} as const


export interface AllowanceDataKey {
  from: string;
  spender: string;
}


export interface AllowanceValue {
  amount: i128;
  expiration_ledger: u32;
}

export type DataKey = {tag: "Allowance", values: readonly [AllowanceDataKey]} | {tag: "Balance", values: readonly [string]} | {tag: "State", values: readonly [string]} | {tag: "Admin", values: void};

export type GetData = {tag: "all_data", values: void} | {tag: "specific_user", values: readonly [string]};


export interface Item_place {
  cost: i128;
  name: string;
  nft_hash: string;
  owner: string;
}


export interface Item_own {
  name: string;
  nft_hash: string;
  owner: string;
}


export interface UserDetail {
  address: string;
  itemOwn: Array<Item_own>;
  itemPlace: Array<Item_place>;
  name: string;
  user_balance: i128;
}


export interface TokenMetadata {
  decimal: u32;
  name: string;
  symbol: string;
}

export const Errors = {
  
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({_name, _address}: {_name: string, _address: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a place_item transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  place_item: ({_nft_hash, _name, _owner, _cost}: {_nft_hash: string, _name: string, _owner: string, _cost: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_all_data transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_all_data: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<UserDetail>>>

  /**
   * Construct and simulate a get_user_data transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_data: ({_address}: {_address: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<UserDetail>>

  /**
   * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint: ({to, amount}: {to: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  balance: ({id}: {id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a buy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  buy: ({current_owner, buyer_address, _nft_hash, buy_price}: {current_owner: string, buyer_address: string, _nft_hash: string, buy_price: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAEEFsbG93YW5jZURhdGFLZXkAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAAT",
        "AAAAAQAAAAAAAAAAAAAADkFsbG93YW5jZVZhbHVlAAAAAAACAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABA==",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAEAAAAAAAAACUFsbG93YW5jZQAAAAAAAAEAAAfQAAAAEEFsbG93YW5jZURhdGFLZXkAAAABAAAAAAAAAAdCYWxhbmNlAAAAAAEAAAATAAAAAQAAAAAAAAAFU3RhdGUAAAAAAAABAAAAEwAAAAAAAAAAAAAABUFkbWluAAAA",
        "AAAAAgAAAAAAAAAAAAAAB0dldERhdGEAAAAAAgAAAAAAAAAAAAAACGFsbF9kYXRhAAAAAQAAAAAAAAANc3BlY2lmaWNfdXNlcgAAAAAAAAEAAAAT",
        "AAAAAQAAAAAAAAAAAAAACkl0ZW1fcGxhY2UAAAAAAAQAAAAAAAAABGNvc3QAAAALAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAIbmZ0X2hhc2gAAAAQAAAAAAAAAAVvd25lcgAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAACEl0ZW1fb3duAAAAAwAAAAAAAAAEbmFtZQAAABAAAAAAAAAACG5mdF9oYXNoAAAAEAAAAAAAAAAFb3duZXIAAAAAAAAT",
        "AAAAAQAAAAAAAAAAAAAAClVzZXJEZXRhaWwAAAAAAAUAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAHaXRlbU93bgAAAAPqAAAH0AAAAAhJdGVtX293bgAAAAAAAAAJaXRlbVBsYWNlAAAAAAAD6gAAB9AAAAAKSXRlbV9wbGFjZQAAAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAMdXNlcl9iYWxhbmNlAAAACw==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFX25hbWUAAAAAAAAQAAAAAAAAAAhfYWRkcmVzcwAAABMAAAABAAAABA==",
        "AAAAAAAAAAAAAAAKcGxhY2VfaXRlbQAAAAAABAAAAAAAAAAJX25mdF9oYXNoAAAAAAAAEAAAAAAAAAAFX25hbWUAAAAAAAAQAAAAAAAAAAZfb3duZXIAAAAAABMAAAAAAAAABV9jb3N0AAAAAAAACwAAAAEAAAAE",
        "AAAAAAAAAAAAAAAMZ2V0X2FsbF9kYXRhAAAAAAAAAAEAAAPqAAAH0AAAAApVc2VyRGV0YWlsAAA=",
        "AAAAAAAAAAAAAAANZ2V0X3VzZXJfZGF0YQAAAAAAAAEAAAAAAAAACF9hZGRyZXNzAAAAEwAAAAEAAAfQAAAAClVzZXJEZXRhaWwAAA==",
        "AAAAAAAAAAAAAAAEbWludAAAAAIAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAJpZAAAAAAAEwAAAAEAAAAL",
        "AAAAAAAAAAAAAAADYnV5AAAAAAQAAAAAAAAADWN1cnJlbnRfb3duZXIAAAAAAAATAAAAAAAAAA1idXllcl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAJX25mdF9oYXNoAAAAAAAAEAAAAAAAAAAJYnV5X3ByaWNlAAAAAAAACwAAAAA=",
        "AAAAAQAAAAAAAAAAAAAADVRva2VuTWV0YWRhdGEAAAAAAAADAAAAAAAAAAdkZWNpbWFsAAAAAAQAAAAAAAAABG5hbWUAAAAQAAAAAAAAAAZzeW1ib2wAAAAAABA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<u32>,
        place_item: this.txFromJSON<u32>,
        get_all_data: this.txFromJSON<Array<UserDetail>>,
        get_user_data: this.txFromJSON<UserDetail>,
        mint: this.txFromJSON<null>,
        balance: this.txFromJSON<i128>,
        buy: this.txFromJSON<null>
  }
}