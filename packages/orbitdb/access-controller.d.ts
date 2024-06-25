import type { DatabaseEvents } from './events'
import type { IdentitiesInstance, OrbitDBInstance } from './index'
import type { LogEntry } from './log'
import type { StorageInstance } from './storage'

interface CreateAccessControllerOptions {
  write?: string[]
  storage?: StorageInstance
}

interface AccessControllerOptions {
  orbitdb: OrbitDBInstance
  identities: IdentitiesInstance
  address?: string
}

interface AccessControllerInstance {
  canAppend(entry: LogEntry): Promise<boolean>
}

interface AccessController<
  T extends string,
  U extends AccessControllerInstance,
> {
  type: T
  (options: AccessControllerOptions): Promise<U>
}

interface IPFSAccessControllerInstance extends AccessControllerInstance {
  type: string
  address: string
  write: string[]
}

declare const IPFSAccessController: (
  options?: CreateAccessControllerOptions,
) => AccessController<'ipfs', IPFSAccessControllerInstance>

interface OrbitDBAccessControllerInstance extends AccessControllerInstance {
  close(): Promise<void>
  drop(): Promise<void>
  capabilities(): Promise<string[]>
  get(capability: string): Promise<string[]>
  grant(capability: string, key: string): Promise<void>
  hasCapability(capability: string, key: string): Promise<boolean>
  revoke(capability: string, key: string): Promise<void>
  events: DatabaseEvents
}

declare const OrbitDBAccessController: (
  options?: CreateAccessControllerOptions,
) => AccessController<'orbitdb', OrbitDBAccessControllerInstance>

export type {
  AccessController,
  AccessControllerInstance,
  IPFSAccessControllerInstance,
  OrbitDBAccessControllerInstance,
}

export { IPFSAccessController, OrbitDBAccessController }

export function useAccessController(accessController: { type: string }): void
