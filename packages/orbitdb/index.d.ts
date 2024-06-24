import {PeerId} from "@libp2p/interface";

import {IPFS} from './ipfs';

import {
	Identities,
	IdentityInstance,
	IdentitiesInstance,
	useIdentityProvider,
	Identity,
	isEqual,
	decodeIdentity,
	isIdentity,
	getIdentityProvider,
	PublicKeyIdentityProvider,
	IdentityProviderInstance,
	IdentityProvider,
	IdentityOptions,
} from './identities';

import {
	AccessControllerTypeMap,
	AccessControllerType,
	OrbitDBAccessController,
	IPFSAccessControllerInstance,
	OrbitDBAccessControllerInstance,
	IPFSAccessController,
	useAccessController
} from "./access-controller";

import {
	KeyStoreInstance,
	KeyStore,
	Secp256k1PrivateKey,
	PrivateKeys,

	signMessage,
	verifyMessage
} from "./key-store";

import {Database, DatabaseInstance} from "./database";
import {ComposedStorage, Storage} from "./storage";
import {OrbitDBAddress, parseAddress, isValidAddress} from './utils';

import {
	DatabaseType,
	DatabaseTypeMap,
	DatabasesFunctionTypeMap,
	Documents,
	Events,
	KeyValue,
	KeyValueIndexed,
	useDatabaseType
} from './databases';

import {LogEntry, Log, Entry} from './log';
import {IPFSBlockStorage, LRUStorage, LevelStorage, MemoryStorage} from './storage';

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

interface OrbitDBInstance {
	open<D extends DatabaseType, T, A extends AccessControllerType>(address: string, options?: OrbitDBOpenOptions<D, T, A>): Promise<DatabaseTypeMap<T, A>[D]>;

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

declare function createOrbitDB<D extends DatabaseType, T, A extends AccessControllerType>(options: CreateOrbitDBOptions): OrbitDBInstance;

export {
	CreateOrbitDBOptions,
	OrbitDBOpenOptions,
	OrbitDBInstance,
	OrbitDBAddress,
	IdentitiesInstance,
	DatabaseInstance,

	ComposedStorage,
	Database,
	Documents,
	Events,

	// Access Controller
	IPFSAccessControllerInstance,
	OrbitDBAccessControllerInstance,
	IPFSAccessController,
	IPFSBlockStorage,

	// Identity
	Identities,
	Identity,
	isEqual,
	decodeIdentity,
	isIdentity,
	getIdentityProvider,
	PublicKeyIdentityProvider,
	IdentityProviderInstance,
	IdentityProvider,
	IdentityOptions,
	IdentityInstance,

	// KeyStore
	KeyStore,
	signMessage,
	verifyMessage,
	KeyStoreInstance,
	Secp256k1PrivateKey,
	PrivateKeys,

	KeyValue,
	KeyValueIndexed,

	// Log
	Log,
	Entry,
	LogEntry,

	// IPFS
	IPFS,

	// Storage
	MemoryStorage,
	LRUStorage,
	LevelStorage,

	OrbitDBAccessController,
	// PublicKeyIdentityProvider,
	// isIdentity,
	createOrbitDB,
	isValidAddress,
	parseAddress,
	useAccessController,
	useDatabaseType,
	useIdentityProvider,
};
