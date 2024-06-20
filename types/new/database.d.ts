// Type definitions for OrbitDB Database Module
// Project: https://api.orbitdb.org/module-Database.html

import { IPFS } from './ipfs';
import { IdentityInstance } from './identities';
import { AccessControllerTypeMap, AccessControllerType } from './access-controller';
import { Storage } from './storage';
import { PeerId } from '@libp2p/interface'
import { DatabaseEvents } from "./events";
import { Entry, LogInstance } from "./log";
import { SyncInstance } from "./sync";

interface DatabaseParams<A extends keyof AccessControllerTypeMap = 'ipfs'> {
  ipfs: IPFS;
  identity?: IdentityInstance;
  address?: string;
  name?: string;
  access?: AccessControllerTypeMap[A];
  directory?: string;
  meta?: any;
  headsStorage?: Storage;
  entryStorage?: Storage;
  indexStorage?: Storage;
  referencesCount?: number;
  syncAutomatically?: boolean;
  onUpdate?: (entry: Entry) => void;
}

declare function Database(params: DatabaseParams): DatabaseInstance;

interface DatabaseInstance<A extends AccessControllerType = 'ipfs'> {
  access?: AccessControllerTypeMap[A];
  address?: string;
  events: DatabaseEvents;
  log: LogInstance;
  name?: string;
  peers: Set<PeerId>;
  sync: SyncInstance;
  meta: any;
  identity?: IdentityInstance;

  addOperation(op: any): Promise<string>;
  close(): Promise<void>;
  drop(): Promise<void>;
}

export {
  Database,
  DatabaseInstance
};
