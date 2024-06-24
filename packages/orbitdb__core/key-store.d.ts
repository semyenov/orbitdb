import * as crypto from '@libp2p/crypto';
import { PrivateKey } from '@libp2p/interface';

import { Storage } from "./storage";

interface KeyStoreOptions {
  storage?: Storage;
  path?: string;
}

interface KeyObject {
  publicKey: Uint8Array;
  privateKey: Uint8Array;
}

interface KeyStoreInstance {
  addKey(id: string, key: KeyObject): Promise<void>;
  clear(): Promise<void>;
  close(): Promise<void>;
  createKey(id: string): Promise<PrivateKey<crypto.keys.KeyTypes>>;
  getKey(id: string): Promise<crypto.keys.Secp256k1PrivateKey>;
  getPublic(keys: PrivateKey<crypto.keys.KeyTypes>, options: { format: "hex" }): Promise<string>;
  getPublic(keys: PrivateKey<crypto.keys.KeyTypes>, options: { format: "buffer" }): Promise<Uint8Array>;
  hasKey(id: string): Promise<boolean>;
}

declare function KeyStore(options?: KeyStoreOptions): Promise<KeyStoreInstance>;

export {
  KeyStore,
  KeyStoreOptions,
  KeyObject,
  KeyStoreInstance
};
