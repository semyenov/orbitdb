import { Storage } from './storage';
import { DatabaseInstance } from "./database";
import { AccessControllerType } from './access-controller';

interface DocumentsOptions<T> {
  indexBy?: keyof T;
}

type DocumentsIteratorOptions = {
  amount?: string;
}

interface DocumentsDoc<T> {
  hash: string;
  key: string;
  value: T;
}

interface DocumentsInstance<T, A extends AccessControllerType = 'ipfs'> extends DatabaseInstance<A> {
  all(): Promise<DocumentsDoc<T>[]>;
  del(key: string): Promise<string>;
  get(key: string): Promise<DocumentsDoc<T> | null>;
  iterator(filters?: DocumentsIteratorOptions): AsyncGenerator<DocumentsDoc<T>, string>;
  put(doc: DocumentsDoc<T>): Promise<string>;
  query(findFn: (doc: T) => boolean): Promise<T[]>;
}

declare function Documents<T, A extends AccessControllerType = 'ipfs'>(options?: DocumentsOptions<T>): DocumentsInstance<T, A>;

interface EventsDoc<T = unknown> {
  key: string;
  value: T;
}

type EventsIteratorOptions = {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  limit?: number;
  reverse?: boolean;
};


interface EventsInstance<T, A extends AccessControllerType = 'ipfs'> extends DatabaseInstance<A> {
  add(value: T): Promise<string>;
  all(): Promise<Omit<KeyValueDoc<T>, 'key'>[]>;
  get(hash: string): Promise<T | null>;
  iterator(options?: EventsIteratorOptions): AsyncGenerator<EventsDoc<T>>;
}

declare function Events<T, A extends AccessControllerType = 'ipfs'>(): EventsInstance<T, A>;

interface KeyValueDoc<T> {
  hash: string;
  key: string;
  value: T;
}

type KeyValueIteratorOptions = {
  amount?: string;
}

interface KeyValueInstance<T, A extends AccessControllerType = 'ipfs'> extends DatabaseInstance<A> {
  all(): Promise<KeyValueDoc<T>[]>;
  del(key: string): Promise<void>;
  get(key: string): Promise<T | null>;
  iterator(filters?: KeyValueIteratorOptions): AsyncGenerator<KeyValueDoc<T>, string>;
  put(key: string, value: T): Promise<string>;
}
declare function KeyValue<T, A extends AccessControllerType = 'ipfs'>(): KeyValueInstance<T, A>;

interface DatabaseTypeMap<T, A extends AccessControllerType = 'ipfs'> {
  documents: DocumentsInstance<T, A>;
  events: EventsInstance<T, A>;
  keyvalue: KeyValueInstance<T, A> | KeyValueIndexedInstance<T, A>;
}

type DatabaseType = keyof DatabaseTypeMap<any, any>;

interface KeyValueIndexedInstance<T, A extends AccessControllerType = 'ipfs'> extends KeyValueInstance<T, A> { }
declare function KeyValueIndexed<T, A extends AccessControllerType = 'ipfs'>(storage?: Storage): KeyValueIndexedInstance<T, A>;

interface DatabasesFunctionTypeMap<T, A extends AccessControllerType = 'ipfs'> {
  documents: typeof Documents<T, A>;
  events: typeof Events<T, A>;
  keyvalue: typeof KeyValue<T, A> | typeof KeyValueIndexed<T, A>;
}
type DatabaseFunctionType = keyof DatabasesFunctionTypeMap<any, any>;
declare function useDatabaseType<D extends DatabaseFunctionType, T, A extends AccessControllerType = 'ipfs'>(database: DatabasesFunctionTypeMap<T, A>[D] & { type: T }): void;

export {
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

  DatabaseType,
  DatabaseTypeMap,
  DatabaseFunctionType,
  DatabasesFunctionTypeMap,
  useDatabaseType,
}
