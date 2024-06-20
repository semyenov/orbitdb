import { Storage } from "./storage";
import * as crypto from '@libp2p/crypto';
const unmarshal = crypto.keys.supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey
interface KeyStoreParams {
  storage?: Storage;
  path?: string;
}

interface KeyObject {
  publicKey: string;
  privateKey: string;
}

interface KeyStoreInstance {
  addKey(id: string, key: KeyObject): Promise<void>;
  clear(): Promise<void>;
  close(): Promise<void>;
  createKey(id: string): Promise<KeyObject>;
  getKey(id: string): Promise<KeyObject>;
  getPublic(keys: KeyObject, options: { format: "hex" }): Promise<string>;
  getPublic(keys: KeyObject, options: { format: "buffer" }): Promise<Uint8Array>;
  hasKey(id: string): Promise<boolean>;
}

function KeyStore(params?: KeyStoreParams): Promise<KeyStoreInstance>;

export { KeyStore, KeyStoreParams, KeyObject, KeyStoreInstance };
