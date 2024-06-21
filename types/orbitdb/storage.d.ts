// TODO: AsyncGenerator
interface IPFSBlockStorageOptions {
	ipfs: any;
	pin?: boolean;
	timeout?: number;
}

interface LRUStorageOptions {
	size?: string;
}

interface LevelStorageOptions {
	path?: string;
	valueEncoding?: string;
}

interface StorageComposed {
	put(hash: string, data: any): Promise<void>;
	get(hash: string): Promise<any>;
	del(hash: string): Promise<void>;
	close(): Promise<void>;
	clear(): Promise<void>;
	merge(other: Storage): Promise<void>;
}

interface StorageIPFS {
	get(hash: string): Promise<Uint8Array>;
	put(hash: string, value: any): Promise<void>;
}

interface StorageLRU {
	put(hash: string, data: any): Promise<void>;
	get(hash: string): Promise<any>;
	del(hash: string): Promise<void>;
	iterator(): AsyncGenerator<[string, any]>;
	merge(other: Storage): Promise<void>;
	clear(): Promise<void>;
}

interface StorageLevel {
	put(hash: string, data: any): Promise<void>;
	get(hash: string): Promise<any>;
	del(hash: string, data: any): Promise<void>;
	close(): Promise<void>;
	clear(): Promise<void>;
	iterator(): AsyncGenerator<[string, any]>;
}

interface StorageMemory {
	put(hash: string, data: any): Promise<void>;
	get(hash: string): Promise<any>;
	del(hash: string): Promise<void>;
	merge(other: Storage): Promise<void>;
	iterator(): AsyncGenerator<[string, any]>;
	clear(): Promise<void>;
}

declare function ComposedStorage(storage1: Storage, storage2: Storage): Promise<StorageComposed>
declare function IPFSBlockStorage(options: IPFSBlockStorageOptions): Promise<StorageIPFS>
declare function LRUStorage(options?: LRUStorageOptions): Promise<StorageLRU>
declare function LevelStorage(options?: LevelStorageOptions): Promise<StorageLevel>
declare function MemoryStorage(): Promise<StorageMemory>

type Storage = StorageComposed | StorageIPFS | StorageLRU | StorageLevel | StorageMemory
interface StorageTypeMap {
	composed: StorageComposed;
	ipfs: StorageIPFS;
	lru: StorageLRU;
	level: StorageLevel;
	memory: StorageMemory;
}
type StorageType = keyof StorageTypeMap;

export {
	Storage,
	StorageComposed,
	StorageIPFS,
	StorageLRU,
	StorageLevel,
	StorageMemory,
	MemoryStorage,
	LevelStorage,
	LRUStorage,
	IPFSBlockStorage,
	ComposedStorage,
	StorageType,
	StorageTypeMap
}
