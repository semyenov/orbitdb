import {Storage} from "./storage";
import {IPFS} from "./ipfs";
import {Identity} from "./identity";
import {AccessController} from "./access-controller";

export interface LogOptions {
    logId?: string;
    logHeads?: Entry[];
    access?: AccessController;
    entries?: Entry[];
    entryStorage?: Storage;
    headsStorage?: Storage;
    indexStorage?: Storage;
    sortFn?: (a: Entry, b: Entry) => number;
}

export interface Entry {
    id: string;
    payload: any;
    next: string[];
    refs: string[];
    clock: Clock;
    v: number;
    key: string;
    identity: string;
    sig: string;
}

export interface Clock {
    id: string;
    time: number;
}


export function Log(
    ipfs: IPFS,
    identity: Identity,
    options?: LogOptions
): Promise<LogInstance>;

type OptionsIterator = {
    gt?: string;
    gte?: string;
    lt?: string;
    lte?: string;
    amount?: number;
};

export interface LogInstance {
    append(payload: any, options?: { referencesCount: number }): Promise<Entry>;

    join(log: LogInstance): Promise<void>;

    clear(): Promise<void>;

    close(): Promise<void>;

    clock(): Promise<Clock>;

    iterator(options?: OptionsIterator): AsyncIterable<Entry>;

    get(hash: string): Entry | undefined;

    heads(): Promise<Entry[]>;

    isLog(obj: LogInstance | object): boolean;

    joinEntry(entry: Entry): Promise<void>;

    traverse(): AsyncGenerator<Entry>;

    values(): Promise<Entry[]>;
}
