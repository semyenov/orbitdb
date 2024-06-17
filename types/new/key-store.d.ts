import {Storage} from "./storage";

interface KeyStoreParams {
    storage?: Storage;
    path?: string;
}

interface KeyObject {
    publicKey: string;
    privateKey: string;
}

interface KeyStoreInstance {
    addKey(id: string, key: Uint8Array): Promise<void>;
    clear(): Promise<void>;
    close(): Promise<void>;
    createKey(id: string): Promise<KeyObject>;
    getKey(id: string): Promise<KeyObject>;
    getPublic(keys: KeyObject, options?: { format?: "hex" | "buffer" }): Uint8Array | string;
    hasKey(id: string): Promise<boolean>;
}

function KeyStore(params?: KeyStoreParams): Promise<KeyStoreInstance>;

export { KeyStore, KeyStoreParams, KeyObject, KeyStoreInstance };
