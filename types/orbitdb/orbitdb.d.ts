import { IPFS } from './ipfs';
import { Identity, Identities, IdentityInstance, IdentitiesInstance } from './identities';
import { AccessControllerTypeMap, AccessControllerType, OrbitDBAccessController } from "./access-controller";
import { DatabaseFunctionType, DatabaseType, DatabaseTypeMap, DatabasesFunctionTypeMap } from "./databases";
import { Storage, StorageType } from "./storage";
import { KeyStoreInstance } from "./key-store";
import { PeerId } from "@libp2p/interface";
import { IPFSAccessController } from './access-controller'
import { OrbitDBAddress, parseAddress, isValidAddress } from './utils';

type OrbitDBOpenOptions<D extends DatabaseType, T, A extends AccessControllerType> = {
    type?: D;
    meta?: any;
    sync?: boolean;
    Database?: DatabasesFunctionTypeMap<T, A>[D];
    AccessController?: AccessControllerTypeMap[A];
    headsStorage?: Storage;
    entryStorage?: Storage;
    indexStorage?: Storage;
    referencesCount?: number;
}

interface OrbitDBInstance<D extends DatabaseType, T, A extends AccessControllerType> {
    open(address: string, options?: OrbitDBOpenOptions<D, T, A>): Promise<DatabaseTypeMap<T, A>[D]>;
    stop(): Promise<void>;
    id: string;
    ipfs: IPFS;
    directory: string;
    keystore: KeyStoreInstance;
    identity: IdentityInstance;
    peerId: PeerId;
}

interface CreateOrbitDBOptions {
    id?: string;
    ipfs: IPFS;
    identity?: IdentityInstance
    identities?: IdentitiesInstance;
    directory?: string;
}

declare function createOrbitDB<D extends DatabaseType, T, A extends AccessControllerType>(options: CreateOrbitDBOptions): OrbitDBInstance<D, T, A>;

export {
    CreateOrbitDBOptions,
    OrbitDBOpenOptions,
    OrbitDBInstance,
    OrbitDBAddress,
    createOrbitDB,
    parseAddress,
    isValidAddress,
    Identities,
    IPFSAccessController,
    OrbitDBAccessController
};
