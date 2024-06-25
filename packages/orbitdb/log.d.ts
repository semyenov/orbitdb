import type { AccessControllerInstance } from './access-controller'
import type { IdentityInstance } from './identities'
import type { IPFS } from './ipfs'
import type { StorageInstance } from './storage'

interface Clock {
  id: string
  time: number
}

export namespace Entry {
  export interface EntryInstance<T = unknown> {
    id: string
    payload: {
      op: 'PUT' | 'DEL'
      key: string
      value: T
    }
    hash: string
    next: string[]
    refs: string[]
    clock: Clock
    v: number
    key: string
    identity: string
    sig: string
  }

  export function create<T>(
    identity: IdentityInstance,
    id: string,
    payload: any,
    clock?: any,
    next?: Array<string | EntryInstance<T>>,
    refs?: Array<string | EntryInstance<T>>,
  ): Promise<EntryInstance<T>>
  export function verify<T>(
    identities: IdentityInstance,
    entry: EntryInstance<T>,
  ): Promise<boolean>
  export function isEntry(obj: unknown): boolean
  export function isEqual<T>(a: EntryInstance<T>, b: EntryInstance<T>): boolean
  export function decode<T>(bytes: Uint8Array): Promise<EntryInstance<T>>
  export function encode<T>(entry: EntryInstance<T>): Promise<Uint8Array>
}

interface LogIteratorOptions {
  gt?: string
  gte?: string
  lt?: string
  lte?: string
  amount?: number
}
interface LogAppendOptions {
  referencesCount: number
}
interface LogOptions<T> {
  logId?: string
  logHeads?: Entry.EntryInstance<T>[]
  access?: AccessControllerInstance
  entries?: Entry.EntryInstance<T>[]
  entryStorage?: StorageInstance
  headsStorage?: StorageInstance
  indexStorage?: StorageInstance
  sortFn?: (a: Entry.EntryInstance<T>, b: Entry.EntryInstance<T>) => number
}
interface LogInstance<T> {
  id: string

  access?: AccessControllerInstance
  identity: IdentityInstance
  storage: StorageInstance

  clock(): Promise<Clock>
  heads(): Promise<Entry.EntryInstance<T>[]>
  values(): Promise<Entry.EntryInstance<T>[]>
  all(): Promise<Entry.EntryInstance<T>[]>
  get(hash: string): Promise<Entry.EntryInstance<T> | undefined>
  has: (hash: string) => Promise<boolean>
  append(
    payload: T,
    options?: LogAppendOptions,
  ): Promise<Entry.EntryInstance<T>>
  join(log: LogInstance<T>): Promise<void>
  joinEntry(entry: Entry.EntryInstance<T>): Promise<void>
  traverse(): AsyncGenerator<Entry.EntryInstance<T>>
  iterator(options?: LogIteratorOptions): AsyncIterable<Entry.EntryInstance<T>>
  clear(): Promise<void>
  close(): Promise<void>
}
declare function Log<T>(
  ipfs: IPFS,
  identity: IdentityInstance,
  options?: LogOptions<T>,
): Promise<LogInstance<T>>

export type {
  Clock,
  LogAppendOptions,
  LogInstance,
  LogIteratorOptions,
  LogOptions,
}
export { Log }
