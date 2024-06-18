declare module '@orbitdb/core' {
    import { IPFS } from './ipfs';
    import { Identity, Identities, IdentityProvider } from './identity';
    import {AccessController} from "./access-controller";
    import {DatabaseInstance} from "./database";
    import {DatabaseType} from "./databases";

    type OrbitDBOpenOptions<T extends keyof DatabaseType> = {
        type?: T;
        meta?: any;
        sync?: boolean;
        Database?: DatabaseType[T];
        AccessController?: AccessController;
        headsStorage?: Storage;
        entryStorage?: Storage;
        indexStorage?: Storage;
        referencesCount?: number;
    }
    interface OrbitDB {
        open<T extends keyof DatabaseType>(address: string, options?: OrbitDBOpenOptions<T>): Promise<DatabaseType[T]>;
        stop(): Promise<void>;
    }

    interface CreateOrbitDBParams {
        ipfs: IPFS;
        id?: string;
        identity?: Identity
        identities?: Identities;
        directory?: string;
    }

    function createOrbitDB(params: CreateOrbitDBParams): OrbitDB;

    export { createOrbitDB, OrbitDB, CreateOrbitDBParams, OrbitDBOpenOptions };
}
