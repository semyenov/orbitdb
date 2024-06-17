declare module '@orbitdb/core' {
    import { IPFS } from './ipfs';
    import { Identity, Identities, IdentityProvider } from './identity';
    import {AccessController} from "./access-controller";

    type openOptions = {
        type?: string;
        meta?: any;
        sync?: boolean;
        Database?: any;
        AccessController:AccessController;
        headsStorage?: Storage;
        entryStorage?: Storage;
        indexStorage?: Storage;
        referencesCount?: number;
    }
    interface OrbitDB {
        open(address: string, options?: openOptions): Promise<any>;
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

    export { createOrbitDB, OrbitDB, CreateOrbitDBParams };
}