import {Storage} from './storage';
import {Entry} from "./log";
import {DatabaseInstance} from "./database";

interface DatabaseOptions {
    indexBy?: string;
}

interface DatabaseDoc<T extends any> {
    hash: string;
    key: string;
    value: T;
}

type IteratorOptions = {
    amount?: string;
}

interface DocumentsDatabase<T extends unknown> extends DatabaseInstance {
    all(): Promise<DatabaseDoc<T>[]>;

    del(key: string): Promise<string>;

    get(key: string): Promise<DatabaseDoc<T> | null>;

    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc>;

    put(doc: DatabaseDoc<T>): Promise<string>;

    query(findFn: (doc: T) => boolean): Promise<T[]>;
}

function Documents(options?: DatabaseOptions): DocumentsDatabase;


interface EventsDoc<T extends unknown> {
    hash: string;
    value: T;
}

// Events Database
function Events(): EventsDatabase;

type EventsIteratorOptions = {
    gt?: string;
    gte?: string;
    lt?: string;
    lte?: string;
    limit?: number;
    reverse?: boolean;
};

interface EventsDatabase<T extends unknown> extends DatabaseInstance {
    add(value: T): Promise<string>;

    all(): Promise<EventsDoc[]>;

    get(hash: string): Promise<T | null>;

    iterator(options?: EventsIteratorOptions): AsyncGenerator<EventsDoc<T>>;
}


function KeyValue(): KeyValueDatabase;

interface KeyValueDatabase<T extends unknown> extends DatabaseInstance {
    all(): Promise<DatabaseDoc<T>[]>;

    del(key: string): Promise<void>;

    get(key: string): Promise<T | null>;

    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc<T>>;

    put(key: string, value: T): Promise<string>;
}


interface DatabaseType {
    documents: DocumentsDatabase;
    events: EventsDatabase;
    keyvalue: KeyValueDatabase;
}

interface FunctionDatabaseType {
    documents: Documents;
    events: Events;
    keyvalue: KeyValue | KeyValueIndexedDatabase;
}

function KeyValueIndexed(storage?: Storage): KeyValueIndexedDatabase;

interface KeyValueIndexedDatabase<T extends unknown> extends KeyValue {
    get(key: string): Promise<T | null>;
    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc<T>>;
}

function useDatabaseType<T extends keyof FunctionDatabaseType>(database: FunctionDatabaseType<T> & { type: T }): void;

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
    FunctionDatabaseType
}
