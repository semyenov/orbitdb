import type {
  AccessController,
  AccessControllerInstance,
} from './access-controller'
import type { DatabaseType, DatabaseTypeMap } from './databases'
import type { IdentitiesInstance, IdentityInstance } from './identities'
import type { IPFS, PeerId } from './ipfs'
import type { KeyStoreInstance } from './key-store'
import type { StorageInstance } from './storage'

interface OrbitDBOpenOptions<T, D extends DatabaseType> {
  type?: D
  meta?: any
  sync?: boolean
  referencesCount?: number

  Database?: DatabaseTypeMap<T>[D]
  AccessController?: AccessController<string, AccessControllerInstance>

  headsStorage?: StorageInstance
  entryStorage?: StorageInstance
  indexStorage?: StorageInstance
}
interface OrbitDBOptions {
  id?: string
  ipfs: IPFS
  identity?: IdentityInstance
  identities?: IdentitiesInstance
  directory?: string
}

interface OrbitDBInstance {
  id: string
  ipfs: IPFS
  directory: string
  keystore: KeyStoreInstance
  identity: IdentityInstance
  peerId: PeerId

  open<T, D extends DatabaseType>(
    address: string,
    options?: OrbitDBOpenOptions<T, D>,
  ): Promise<DatabaseTypeMap<T>[D]>
  stop(): Promise<void>
}
declare function OrbitDB(options: OrbitDBOptions): OrbitDBInstance

export type { OrbitDBOptions as CreateOrbitDBOptions, OrbitDBInstance, OrbitDBOpenOptions }
export { OrbitDB as createOrbitDB }

export type { IPFS, PeerId } from './ipfs'

export type {
  KeyStoreInstance,
  PrivateKeys,
  Secp256k1PrivateKey,
} from './key-store'
export { KeyStore, signMessage, verifyMessage } from './key-store'

export type {
  AccessController,
  AccessControllerInstance,
  OrbitDBAccessControllerInstance,
} from './access-controller'
export {
  IPFSAccessController,
  OrbitDBAccessController,
  useAccessController,
} from './access-controller'

export type { DatabaseInstance, DatabaseOptions } from './database'
export { Database } from './database'

export type {
  DatabaseType,
  DatabaseTypeMap,
  DocumentsDoc,
  DocumentsInstance,
  EventsDoc,
  EventsInstance,
  KeyValueDoc,
  KeyValueIndexedInstance,
  KeyValueInstance,
  useDatabaseType,
} from './databases'
export { Documents, Events, KeyValue, KeyValueIndexed } from './databases'

export type {
  IdentitiesInstance,
  IdentityInstance,
  IdentityOptions,
  IdentityProvider,
  IdentityProviderInstance,
} from './identities'
export {
  decodeIdentity,
  getIdentityProvider,
  Identities,
  Identity,
  isEqual,
  isIdentity,
  PublicKeyIdentityProvider,
  useIdentityProvider,
} from './identities'

export { Entry, Log } from './log'

export {
  ComposedStorage,
  IPFSBlockStorage,
  LevelStorage,
  LRUStorage,
  MemoryStorage,
  StorageInstance,
} from './storage'

export type { OrbitDBAddress } from './utils'
export { isValidAddress, parseAddress } from './utils'
