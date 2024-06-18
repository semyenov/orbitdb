declare module '@orbitdb/core' {
    import { IPFS } from './ipfs';
    import { Identity, Identities } from './identity';
    import {AccessController, AccessControllerType} from "./access-controller";
    import {DatabaseType, DatabaseTypeKey} from "./databases";
    import {Storage, StorageType} from "./storage";
    import {KeyStoreInstance} from "./key-store";
    import {PeerId} from "libp2p";

    import {OrbitDBAddress, parseAddress, isValidAddress} from './utils';

    type OrbitDBOpenOptions<V,T extends DatabaseTypeKey, A extends AccessControllerType, S extends StorageType = StorageType> = {
        type?: T;
        meta?: any;
        sync?: boolean;
        Database?: DatabaseType<V>[T];
        AccessController?: AccessController[A];
        headsStorage?: Storage;
        entryStorage?: Storage;
        indexStorage?: Storage;
        referencesCount?: number;
    }
    interface OrbitDB {
        open<V = unknown, T extends DatabaseTypeKey = DatabaseTypeKey, A extends AccessControllerType = 'ipfs'>(address: string, options?: OrbitDBOpenOptions<V,T, A>): Promise<DatabaseType<V, A>[T]>;
        stop(): Promise<void>;
        id: string;
        ipfs: IPFS;
        directory: string;
        keystore: KeyStoreInstance;
        identity: Identity;
        peerId: PeerId;
    }

    interface CreateOrbitDBParams {
        ipfs: IPFS;
        id?: string;
        identity?: Identity
        identities?: Identities;
        directory?: string;
    }

    function createOrbitDB(params: CreateOrbitDBParams): OrbitDB;
    export type {OrbitDBAddress}
    export { createOrbitDB, OrbitDB, CreateOrbitDBParams, OrbitDBOpenOptions, parseAddress, isValidAddress};
}
