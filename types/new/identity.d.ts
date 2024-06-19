import {KeyStoreInstance} from "./key-store";
import {Storage} from "./storage";
import {IPFS} from "./ipfs";

// TODO: Complete the Provider interface
interface Identity {
    id: string;
    publicKey: object;
    signatures: {
        id: string;
        publicKey: string;
    };
    type: string;
    sign: (data: any) => Promise<string>;
    verify: (data: any, signature: string) => Promise<boolean>;
}

interface IdentityProvider extends Identity {
    verifyIdentity: (identity: Identity) => Promise<boolean>;
}

interface IdentitiesOptions {
    keystore?: KeyStoreInstance;
    path?: string;
    storage?: Storage;
    ipfs?: IPFS;
}

// TODO: Complete the IdentitiesModule interface
type IdentitiesModule = {
    createIdentity: (options?: any) => Promise<Identity>;
    getIdentity: (id: string) => Promise<Identity>;
    signIdentity: (identity: Identity) => Promise<string>;
    verifyIdentity: (identity: Identity) => Promise<boolean>;
}

function Identities(options?: IdentitiesOptions): IdentitiesModule;

function useIdentityProvider(identityProvider: IdentityProvider): void;

export {
    Identities,
    useIdentityProvider,
    Identity,
    IdentitiesOptions,
    IdentitiesModule,
    IdentityProvider
}
