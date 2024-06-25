import type { AccessControllerInstance } from './access-controller'
import type { IdentityInstance } from './identities'
import type { IPFS } from './ipfs'
import type { StorageInstance } from './storage'

interface Clock {
  id: string
  time: number
}

interface LogEntry<T = unknown> {
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

export namespace Entry {
  export function create<T>(
    identity: IdentityInstance,
    id: string,
    payload: any,
    clock?: any,
    next?: Array<string | LogEntry<T>>,
    refs?: Array<string | LogEntry<T>>,
  ): Promise<LogEntry<T>>
  export function verify<T>(
    identities: IdentityInstance,
    entry: LogEntry<T>,
  ): Promise<boolean>
  export function isEntry(obj: unknown): boolean
  export function isEqual<T>(a: LogEntry<T>, b: LogEntry<T>): boolean
  export function decode<T>(bytes: Uint8Array): Promise<LogEntry<T>>
  export function encode<T>(entry: LogEntry<T>): Promise<Uint8Array>
}

interface LogOptions<T> {
  logId?: string
  logHeads?: LogEntry<T>[]
  access?: AccessControllerInstance
  entries?: LogEntry<T>[]
  entryStorage?: StorageInstance
  headsStorage?: StorageInstance
  indexStorage?: StorageInstance
  sortFn?: (a: LogEntry<T>, b: LogEntry<T>) => number
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

interface LogInstance<T> {
  id: string

  access?: AccessControllerInstance
  identity: IdentityInstance
  storage: StorageInstance

  clock(): Promise<Clock>
  heads(): Promise<LogEntry<T>[]>
  values(): Promise<LogEntry<T>[]>
  all(): Promise<LogEntry<T>[]>
  get(hash: string): Promise<LogEntry<T> | undefined>
  has: (hash: string) => Promise<boolean>
  append(
    payload: T,
    options?: LogAppendOptions,
  ): Promise<LogEntry<T>>
  join(log: LogInstance<T>): Promise<void>
  joinEntry(entry: LogEntry<T>): Promise<void>
  traverse(): AsyncGenerator<LogEntry<T>>
  iterator(options?: LogIteratorOptions): AsyncIterable<LogEntry<T>>
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
  LogEntry,
  LogInstance,
  LogIteratorOptions,
  LogOptions,
}

export { Log }
