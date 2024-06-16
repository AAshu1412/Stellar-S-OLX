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
    contractId: "CA2MWV2ET76WDPXW4AG5UI6FTKOUHVKWQ43MURIBIB6PBT54XPCAWFVN",
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

export type GetData = {tag: "AllData", values: void} | {tag: "SpecificUser", values: readonly [string]};


export interface ItemPlace {
  cost: i128;
  name: string;
  nft_hash: string;
  owner: string;
}


export interface ItemOwn {
  name: string;
  nft_hash: string;
  owner: string;
}


export interface UserDetail {
  address: string;
  item_own: Array<ItemOwn>;
  item_place: Array<ItemPlace>;
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
  initialize: ({name, address}: {name: string, address: string}, options?: {
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
  place_item: ({nft_hash, name, owner, cost}: {nft_hash: string, name: string, owner: string, cost: i128}, options?: {
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
  get_user_data: ({address}: {address: string}, options?: {
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
  buy: ({current_owner, buyer_address, nft_hash, buy_price}: {current_owner: string, buyer_address: string, nft_hash: string, buy_price: i128}, options?: {
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
        "AAAAAgAAAAAAAAAAAAAAB0dldERhdGEAAAAAAgAAAAAAAAAAAAAAB0FsbERhdGEAAAAAAQAAAAAAAAAMU3BlY2lmaWNVc2VyAAAAAQAAABM=",
        "AAAAAQAAAAAAAAAAAAAACUl0ZW1QbGFjZQAAAAAAAAQAAAAAAAAABGNvc3QAAAALAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAIbmZ0X2hhc2gAAAAQAAAAAAAAAAVvd25lcgAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAAB0l0ZW1Pd24AAAAAAwAAAAAAAAAEbmFtZQAAABAAAAAAAAAACG5mdF9oYXNoAAAAEAAAAAAAAAAFb3duZXIAAAAAAAAT",
        "AAAAAQAAAAAAAAAAAAAAClVzZXJEZXRhaWwAAAAAAAUAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAIaXRlbV9vd24AAAPqAAAH0AAAAAdJdGVtT3duAAAAAAAAAAAKaXRlbV9wbGFjZQAAAAAD6gAAB9AAAAAJSXRlbVBsYWNlAAAAAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAMdXNlcl9iYWxhbmNlAAAACw==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAEbmFtZQAAABAAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAEAAAAE",
        "AAAAAAAAAAAAAAAKcGxhY2VfaXRlbQAAAAAABAAAAAAAAAAIbmZ0X2hhc2gAAAAQAAAAAAAAAARuYW1lAAAAEAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAARjb3N0AAAACwAAAAEAAAAE",
        "AAAAAAAAAAAAAAAMZ2V0X2FsbF9kYXRhAAAAAAAAAAEAAAPqAAAH0AAAAApVc2VyRGV0YWlsAAA=",
        "AAAAAAAAAAAAAAANZ2V0X3VzZXJfZGF0YQAAAAAAAAEAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAEAAAfQAAAAClVzZXJEZXRhaWwAAA==",
        "AAAAAAAAAAAAAAAEbWludAAAAAIAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAJpZAAAAAAAEwAAAAEAAAAL",
        "AAAAAAAAAAAAAAADYnV5AAAAAAQAAAAAAAAADWN1cnJlbnRfb3duZXIAAAAAAAATAAAAAAAAAA1idXllcl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAIbmZ0X2hhc2gAAAAQAAAAAAAAAAlidXlfcHJpY2UAAAAAAAALAAAAAA==",
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