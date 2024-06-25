import type { AccessControllerInstance } from './access-controller'
import type { DatabaseInstance } from './database'
import type { IdentitiesInstance, IdentityInstance } from './identities'
import type { OrbitDBInstance } from './index'
import type { IPFS } from './ipfs'
import type { StorageInstance } from './storage'

interface DatabaseOptions {
  ipfs?: IPFS
  identity?: IdentityInstance
  address?: string
  orbitdb?: OrbitDBInstance
  identities?: IdentitiesInstance
  accessController?: AccessControllerInstance
  directory?: string
}

interface DocumentsDoc<T = unknown> {
  hash: string
  key: string
  value: T
}

interface DocumentsOptions<T> {
  indexBy?: keyof T
}

interface DocumentsIteratorOptions {
  amount?: number
}

interface DocumentsInstance<T = unknown> extends DatabaseInstance<T> {
  type: 'documents'

  all(): Promise<DocumentsDoc<T>[]>
  del(key: string): Promise<string>
  get(key: string): Promise<DocumentsDoc<T> | null>
  iterator(
    filters?: DocumentsIteratorOptions,
  ): AsyncGenerator<DocumentsDoc<T>, string>
  put(doc: T): Promise<string>
  query(findFn: (doc: T) => boolean): Promise<T[]>
}

declare function Documents<T>(
  documentsOptions?: DocumentsOptions<T>,
): (options: DatabaseOptions) => Promise<DocumentsInstance<T>>

interface EventsDoc<T = unknown> {
  key: string
  value: T
}

interface EventsIteratorOptions {
  gt?: string
  gte?: string
  lt?: string
  lte?: string
  amount?: number
}

interface EventsInstance<T = unknown> extends DatabaseInstance<T> {
  type: 'events'

  add(value: T): Promise<string>
  all(): Promise<Omit<EventsDoc<T>, 'key'>[]>
  get(hash: string): Promise<T | null>
  iterator(options?: EventsIteratorOptions): AsyncGenerator<EventsDoc<T>>
}
declare function Events<T>(): (
  options: DatabaseOptions,
) => Promise<EventsInstance<T>>

interface KeyValueDoc<T = unknown> {
  hash: string
  key: string
  value: T
}

interface KeyValueIteratorOptions {
  amount?: number
}

interface KeyValueInstance<T = unknown> extends DatabaseInstance<T> {
  type: 'keyvalue'

  all(): Promise<KeyValueDoc<T>[]>
  set(key: string, value: T): Promise<string>
  del(key: string): Promise<void>
  get(key: string): Promise<T | null>
  iterator(
    filters?: KeyValueIteratorOptions,
  ): AsyncGenerator<KeyValueDoc<T>, string>
  put(key: string, value: T): Promise<string>
}
declare function KeyValue<T>(): (
  options: DatabaseOptions,
) => Promise<KeyValueInstance<T>>

interface KeyValueIndexedOptions {
  storage?: StorageInstance
}

interface KeyValueIndexedInstance<T = unknown> extends KeyValueInstance<T> {}
declare function KeyValueIndexed<T>(
  keyValueIndexedOptions?: KeyValueIndexedOptions,
): (options: DatabaseOptions) => Promise<KeyValueIndexedInstance<T>>

interface DatabasesFunctionTypeMap<T> {
  documents: typeof Documents<T>
  events: typeof Events<T>
  keyvalue: typeof KeyValue<T> | typeof KeyValueIndexed<T>
}

type DatabaseFunctionType = keyof DatabasesFunctionTypeMap<any>

interface DatabaseTypeMap<T = unknown> {
  documents: DocumentsInstance<T>
  events: EventsInstance<T>
  keyvalue: KeyValueInstance<T> | KeyValueIndexedInstance<T>
}

type DatabaseType = keyof DatabaseTypeMap
export type {
  DatabaseFunctionType,
  DatabasesFunctionTypeMap,
  DatabaseType,
  DatabaseTypeMap,
  DocumentsDoc,
  DocumentsInstance,
  DocumentsIteratorOptions,
  DocumentsOptions,
  EventsDoc,
  EventsInstance,
  EventsIteratorOptions,
  KeyValueDoc,
  KeyValueIndexedInstance,
  KeyValueInstance,
  KeyValueIteratorOptions,
}

export { Documents, Events, KeyValue, KeyValueIndexed }

export function useDatabaseType<D extends DatabaseFunctionType, T>(
  database: DatabasesFunctionTypeMap<T>[D] & {
    type: T
  },
): void
