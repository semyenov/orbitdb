// OrbitDB.d.ts

declare module 'orbit-db' {
    import { IPFS } from 'ipfs-core-types';
    import { EventEmitter } from 'events';
    import { AccessController } from './AccessControllers';
    import { Storage } from './storage';
    import { Database } from './database';

    type DatabaseType = 'eventlog' | 'feed' | 'docstore' | 'keyvalue' | 'counter';

    interface OpenParams {
        type?: DatabaseType;
        meta?: any;
        sync?: boolean;
        Database?: typeof Database;
        AccessController?: typeof AccessController;
        headsStorage?: Storage;
        entryStorage?: Storage;
        indexStorage?: Storage;
        referencesCount?: number;
    }

    class OrbitDB extends EventEmitter {
        static createInstance(ipfs: IPFS, options?: any): Promise<OrbitDB>;

        open(address: string, params?: OpenParams): Promise<Database>;
        stop(): Promise<void>;
    }

    export default OrbitDB;
}

declare module 'types/new/database' {
    type Database = string
    export = Database;
}
