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

interface DocumentsDatabase extends DatabaseInstance {
    all(): Promise<DatabaseDoc[]>;

    del(key: string): Promise<string>;

    get(key: string): Promise<DatabaseDoc | null>;

    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc>;

    put(doc: Object): Promise<string>;

    query<T>(findFn: (doc: T) => boolean): Promise<T[]>;
};

function Documents(options?: DatabaseOptions): DocumentsDatabase;


interface EventsDoc {
    hash: string;
    value: any;
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

interface EventsDatabase extends DatabaseInstance {
    add(value: any): Promise<string>;

    all(): Promise<EventsDoc[]>;

    get(hash: string): Promise<any>;

    iterator(options?: EventsIteratorOptions): AsyncGenerator<any>;
}


function KeyValue(): KeyValueDatabase;

interface KeyValueDatabase extends DatabaseInstance {
    all(): Promise<DatabaseDoc[]>;

    del(key: string): Promise<void>;

    get(key: string): Promise<any | null>;

    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc>;

    put(key: string, value: any): Promise<string>;
}


interface DatabaseType {
    documents: DocumentsDatabase;
    events: EventsDatabase;
    keyvalue: KeyValueDatabase;
}

interface FunctionDatabaseType {
    documents: Documents;
    events: Events;
    keyvalue: KeyValue;
}

function KeyValueIndexed(storage?: Storage): KeyValueIndexedDatabase;

type KeyValueIndexedDatabase = {
    get(key: string): Promise<any>;
    iterator(filters?: IteratorOptions): AsyncGenerator<DatabaseDoc>;
};

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
