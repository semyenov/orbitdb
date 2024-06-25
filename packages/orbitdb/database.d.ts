import type { AccessControllerInstance } from './access-controller'
import type { DatabaseEvents } from './events'
import type { IdentityInstance } from './identities'
import type { IPFS } from './ipfs'
import type { Entry, LogInstance } from './log'
import type { StorageInstance } from './storage'
import type { SyncInstance } from './sync'
import type { PeerId } from '@libp2p/interface'

interface DatabaseOptions<T> {
  ipfs: IPFS
  identity?: IdentityInstance
  accessController?: AccessControllerInstance
  address?: string
  name?: string
  directory?: string
  meta?: any
  headsStorage?: StorageInstance
  entryStorage?: StorageInstance
  indexStorage?: StorageInstance
  referencesCount?: number
  syncAutomatically?: boolean
  onUpdate?: (entry: Entry.EntryInstance<T>) => void
}
interface DatabaseInstance<T> {
  name?: string
  address?: string
  peers: Set<PeerId>
  indexBy: keyof T
  type: string
  meta: any

  events: DatabaseEvents<T>
  access?: AccessControllerInstance
  identity?: IdentityInstance
  log: LogInstance<T>
  sync: SyncInstance<T>

  addOperation(op: any): Promise<string>
  close(): Promise<void>
  drop(): Promise<void>
}
declare function Database<T>(
  options: DatabaseOptions<T>,
): Promise<DatabaseInstance<T>>

export type { DatabaseInstance, DatabaseOptions }
export { Database }
