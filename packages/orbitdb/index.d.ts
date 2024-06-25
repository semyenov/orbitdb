import type { IPFS, PeerId } from "./ipfs";
import type { IdentitiesInstance, IdentityInstance } from "./identities";
import type {
  AccessController,
  AccessControllerInstance,
} from "./access-controller";
import type { KeyStoreInstance } from "./key-store";
import type { StorageInstance } from "./storage";
import type { DatabaseType, DatabaseTypeMap } from "./databases";

interface OrbitDBOpenOptions<T, D extends DatabaseType> {
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

interface CreateOrbitDBOptions {
  id?: string;
  ipfs: IPFS;
  identity?: IdentityInstance;
  identities?: IdentitiesInstance;
  directory?: string;
}

interface OrbitDBInstance {
  id: string;
  ipfs: IPFS;
  directory: string;
  keystore: KeyStoreInstance;
  identity: IdentityInstance;
  peerId: PeerId;

  open<T, D extends DatabaseType>(
    address: string,
    options?: OrbitDBOpenOptions<T, D>,
  ): Promise<DatabaseTypeMap<T>[D]>;
  stop(): Promise<void>;
}

declare function OrbitDB(options: CreateOrbitDBOptions): OrbitDBInstance;

export type { CreateOrbitDBOptions, OrbitDBInstance, OrbitDBOpenOptions };

export { OrbitDB as createOrbitDB };

export type { IPFS, PeerId } from "./ipfs";

export {
  KeyStore,
  KeyStoreInstance,
  PrivateKeys,
  Secp256k1PrivateKey,
  signMessage,
  verifyMessage,
} from "./key-store";

export {
  AccessController,
  AccessControllerInstance,
  IPFSAccessController,
  OrbitDBAccessController,
  OrbitDBAccessControllerInstance,
  useAccessController,
} from "./access-controller";

export { Database, DatabaseInstance, DatabaseOptions } from "./database";

export {
  DatabaseType,
  DatabaseTypeMap,
  Documents,
  DocumentsDoc,
  DocumentsInstance,
  Events,
  EventsDoc,
  EventsInstance,
  KeyValue,
  KeyValueDoc,
  KeyValueIndexed,
  KeyValueIndexedInstance,
  KeyValueInstance,
  useDatabaseType,
} from "./databases";

export {
  decodeIdentity,
  getIdentityProvider,
  Identities,
  IdentitiesInstance,
  Identity,
  IdentityInstance,
  IdentityOptions,
  IdentityProvider,
  IdentityProviderInstance,
  isEqual,
  isIdentity,
  PublicKeyIdentityProvider,
  useIdentityProvider,
} from "./identities";

export { Entry, Log, LogEntry } from "./log";
export {
  ComposedStorage,
  IPFSBlockStorage,
  LevelStorage,
  LRUStorage,
  MemoryStorage,
  StorageInstance,
} from "./storage";

export { isValidAddress, OrbitDBAddress, parseAddress } from "./utils";
