import { PeerId } from "@libp2p/interface";

import { IPFS } from './ipfs';
import { Identities, IdentityInstance, IdentitiesInstance, useIdentityProvider } from './identities';
import { AccessControllerTypeMap, AccessControllerType, OrbitDBAccessController } from "./access-controller";
import { Database, DatabaseInstance } from "./database";
import { ComposedStorage, Storage } from "./storage";
import { KeyStoreInstance } from "./key-store";
import { IPFSAccessController } from './access-controller'
import { OrbitDBAddress, parseAddress, isValidAddress } from './utils';
import { DatabaseType, DatabaseTypeMap, DatabasesFunctionTypeMap, Documents, Events, KeyValue, KeyValueIndexed, useDatabaseType } from './databases';
import { LogEntry, Log, Entry } from './log';
import { IPFSBlockStorage, LRUStorage, LevelStorage, MemoryStorage } from './storage';
import { KeyStore } from './key-store';
import { useAccessController } from './access-controller';

type OrbitDBOpenOptions<D extends DatabaseType, T, A extends AccessControllerType> = {
  type?: D;
  meta?: any;
  sync?: boolean;
  Database?: DatabasesFunctionTypeMap<T, A>[D];
  AccessController?: AccessControllerTypeMap[A];
  headsStorage?: Storage;
  entryStorage?: Storage;
  indexStorage?: Storage;
  referencesCount?: number;
}

interface OrbitDBInstance {
  open<D extends DatabaseType, T, A extends AccessControllerType>(address: string, options?: OrbitDBOpenOptions<D, T, A>): Promise<DatabaseTypeMap<T, A>[D]>;
  stop(): Promise<void>;
  id: string;
  ipfs: IPFS;
  directory: string;
  keystore: KeyStoreInstance;
  identity: IdentityInstance;
  peerId: PeerId;
}

interface CreateOrbitDBOptions {
  id?: string;
  ipfs: IPFS;
  identity?: IdentityInstance
  identities?: IdentitiesInstance;
  directory?: string;
}

declare function createOrbitDB<D extends DatabaseType, T, A extends AccessControllerType>(options: CreateOrbitDBOptions): OrbitDBInstance;

export {
  CreateOrbitDBOptions,
  OrbitDBOpenOptions,
  OrbitDBInstance,
  OrbitDBAddress,
  IdentitiesInstance,
  DatabaseInstance,
  LogEntry,
  Entry,

  ComposedStorage,
  Database,
  IPFSAccessController as DefaultAccessController,
  Documents,
  Events,
  IPFSAccessController,
  IPFSBlockStorage,
  Identities,
  KeyStore,
  KeyValue,
  KeyValueIndexed,
  LRUStorage,
  LevelStorage,
  Log,
  MemoryStorage,
  OrbitDBAccessController,
  // PublicKeyIdentityProvider,
  // isIdentity,
  createOrbitDB,
  isValidAddress,
  parseAddress,
  useAccessController,
  useDatabaseType,
  useIdentityProvider,
};
