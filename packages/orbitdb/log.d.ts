import { Storage } from "./storage";
import { IPFS } from "./ipfs";
import { Identity, IdentityInstance } from "./identities";
import { AccessControllerTypeMap, AccessControllerType } from "./access-controller";

interface LogOptions<T, A extends AccessControllerType = 'ipfs'> {
	logId?: string;
	logHeads?: LogEntry<T>[];
	access?: AccessControllerTypeMap[A];
	entries?: LogEntry<T>[];
	entryStorage?: Storage;
	headsStorage?: Storage;
	indexStorage?: Storage;
	sortFn?: (a: LogEntry<T>, b: LogEntry<T>) => number;
}

interface LogEntry<T = unknown> {
	id: string;
	payload: T;
	hash: string;
	next: string[];
	refs: string[];
	clock: Clock;
	v: number;
	key: string;
	identity: string;
	sig: string;
}

declare namespace Entry {
	function create<T>(
		identity: any,
		id: string,
		payload: any,
		clock?: any,
		next?: Array<string | LogEntry<T>>,
		refs?: Array<string | LogEntry<T>>
	): Promise<LogEntry<T>>

	function verify<T>(identities: any, entry: LogEntry<T>): Promise<boolean>
	function isEntry(obj: unknown): boolean
	function isEqual<T>(a: LogEntry<T>, b: LogEntry<T>): boolean
	function decode<T>(bytes: Uint8Array): Promise<LogEntry<T>>
	function encode<T>(entry: LogEntry<T>): Promise<Uint8Array>
}

interface Clock {
	id: string;
	time: number;
}

declare function Log<T, A extends AccessControllerType = 'ipfs'>(
	ipfs: IPFS,
	identity: IdentityInstance,
	options?: LogOptions<T, A>
): Promise<LogInstance<T, A>>;

type OptionsIterator = {
	gt?: string;
	gte?: string;
	lt?: string;
	lte?: string;
	amount?: number;
};

interface LogInstance<T, A extends AccessControllerType = 'ipfs'> {
	id: string;
	access?: AccessControllerTypeMap[A];
	identity: IdentityInstance;
	storage: Storage;

	clock(): Promise<Clock>;
	heads(): Promise<LogEntry<T>[]>;
	values(): Promise<LogEntry<T>[]>;
	all(): Promise<LogEntry<T>[]>;
	get(hash: string): Promise<LogEntry<T> | undefined>;
	has: (hash: string) => Promise<boolean>
	append(payload: T, options?: { referencesCount: number }): Promise<LogEntry<T>>;
	join(log: LogInstance<unknown>): Promise<void>;
	joinEntry(entry: LogEntry<T>): Promise<void>;
	traverse(): AsyncGenerator<LogEntry<T>>;
	iterator(options?: OptionsIterator): AsyncIterable<LogEntry<T>>;
	clear(): Promise<void>;
	close(): Promise<void>;
}

export {
	LogOptions,
	LogEntry,
	Entry,
	Clock,
	LogInstance,
	Log,
}
