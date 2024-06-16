import * as Client from '../hello_world/src';
import { rpcUrl } from './util';

export default new Client.Client({
  ...Client.networks.testnet,
  rpcUrl,
  allowHttp: true,
  publicKey: undefined,
});
