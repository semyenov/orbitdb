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

type PrivateKeys = PrivateKey<crypto.keys.KeyTypes>;

type Secp256k1PrivateKey = crypto.keys.Secp256k1PrivateKey;
interface KeyStoreInstance {
  addKey(id: string, key: KeyObject): Promise<void>;
  clear(): Promise<void>;
  close(): Promise<void>;
  createKey(id: string): Promise<PrivateKeys>;
  getKey(id: string): Promise<Secp256k1PrivateKey>;
  getPublic(keys: PrivateKeys, options?: { format: "hex" }): Promise<string>;
  getPublic(keys: PrivateKeys, options?: { format: "buffer" }): Promise<Uint8Array>;
  hasKey(id: string): Promise<boolean>;
}


declare function KeyStore(options?: KeyStoreOptions): Promise<KeyStoreInstance>;

declare function verifyMessage(signature: string, publicKey: string, data: string | Uint8Array): Promise<boolean>;
declare function signMessage(key: Secp256k1PrivateKey, data: string | Uint8Array): Promise<string>;

export {
  KeyStore,
  KeyStoreOptions,
  KeyObject,
  KeyStoreInstance,
	Secp256k1PrivateKey,
	PrivateKeys,

	verifyMessage,
	signMessage
};
