import {Entry} from "./log";
import {Storage} from "./storage";

interface AccessControllerOptions {
    write?: string[];
    storage?: Storage;
}

interface AccessController {
    canAppend(entry: Entry): Promise<boolean>;

    get capabilities(): Promise<string[]>;

    close(): Promise<void>;

    drop(): Promise<void>;

    get(capability: string): Promise<string[]>;

    grant(capability: string, key: string): Promise<void>;

    hasCapability(capability: string, key: string): Promise<boolean>;

    revoke(capability: string, key: string): Promise<void>;
}

interface IPFSAccessController implements AccessController {
}

function createIPFSAccessController(options: AccessControllerOptions): Promise<IPFSAccessController>;

interface OrbitDBAccessController implements AccessController {
}

function createOrbitDBAccessController(options: Omit<AccessControllerOptions, 'write'>): Promise<OrbitDBAccessController>;

function useAccessController(accessController: { type: string }): void;

export {createIPFSAccessController, createOrbitDBAccessController, useAccessController, AccessController};

