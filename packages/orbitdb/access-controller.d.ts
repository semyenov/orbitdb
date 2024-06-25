import { LogEntry } from "./log";
import { StorageInstance } from "./storage";
import { IdentitiesInstance, OrbitDBInstance } from "./index";
import { DatabaseEvents } from "./events";

interface CreateAccessControllerOptions {
  write?: string[];
  storage?: StorageInstance;
}

interface AccessControllerInstance {
  canAppend(entry: LogEntry): Promise<boolean>;
}

interface AccessControllerOptions {
  orbitdb: OrbitDBInstance,
  identities: IdentitiesInstance,
  address?: string,
}

interface IPFSAccessControllerInstance extends AccessControllerInstance {
  type: 'ipfs';
  address: string;
  write: string[];
}
declare function IPFSAccessController(options?: CreateAccessControllerOptions):
  (options: AccessControllerOptions) => Promise<IPFSAccessControllerInstance>;

interface OrbitDBAccessControllerInstance extends AccessControllerInstance {
  close(): Promise<void>
  drop(): Promise<void>
  capabilities(): Promise<string[]>
  get(capability: string): Promise<string[]>
  grant(capability: string, key: string): Promise<void>
  hasCapability(capability: string, key: string): Promise<boolean>
  revoke(capability: string, key: string): Promise<void>;
  events: DatabaseEvents;
}
declare function OrbitDBAccessController(options?: Pick<CreateAccessControllerOptions, 'write'>):
  (options: AccessControllerOptions) => Promise<OrbitDBAccessControllerInstance>;

declare function useAccessController(accessController: { type: string }): void;

export {
  IPFSAccessController,
  OrbitDBAccessController,

  useAccessController,

  AccessControllerInstance,
  OrbitDBAccessControllerInstance,
};

