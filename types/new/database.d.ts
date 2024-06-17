// Type definitions for OrbitDB Database Module
// Project: https://api.orbitdb.org/module-Database.html

import { IPFS } from './ipfs';
import { Identity } from './identity';
import { AccessController } from './access-controller';
import { Storage } from './storage';
import {PeerId} from 'libp2p'
import {EventsDatabase} from "./events";
import {Entry, LogInstance} from "./log";
import {SyncInstance} from "./sync";

interface DatabaseParams {
    ipfs: IPFS;
    identity?: Identity;
    address?: string;
    name?: string;
    access?: AccessController;
    directory?: string;
    meta?: any;
    headsStorage?: Storage;
    entryStorage?: Storage;
    indexStorage?: Storage;
    referencesCount?: number;
    syncAutomatically?: boolean;
    onUpdate?: (entry: Entry) => void;
}

// interface IteratorFilters {
//     gt?: string;
//     gte?: string;
//     lt?: string;
//     lte?: string;
//     amount?: number;
// }

function Database(params: DatabaseParams): DatabaseInstance;


interface DatabaseInstance {
    access?: AccessController;
    address?: string;
    events: EventsDatabase;
    log: LogInstance;
    name?: string;
    peers: Set<PeerId>;
    sync: SyncInstance;
    meta: any;
    identity?: Identity;

    addOperation(op: any): Promise<string>;
    close(): Promise<void>;
    drop(): Promise<void>;

    // add(value: any): Promise<string>;
    // all(): Promise<[string, string][]>;
    // get(hash: string): Promise<any>;
    // iterator(filters?: IteratorFilters): AsyncGenerator<[string, string], void, undefined>;
    // stop(): Promise<void>;
}

export = {
    Database
};
