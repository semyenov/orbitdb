import {Entry} from "./log";
import {Storage} from "./storage";

// TODO: types
interface AccessControllerOptions {
    write?: string[];
    storage?: Storage;
}

interface IPFSAccessController {
    canAppend(entry: Entry): Promise<boolean>;
}

function createIPFSAccessController(options: AccessControllerOptions): Promise<IPFSAccessController>;

interface OrbitDBAccessController {
    canAppend(entry: Entry): Promise<boolean>;

    capabilities(): Promise<string[]>;

    close(): Promise<void>;

    drop(): Promise<void>;

    get(capability: string): Promise<string[]>;

    grant(capability: string, key: string): Promise<void>;

    hasCapability(capability: string, key: string): Promise<boolean>;

    revoke(capability: string, key: string): Promise<void>;
}

function createOrbitDBAccessController(options: Omit<AccessControllerOptions, 'write'>): Promise<OrbitDBAccessController>;

function useAccessController(accessController: { type: string }): void;

interface AccessController {
    ipfs: IPFSAccessController,
    orbitdb: OrbitDBAccessController
}
type AccessControllerType = keyof AccessController;

export {createIPFSAccessController, createOrbitDBAccessController, useAccessController, AccessController, AccessControllerType};

