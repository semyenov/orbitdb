// Type definitions for OrbitDB Database Module
// Project: https://api.orbitdb.org/module-Database.html

import { PeerId } from '@libp2p/interface'

import { AccessControllerInstance } from './access-controller';
import { IdentityInstance } from './identities';
import { LogEntry, LogInstance } from "./log";
import { DatabaseEvents } from "./events";
import { SyncInstance } from "./sync";
import { StorageInstance } from './storage';
import { IPFS } from './ipfs';

interface DatabaseOptions<T> {
  ipfs: IPFS;
  identity?: IdentityInstance;
  accessController?: AccessControllerInstance;
  address?: string;
  name?: string;
  directory?: string;
  meta?: any;
  headsStorage?: StorageInstance;
  entryStorage?: StorageInstance;
  indexStorage?: StorageInstance;
  referencesCount?: number;
  syncAutomatically?: boolean;
  onUpdate?: (entry: LogEntry<T>) => void;
}

declare function Database<T>(options: DatabaseOptions<T>): Promise<DatabaseInstance<T>>;

interface DatabaseInstance<T> {
  name?: string;
  address?: string;
  peers: Set<PeerId>;
  indexBy: keyof T;
  meta: any;

  events: DatabaseEvents<T>;
  access?: AccessControllerInstance;
  identity?: IdentityInstance;
  log: LogInstance<T>;
  sync: SyncInstance<T>;

  addOperation(op: any): Promise<string>;
  close(): Promise<void>;
  drop(): Promise<void>;
}

export {
  DatabaseOptions,
  DatabaseInstance,
  Database,
};
