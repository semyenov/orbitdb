import { Secp256k1PrivateKey } from "@libp2p/crypto";
import { Uint8Array } from "uint8arrays";

declare interface IdentityProvider {
  type: string;
  verifyIdentity(identity: Identity): boolean;
}

// Existing interfaces and types
declare interface Signatures {
  id: string;
  publicKey: string;
}

declare interface IdentityOptions {
  id?: string;
  publicKey?: string;
  signatures?: Signatures;
  type?: string;
  sign?: (data: any) => Promise<string>;
  verify?: (signature: string, data: any) => boolean;
}

declare interface Identity {
  id: string;
  publicKey: string;
  signatures: Signatures;
  type: string;
  sign: (data: any) => Promise<string>;
  verify: (signature: string, data: any) => boolean;
  hash: string;
  bytes: Uint8Array;
}

// Namespace for Identity utility functions
declare namespace Identity {
  function createIdentity(options: IdentityOptions): Promise<Identity>;
  function encodeIdentity(
    identity: Identity,
  ): Promise<{ hash: string; bytes: Uint8Array }>;
  function decodeIdentity(bytes: Uint8Array): Promise<Identity>;
  function isIdentity(identity: Identity): boolean;
  function isEqual(a: Identity, b: Identity): boolean;
}

// import { KeyStore, signMessage, verifyMessage } from "../key-store";
// import {
//   ComposedStorage,
//   IPFSBlockStorage,
//   LRUStorage,
//   MemoryStorage,
// } from "../storage/index";
// import { PathJoin } from "../utils/path-join"; // Assuming PathJoin is a utility for joining paths

// key-store.d.ts

interface StorageOptions {
  size?: number;
}

interface StorageInstance {
  put: (hash: string, data: any) => Promise<void>;
  get: (hash: string) => Promise<any | undefined>;
  del: (hash: string) => Promise<void>;
  iterator: (
    options?: { amount?: number; reverse?: boolean },
  ) => AsyncIterable<[string, string]>;
  merge: (other: StorageInstance) => Promise<void>;
  clear: () => Promise<void>;
  close: () => Promise<void>;
}

interface ComposedStorageOptions {
  storage1: StorageInstance;
  storage2: StorageInstance;
}

interface ComposedStorageInstance extends StorageInstance {}

declare function ComposedStorage(
  storage1: StorageInstance,
  storage2: StorageInstance,
): Promise<ComposedStorageInstance>;

interface KeyStoreOptions {
  storage?: ReturnType<typeof ComposedStorage>;
  path?: string;
}

interface KeyStoreInstance {
  clear: () => Promise<void>;
  close: () => Promise<void>;
  hasKey: (id: string) => Promise<boolean>;
  addKey: (id: string, key: Secp256k1PrivateKey) => Promise<void>;
  createKey: (id: string) => Promise<Secp256k1PrivateKey>;
  getKey: (id: string) => Promise<Secp256k1PrivateKey | undefined>;
  getPublic: (
    keys: { publicKey: Uint8Array; privateKey: Uint8Array },
    options?: { format?: "hex" | "buffer" },
  ) => Uint8Array | string;
}

declare function KeyStore(options?: KeyStoreOptions): Promise<KeyStoreInstance>;

function verifyMessage(
  signature: string,
  publicKey: string,
  data: string | Uint8Array,
): Promise<boolean>;

function signMessage(
  key: Secp256k1PrivateKey,
  data: string | Uint8Array,
): Promise<string>;

interface IdentitiesConstructorOptions {
  keystore?: KeyStore;
  path?: string;
  storage?: StorageInstance;
  ipfs?: any; // Replace 'any' with the appropriate type for IPFS if available
}

interface StorageInstance {
  get<T>(key: string): Promise<T | undefined>;
  put<T>(key: string, value: T): Promise<void>;
}

class Identities {
  private keystore: KeyStore;
  private storage: StorageInstance;
  private verifiedIdentitiesCache: LRUStorage;

  constructor(options: IdentitiesConstructorOptions = {}) {
    this.keystore = options.keystore ||
      await KeyStore({ path: options.path || "./orbitdb/identities" });
    this.storage = options.storage || this.configureStorage(options.ipfs);
    this.verifiedIdentitiesCache = await LRUStorage({ size: 1000 });
  }

  private configureStorage(ipfs?: any): StorageInstance {
    if (ipfs) {
      return await ComposedStorage(
        await LRUStorage({ size: 1000 }),
        await IPFSBlockStorage({ ipfs, pin: true }),
      );
    }
    return await MemoryStorage();
  }

  async getIdentity(hash: string): Promise<Identity | undefined>;
  async createIdentity(options: any): Promise<Identity>; // Specify a more precise type for 'options'
  async verifyIdentity(identity: Identity): Promise<boolean>;
  async sign(data: string, identity: Identity): Promise<string>;
  async verify(
    signature: string,
    publicKey: string,
    data: string,
  ): Promise<boolean>;
  get keystore(): KeyStore;
}

type Orbit = Awaited<ReturnType<typeof createOrbitDB>>;
type OrbitOptions = {
  id?: string;
  identity?: Identity | { provider: IdentityProvider };
  identities?: Identities;
  directory?: string;
};

// // Declareing everything for external use
// declare {
//   Identities,
//   Identity,
//   Identity,
//   IdentityOptions,
//   IdentityProvider,
//   OrbitDB,
//   OrbitDBOptions,
//   Signatures,
// };
