// TODO: AsyncGenerator
interface IPFSBlockStorageParams {
    ipfs: any;
    pin?: boolean;
    timeout?: number;
}

interface LRUStorageParams {
    size?: string;
}

interface LevelStorageParams {
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
    get<T>(hash: string): Promise<T>;
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

function ComposedStorage(storage1: Storage, storage2: Storage): Promise<StorageComposed>
function IPFSBlockStorage(params: IPFSBlockStorageParams): Promise<StorageIPFS>
function LRUStorage(params?: LRUStorageParams): Promise<StorageLRU>
function LevelStorage(params?: LevelStorageParams): Promise<StorageLevel>
function MemoryStorage(): Promise<StorageMemory>

type Storage = StorageComposed | StorageIPFS | StorageLRU | StorageLevel | StorageMemory

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
    ComposedStorage
}
