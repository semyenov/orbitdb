import {Entry} from "./log";
import {Storage} from "./storage";

// TODO: types
interface AccessControllerOptions {
    write?: string[];
    storage?: Storage;
}

interface IPFSAccessControllerType {
    canAppend(entry: Entry): Promise<boolean>;
}

function IPFSAccessController(options: AccessControllerOptions): Promise<IPFSAccessControllerType>;

interface OrbitDBAccessControllerType {
    canAppend(entry: Entry): Promise<boolean>;

    capabilities(): Promise<string[]>;

    close(): Promise<void>;

    drop(): Promise<void>;

    get(capability: string): Promise<string[]>;

    grant(capability: string, key: string): Promise<void>;

    hasCapability(capability: string, key: string): Promise<boolean>;

    revoke(capability: string, key: string): Promise<void>;
}

function OrbitDBAccessController(options: Omit<AccessControllerOptions, 'write'>): Promise<OrbitDBAccessControllerType>;

function useAccessController(accessController: { type: string }): void;

interface AccessController {
    ipfs: IPFSAccessControllerType,
    orbitdb: OrbitDBAccessControllerType
}
type AccessControllerType = keyof AccessController;

export {IPFSAccessController, OrbitDBAccessController, useAccessController, AccessController, AccessControllerType};

