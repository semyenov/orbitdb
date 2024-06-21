import { Storage } from "./storage";
import { IPFS } from "./ipfs";
import { Identity, IdentityInstance } from "./identities";
import { AccessControllerTypeMap, AccessControllerType } from "./access-controller";

export interface LogOptions<T, A extends AccessControllerType = 'ipfs'> {
  logId?: string;
  logHeads?: Entry<T>[];
  access?: AccessControllerTypeMap[A];
  entries?: Entry<T>[];
  entryStorage?: Storage;
  headsStorage?: Storage;
  indexStorage?: Storage;
  sortFn?: (a: Entry<T>, b: Entry<T>) => number;
}

export interface Entry<T> {
  id: string;
  payload: T;
  next: string[];
  refs: string[];
  clock: Clock;
  v: number;
  key: string;
  identity: string;
  sig: string;
}

export interface Clock {
  id: string;
  time: number;
}

export function Log<T, A extends AccessControllerType = 'ipfs'>(
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

export interface LogInstance<T, A extends AccessControllerType = 'ipfs'> {
  id: string;
  access?: AccessControllerTypeMap[A];
  identity: IdentityInstance;
  storage: Storage;

  clock(): Promise<Clock>;
  heads(): Promise<Entry<T>[]>;
  values(): Promise<Entry<T>[]>;
  all(): Promise<Entry<T>[]>;
  get(hash: string): Promise<Entry<T> | undefined>;
  has: (hash: string) => Promise<boolean>
  append(payload: T, options?: { referencesCount: number }): Promise<Entry<T>>;
  join(log: LogInstance<unknown>): Promise<void>;
  joinEntry(entry: Entry<T>): Promise<void>;
  traverse(): AsyncGenerator<Entry<T>>;
  iterator(options?: OptionsIterator): AsyncIterable<Entry<T>>;
  clear(): Promise<void>;
  close(): Promise<void>;
}
