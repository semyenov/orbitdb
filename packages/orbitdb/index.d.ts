import { PeerId } from "@libp2p/interface";

import { IPFS } from './ipfs';

import {
  Identities,
  IdentityInstance,
  IdentitiesInstance,
  useIdentityProvider,
  Identity,
  isEqual,
  decodeIdentity,
  isIdentity,
  getIdentityProvider,
  PublicKeyIdentityProvider,
  IdentityProviderInstance,
  IdentityProvider,
  IdentityOptions,
} from './identities';

import {
  OrbitDBAccessController,
  AccessControllerInstance,
  OrbitDBAccessControllerInstance,
  IPFSAccessController,
  useAccessController,
  AccessController
} from "./access-controller";

import {
  KeyStoreInstance,
  KeyStore,
  Secp256k1PrivateKey,
  PrivateKeys,

  signMessage,
  verifyMessage
} from "./key-store";

import { Database, DatabaseOptions, DatabaseInstance } from "./database";
import { ComposedStorage, StorageInstance } from "./storage";
import { OrbitDBAddress, parseAddress, isValidAddress } from './utils';

import {
  DatabaseType,
  DatabaseTypeMap,
  Documents,
  Events,
  KeyValue,
  KeyValueIndexed,
  useDatabaseType,
  DocumentsInstance,
  DocumentsDoc,
  EventsInstance,
  EventsDoc,
  KeyValueIndexedInstance,
  KeyValueInstance,
  KeyValueDoc,
} from './databases';

import { LogEntry, Log, Entry } from './log';
import { IPFSBlockStorage, LRUStorage, LevelStorage, MemoryStorage } from './storage';

type OrbitDBOpenOptions<T, D extends DatabaseType> = {
  type?: D;
  meta?: any;
  sync?: boolean;

  Database?: DatabaseTypeMap<T>[D];
  AccessController?: AccessController<string, AccessControllerInstance>;

  headsStorage?: StorageInstance;
  entryStorage?: StorageInstance;
  indexStorage?: StorageInstance;
  referencesCount?: number;
}

interface OrbitDBInstance {
  id: string;
  ipfs: IPFS;
  directory: string;
  keystore: KeyStoreInstance;
  identity: IdentityInstance;
  peerId: PeerId;

  open<T, D extends DatabaseType>(address: string, options?: OrbitDBOpenOptions<T, D>): Promise<DatabaseTypeMap<T>[D]>;
  stop(): Promise<void>;
}

interface CreateOrbitDBOptions {
  id?: string;
  ipfs: IPFS;
  identity?: IdentityInstance
  identities?: IdentitiesInstance;
  directory?: string;
}

declare function createOrbitDB(options: CreateOrbitDBOptions): OrbitDBInstance;

export {
  OrbitDBAddress,
  CreateOrbitDBOptions,
  OrbitDBOpenOptions,
  OrbitDBInstance,

  DatabaseOptions,
  DatabaseInstance,
  Database,

  // Databases
  DocumentsDoc,
  DocumentsInstance,
  Documents,

  EventsDoc,
  EventsInstance,
  Events,

  KeyValueDoc,
  KeyValueInstance,
  KeyValue,

  KeyValueIndexedInstance,
  KeyValueIndexed,

  // Access Controllers
  OrbitDBAccessControllerInstance,
  OrbitDBAccessController,

  AccessControllerInstance as IPFSAccessControllerInstance,
  IPFSAccessController,

  // Identity
  IdentityProviderInstance,
  IdentityProvider,
  IdentityOptions,

  IdentitiesInstance,
  Identities,

  IdentityInstance,
  Identity,

  PublicKeyIdentityProvider,

  // KeyStore
  PrivateKeys,
  Secp256k1PrivateKey,
  KeyStoreInstance,
  KeyStore,

  // Log
  Entry,
  LogEntry,
  Log,

  // IPFS
  IPFS,

  // Storage
  StorageInstance,
  ComposedStorage,
  MemoryStorage,
  LRUStorage,
  LevelStorage,
  IPFSBlockStorage,

  // Utils
  createOrbitDB,
  parseAddress,
  isValidAddress,
  useDatabaseType,
  useAccessController,
  useIdentityProvider,
  getIdentityProvider,
  decodeIdentity,
  verifyMessage,
  signMessage,
  isIdentity,
  isEqual,
};
