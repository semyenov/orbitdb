import type { KeyStoreInstance } from './key-store'
import type { StorageInstance } from './storage'
import type { IPFS } from './vendor'

interface IdentityOptions {
  id?: string
  provider?: ReturnType<typeof PublicKeyIdentityProvider>
  keystore?: KeyStoreInstance
}
interface IdentityInstance {
  id: string
  publicKey: string
  signatures: {
    id: string
    publicKey: string
  }
  type: string
  hash?: string
  bytes?: Uint8Array

  sign?: (data: any) => Promise<string>
  verify?: (data: any, signature: string) => Promise<boolean>
}
declare function Identity(
  identity: IdentityInstance,
): Promise<IdentityInstance>

interface IdentityProviderOptions {
  keystore: KeyStoreInstance
  provider: Function
}
interface IdentityProviderInstance {
  type: string
  getId: (options: IdentityProviderOptions) => string
  signIdentity: (data: string, options: IdentityProviderOptions) => string
}
interface IdentityProvider {
  (): () => Promise<IdentityProviderInstance>
  verifyIdentity: (data: any) => Promise<boolean>
  type: string
}

declare function PublicKeyIdentityProvider(
  options: Pick<IdentityOptions, 'keystore'>,
): () => Promise<IdentityProviderInstance>

interface IdentitiesOptions {
  path?: string

  ipfs?: IPFS
  keystore?: KeyStoreInstance
  storage?: StorageInstance
}
interface IdentitiesInstance {
  (options?: IdentitiesOptions): Promise<IdentitiesInstance>
  createIdentity: (options?: IdentityOptions) => Promise<IdentityInstance>
  getIdentity: (id: string) => Promise<IdentityInstance>
  verifyIdentity: (identity: IdentityInstance) => Promise<boolean>
  keystore: KeyStoreInstance
  sign: (
    identity: IdentityInstance,
    data: string | Uint8Array,
  ) => Promise<string>
  verify: (
    signature: string,
    publickey: string,
    data: string | Uint8Array,
  ) => Promise<boolean>
}
declare function Identities(
  options?: IdentitiesOptions,
): Promise<IdentitiesInstance>

export type {
  IdentitiesInstance,
  IdentitiesOptions,
  IdentityInstance,
  IdentityOptions,
  IdentityProvider,
  IdentityProviderInstance,
}
export { Identities, Identity, PublicKeyIdentityProvider }

export function getIdentityProvider(type: string): IdentityProviderInstance
export function useIdentityProvider(identityProvider: IdentityProvider): void
export function decodeIdentity(bytes: Uint8Array): Promise<IdentityInstance>
export function isIdentity(identity: any): boolean
export function isEqual(
  identity1: IdentityInstance,
  identity2: IdentityInstance,
): boolean
