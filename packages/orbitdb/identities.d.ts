import { KeyStore, KeyStoreInstance } from "./key-store";
import { StorageInstance } from "./storage";
import { IPFS } from "./ipfs";

interface IdentityInstance {
  id: string;
  publicKey: string;
  signatures: {
    id: string;
    publicKey: string;
  };
  type: string;
  hash?: string;
  bytes?: Uint8Array;
  sign?: (data: any) => Promise<string>;
  verify?: (data: any, signature: string) => Promise<boolean>;
}

declare function Identity(identity: IdentityInstance): Promise<IdentityInstance>;

interface OptionsIdentityProvider {
  keystore: KeyStoreInstance;
  provider: Function;
}

interface IdentityProviderInstance {
  type: string;
  getId: (options: OptionsIdentityProvider) => string;
  signIdentity: (data: string, options: OptionsIdentityProvider) => string;
}

interface IdentityProvider {
  (): () => Promise<IdentityProviderInstance>;
  verifyIdentity: (data: any) => Promise<boolean>;
  type: string;
}

interface IdentitiesOptions {
  path?: string;

  ipfs?: IPFS;
  keystore?: KeyStoreInstance;
  storage?: StorageInstance;
}

declare function PublicKeyIdentityProvider(options: Pick<IdentityOptions, 'keystore'>): () => Promise<IdentityProviderInstance>;

interface IdentityOptions {
  id?: string;
  provider?: ReturnType<typeof PublicKeyIdentityProvider>;
  keystore?: KeyStoreInstance;
}

interface IdentitiesInstance {
  (options?: IdentitiesOptions): Promise<IdentitiesInstance>
  createIdentity: (options?: IdentityOptions) => Promise<IdentityInstance>;
  getIdentity: (id: string) => Promise<IdentityInstance>;
  verifyIdentity: (identity: IdentityInstance) => Promise<boolean>;
  keystore: KeyStoreInstance;
  sign: (identities: IdentityInstance, data: string, keystore: KeyStoreInstance) => Promise<string>;
  verify: (signature: string, publickey: string, data: string) => Promise<boolean>;
}
declare function Identities(options?: IdentitiesOptions): Promise<IdentitiesInstance>;

declare function getIdentityProvider(type: string): IdentityProviderInstance;
declare function useIdentityProvider(identityProvider: IdentityProvider): void;
declare function isEqual(identity1: IdentityInstance, identity2: IdentityInstance): boolean;
declare function isIdentity(identity: any): boolean;
declare function decodeIdentity(bytes: Uint8Array): Promise<IdentityInstance>;

export {
  IdentityOptions,
  IdentityInstance,
  Identity,

  IdentitiesOptions,
  IdentitiesInstance,
  Identities,

  IdentityProvider,
  IdentityProviderInstance,
  PublicKeyIdentityProvider,

  useIdentityProvider,
  getIdentityProvider,
  decodeIdentity,
  isIdentity,
  isEqual,
}
