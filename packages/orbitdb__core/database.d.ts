// Type definitions for OrbitDB Database Module
// Project: https://api.orbitdb.org/module-Database.html

import { PeerId } from '@libp2p/interface'

import { AccessControllerTypeMap, AccessControllerType } from './access-controller';
import { IdentityInstance } from './identities';
import { LogEntry, LogInstance } from "./log";
import { DatabaseEvents } from "./events";
import { SyncInstance } from "./sync";
import { Storage } from './storage';
import { IPFS } from './ipfs';

interface DatabaseOp<T> {
  key: string | number;
  op: string;
  value: T;
}

interface DatabaseOptions<T, A extends keyof AccessControllerTypeMap = 'ipfs'> {
  ipfs: IPFS;
  identity?: IdentityInstance;
  address?: string;
  name?: string;
  accessController?: AccessControllerTypeMap[A];
  directory?: string;
  meta?: any;
  headsStorage?: Storage;
  entryStorage?: Storage;
  indexStorage?: Storage;
  referencesCount?: number;
  syncAutomatically?: boolean;
  onUpdate?: (entry: LogEntry<T>) => void;
}

interface DatabaseInstance<T, A extends AccessControllerType = 'ipfs'> {
  access?: AccessControllerTypeMap[A];
  address?: string;
  events: DatabaseEvents<T>;
  log: LogInstance<T, A>;
  name?: string;
  peers: Set<PeerId>;
  sync: SyncInstance<T>;
  meta: any;
  identity?: IdentityInstance;

  addOperation(op: DatabaseOp<unknown>): Promise<string>;
  close(): Promise<void>;
  drop(): Promise<void>;
}
declare function Database<T, A extends AccessControllerType = 'ipfs'>(options: DatabaseOptions<T, A>): Promise<DatabaseInstance<T, A>>;

export {
  DatabaseInstance,
  Database,
};
