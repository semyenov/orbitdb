import {Storage} from "./storage";
import {IPFS} from "./ipfs";

interface Manifest {
    name: string;
    type: string;
    accessController: string;
    meta?: any;
}

interface ManifestStoreType {
    get(address: string): Promise<Manifest>;
    create(manifest: Manifest): Promise<{ hash: string; manifest: Manifest }>;
    close(): Promise<void>;
}

function ManifestStore(options?: { ipfs?: IPFS; storage?: Storage }): Promise<ManifestStoreType>;

export {ManifestStore, ManifestStoreType, Manifest };
