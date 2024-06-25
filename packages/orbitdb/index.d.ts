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
  AccessControllerTypeMap,
  AccessControllerType,
  OrbitDBAccessController,
  IPFSAccessControllerInstance,
  OrbitDBAccessControllerInstance,
  IPFSAccessController,
  useAccessController
} from "./access-controller";

import {
  KeyStoreInstance,
  KeyStore,
  Secp256k1PrivateKey,
  PrivateKeys,

  signMessage,
  verifyMessage
} from "./key-store";

import { Database, DatabaseInstance } from "./database";
import { ComposedStorage, Storage } from "./storage";
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

type OrbitDBOpenOptions<T, A extends AccessControllerType, D extends DatabaseType> = {
  type?: D;
  meta?: any;
  sync?: boolean;

  Database?: DatabaseTypeMap<T, A>[D];
  AccessController?: AccessControllerTypeMap[A];

  headsStorage?: Storage;
  entryStorage?: Storage;
  indexStorage?: Storage;
  referencesCount?: number;
}

interface OrbitDBInstance {
  id: string;
  ipfs: IPFS;
  directory: string;
  keystore: KeyStoreInstance;
  identity: IdentityInstance;
  peerId: PeerId;

  open<T, A extends AccessControllerType, D extends DatabaseType = 'events'>(address: string, options?: OrbitDBOpenOptions<T, A, D>): Promise<DatabaseTypeMap<T, A>[D]>;
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
  CreateOrbitDBOptions,
  OrbitDBOpenOptions,
  OrbitDBInstance,
  OrbitDBAddress,
  ComposedStorage,

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

  IPFSAccessControllerInstance,
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
  LogEntry,
  Entry,
  Log,

  // IPFS
  IPFS,

  // Storage
  Storage,
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
