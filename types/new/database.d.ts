// Type definitions for OrbitDB Database Module
// Project: https://api.orbitdb.org/module-Database.html

import {IPFS} from './ipfs';
import {Identity} from './identity';
import {AccessController, AccessControllerType} from './access-controller';
import {Storage} from './storage';
import {PeerId} from 'libp2p'
import {EventsDatabase} from "./events";
import {Entry, LogInstance} from "./log";
import {SyncInstance} from "./sync";

interface DatabaseParams<A extends keyof AccessController = 'ipfs'> {
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

function Database(params: DatabaseParams): DatabaseInstance;


interface DatabaseInstance<A extends AccessControllerType = 'ipfs'> {
    access?: AccessController[A];
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
}

export {
    Database,
    DatabaseInstance
};
