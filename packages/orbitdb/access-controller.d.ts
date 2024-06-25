import {LogEntry} from "./log";
import {Storage} from "./storage";
import {IdentitiesInstance, OrbitDBInstance} from "./index";
import {DatabaseEvents} from "./events";

interface AccessControllerTypeMap {
	ipfs: IPFSAccessControllerInstance,
	orbitdb: OrbitDBAccessControllerInstance
}

type AccessControllerType = keyof AccessControllerTypeMap;

interface CreateAccessControllerOptions {
	write?: string[];
	storage?: Storage;
}

interface IPFSAccessControllerInstance {
	canAppend(entry: LogEntry<unknown>): Promise<boolean>;
	type?: AccessControllerType;
	address?: string;
	write?: string[];
}

interface OrbitDBAccessControllerInstance extends IPFSAccessControllerInstance {
	capabilities(): Promise<string[]>

	close(): Promise<void>

	drop(): Promise<void>

	get(capability: string): Promise<string[]>

	grant(capability: string, key: string): Promise<void>

	hasCapability(capability: string, key: string): Promise<boolean>

	revoke(capability: string, key: string): Promise<void>;
	events: DatabaseEvents;
}

interface AccessControllerOptions {
	orbitdb: OrbitDBInstance,
	identities: IdentitiesInstance,
	address?: string,
}

declare function IPFSAccessController(options?: CreateAccessControllerOptions):
	(options: AccessControllerOptions) => Promise<IPFSAccessControllerInstance>;

declare function OrbitDBAccessController(options?: Pick<CreateAccessControllerOptions, 'write'>):
	(options: AccessControllerOptions) =>  Promise<OrbitDBAccessControllerInstance>;

declare function useAccessController(accessController: { type: AccessControllerType }): void;

export {
	IPFSAccessController,
	OrbitDBAccessController,
	useAccessController,

	IPFSAccessControllerInstance,
	OrbitDBAccessControllerInstance,

	AccessControllerTypeMap,
	AccessControllerType
};

