import {Storage} from './storage';
import {Entry} from "./log";
import {DatabaseInstance} from "./database";

interface DatabaseOptions {
    indexBy?: string;
}

interface DatabaseDoc<T = unknown> {
    hash: string;
    key: string;
    value: T;
}

type IteratorOptions = {
    amount?: string;
}

interface DocumentsDatabase<T = unknown, A> extends DatabaseInstance<A> {
    all(): Promise<DatabaseDoc<T>[]>;

    del(key: string): Promise<string>;

    get(key: string): Promise<DatabaseDoc<T> | null>;

    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc>;

    put(doc: DatabaseDoc<T>): Promise<string>;

    query(findFn: (doc: T) => boolean): Promise<T[]>;
}

function Documents<T>(options?: DatabaseOptions): DocumentsDatabase<T>;


interface EventsDoc<T = unknown> {
    hash: string;
    value: T;
}

// Events Database
function Events<T>(): EventsDatabase<T>;

type EventsIteratorOptions = {
    gt?: string;
    gte?: string;
    lt?: string;
    lte?: string;
    limit?: number;
    reverse?: boolean;
};

interface EventsDatabase<T = unknown, A> extends DatabaseInstance<A> {
    add(value: T): Promise<string>;

    all(): Promise<EventsDoc[]>;

    get(hash: string): Promise<T | null>;

    iterator(options?: EventsIteratorOptions): AsyncGenerator<EventsDoc<T>>;
}


function KeyValue<T>(): KeyValueDatabase<T>;

interface KeyValueDatabase<T = unknown, A> extends DatabaseInstance<A> {
    all(): Promise<DatabaseDoc<T>[]>;

    del(key: string): Promise<void>;

    get(key: string): Promise<T | null>;

    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc<T>>;

    put(key: string, value: T): Promise<string>;
}


interface DatabaseType<T, A> {
    documents: DocumentsDatabase<T, A>;
    events: EventsDatabase<T, A>;
    keyvalue: KeyValueDatabase<T, A> | KeyValueIndexedDatabase<T, A>;
}

type DatabaseTypeKey = keyof DatabaseType;

interface FunctionDatabaseType {
    documents: Documents;
    events: Events;
    keyvalue: KeyValue | KeyValueIndexedDatabase;
}

function KeyValueIndexed(storage?: Storage): KeyValueIndexedDatabase;

interface KeyValueIndexedDatabase<T = unknown, A> extends KeyValueDatabase<T, A> {
    get(key: string): Promise<T | null>;
    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc<T>>;
}

function useDatabaseType<T extends keyof FunctionDatabaseType>(database: FunctionDatabaseType[T] & { type: T }): void;

export {
    DatabaseDoc,
    DatabaseOptions,
    Documents,
    DocumentsDatabase,
    Events,
    EventsDatabase,
    EventsDoc,
    EventsIteratorOptions,
    KeyValue,
    KeyValueDatabase,
    KeyValueIndexed,
    KeyValueIndexedDatabase,
    IteratorOptions,
    useDatabaseType,
    DatabaseType,
    FunctionDatabaseType,
    DatabaseTypeKey
}
