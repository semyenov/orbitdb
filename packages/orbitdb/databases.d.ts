import { Storage } from './storage';
import { DatabaseInstance } from "./database";
import { AccessControllerType, AccessControllerTypeMap, IPFSAccessControllerInstance } from './access-controller';
import { IdentitiesInstance, IdentityInstance, IPFS, OrbitDBInstance } from "./index";

interface DocumentsOptions<T> {
  indexBy?: keyof T;
}

type DocumentsIteratorOptions = {
  amount?: number;
}

interface DocumentsDoc<T = unknown> {
  hash: string;
  key: string;
  value: T;
}

interface DatabaseOptions<A extends AccessControllerType> {
  ipfs?: IPFS,
  identity?: IdentityInstance,
  orbitdb?: OrbitDBInstance,
  identities?: IdentitiesInstance,
  accessController?: AccessControllerTypeMap[A],
  address?: string,
  directory?: string,
}

interface DocumentsInstance<T, A extends AccessControllerType> extends DatabaseInstance<T, A> {
  type: 'documents';

  all(): Promise<DocumentsDoc<T>[]>;
  del(key: string): Promise<string>;
  get(key: string): Promise<DocumentsDoc<T> | null>;
  iterator(filters?: DocumentsIteratorOptions): AsyncGenerator<DocumentsDoc<T>, string>;
  put(doc: T): Promise<string>;
  query(findFn: (doc: T) => boolean): Promise<T[]>;
}

declare function Documents<T, A extends AccessControllerType>(options?: DocumentsOptions<T>):
  (options: DatabaseOptions<A>) => Promise<DocumentsInstance<T, A>>;

interface EventsDoc<T = unknown> {
  key: string;
  value: T;
}

type EventsIteratorOptions = {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  amount?: number;
};

interface EventsInstance<T, A extends AccessControllerType> extends DatabaseInstance<T, A> {
  type: 'events';

  add(value: T): Promise<string>;
  all(): Promise<Omit<KeyValueDoc<T>, 'key'>[]>;
  get(hash: string): Promise<T | null>;
  iterator(options?: EventsIteratorOptions): AsyncGenerator<EventsDoc<T>>;
}

declare function Events<T, A extends AccessControllerType>():
  (options: DatabaseOptions<A>) => Promise<EventsInstance<T, A>>;

interface KeyValueDoc<T = unknown> {
  hash: string;
  key: string;
  value: T;
}

type KeyValueIteratorOptions = {
  amount?: number;
}

interface KeyValueInstance<T, A extends AccessControllerType> extends DatabaseInstance<T, A> {
  type: 'keyvalue';

  all(): Promise<KeyValueDoc<T>[]>;
  set(key: string, value: T): Promise<string>;
  del(key: string): Promise<void>;
  get(key: string): Promise<T | null>;
  iterator(filters?: KeyValueIteratorOptions): AsyncGenerator<KeyValueDoc<T>, string>;
  put(key: string, value: T): Promise<string>;
}

declare function KeyValue<T, A extends AccessControllerType>():
  (options: DatabaseOptions<A>) => Promise<KeyValueInstance<T, A>>;

interface DatabaseTypeMap<T, A extends AccessControllerType> {
  documents: DocumentsInstance<T, A>;
  events: EventsInstance<T, A>;
  keyvalue: KeyValueInstance<T, A> | KeyValueIndexedInstance<T, A>;
}

type DatabaseType = keyof DatabaseTypeMap<any, any>;

interface KeyValueIndexedInstance<T, A extends AccessControllerType> extends KeyValueInstance<T, A> {
}

interface KeyValueIndexedOptions {
  storage?: Storage
}

declare function KeyValueIndexed<T, A extends AccessControllerType>(options?: KeyValueIndexedOptions):
  (options: DatabaseOptions<A>) => Promise<KeyValueIndexedInstance<T, A>>;

interface DatabasesFunctionTypeMap<T, A extends AccessControllerType> {
  documents: typeof Documents<T, A>;
  events: typeof Events<T, A>;
  keyvalue: typeof KeyValue<T, A> | typeof KeyValueIndexed<T, A>;
}

type DatabaseFunctionType = keyof DatabasesFunctionTypeMap<any, any>;

declare function useDatabaseType<D extends DatabaseFunctionType, T, A extends AccessControllerType>(database: DatabasesFunctionTypeMap<T, A>[D] & {
  type: T
}): void;

export {
  DatabaseType,
  DatabaseTypeMap,

  DocumentsDoc,
  DocumentsOptions,
  DocumentsIteratorOptions,
  DocumentsInstance,
  Documents,

  KeyValueDoc,
  KeyValueIteratorOptions,
  KeyValueInstance,
  KeyValue,

  KeyValueIndexedInstance,
  KeyValueIndexed,

  EventsDoc,
  EventsIteratorOptions,
  EventsInstance,
  Events,

  DatabaseFunctionType,
  DatabasesFunctionTypeMap,
  useDatabaseType,
}
