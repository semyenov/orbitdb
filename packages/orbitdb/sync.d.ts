import type { SyncEvents } from './events'
import type { IPFS } from './ipfs'
import type { Entry, LogInstance } from './log'
import type { PeerId } from '@libp2p/interface'

interface SyncOptions<T> {
  ipfs: IPFS
  log: LogInstance<T>
  events?: SyncEvents<T>
  start?: boolean

  onSynced?: (peerId: PeerId, heads: Entry.EntryInstance<T>[]) => void
}
interface SyncInstance<T> {
  events: SyncEvents<T>
  peers: Set<PeerId>

  start: () => Promise<void>
  stop: () => Promise<void>
  add(entry: Entry.EntryInstance<T>): void
}
declare function Sync<T>(options: SyncOptions<T>): Promise<SyncInstance<T>>

export type { SyncInstance, SyncOptions }

export { Sync }
