import type { DatabaseType } from './databases'
import type { StorageInstance } from './storage'
import type { IPFS } from './vendor'

interface Manifest {
  name: string
  type: DatabaseType
  accessController: string
  meta?: any
}

interface ManifestStoreOptions {
  ipfs?: IPFS
  storage?: StorageInstance
}
interface ManifestStoreInstance {
  get(address: string): Promise<Manifest>
  create(manifest: Manifest): Promise<{ hash: string, manifest: Manifest }>
  close(): Promise<void>
}
declare function ManifestStore(
  options?: ManifestStoreOptions,
): Promise<ManifestStoreInstance>

export type { Manifest, ManifestStoreInstance, ManifestStoreOptions }

export { ManifestStore }
