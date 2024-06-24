import { LogEntry } from "./log";
import { Storage } from "./storage";

interface AccessControllerTypeMap {
  ipfs: IPFSAccessControllerInstance,
  orbitdb: OrbitDBAccessControllerInstance
}

type AccessControllerType = keyof AccessControllerTypeMap;

interface AccessControllerOptions {
  write?: string[];
  storage?: Storage;
}

interface IPFSAccessControllerInstance {
  canAppend(entry: LogEntry<unknown>): Promise<boolean>;
}

interface OrbitDBAccessControllerInstance extends IPFSAccessControllerInstance {
  capabilities(): Promise<string[]>
  close(): Promise<void>
  drop(): Promise<void>
  get(capability: string): Promise<string[]>
  grant(capability: string, key: string): Promise<void>
  hasCapability(capability: string, key: string): Promise<boolean>
  revoke(capability: string, key: string): Promise<void>;
}

declare function IPFSAccessController(options?: AccessControllerOptions): Promise<IPFSAccessControllerInstance>;
declare function OrbitDBAccessController(options: Pick<AccessControllerOptions, 'write'>): Promise<OrbitDBAccessControllerInstance>;

declare function useAccessController(accessController: { type: AccessControllerType }): void;

export {
  IPFSAccessController,
  OrbitDBAccessController,
  useAccessController,

  AccessControllerTypeMap,
  AccessControllerType
};

