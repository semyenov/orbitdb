import { KeyStore, KeyStoreInstance } from "./key-store";
import { Storage } from "./storage";
import { IPFS } from "./ipfs";

interface IdentityInstance {
  id: string;
  publicKey: object;
  signatures: {
    id: string;
    publicKey: string;
  };
  type: string;
  sign: (data: any) => Promise<string>;
  verify: (data: any, signature: string) => Promise<boolean>;
}

declare function Identity(identity: IdentityInstance): IdentityInstance;

interface IdentityProvider {
  type: string;
  verifyIdentity: (identity: IdentityInstance) => Promise<boolean>;
}

interface IdentitiesOptions {
  keystore?: KeyStoreInstance;
  path?: string;
  storage?: Storage;
  ipfs?: IPFS;
}

interface IdentityOptions {
  id?: string;
  provider?: Function;
  keystore?: typeof KeyStore;
}

interface IdentitiesInstance {
  createIdentity: (options?: IdentityOptions) => Promise<IdentityInstance>;
  getIdentity: (id: string) => Promise<IdentityInstance>;
  verifyIdentity: (identity: IdentityInstance) => Promise<boolean>;
}

declare function Identities(options?: IdentitiesOptions): IdentitiesInstance;
declare function useIdentityProvider(identityProvider: IdentityProvider): void;

export {
  IdentityInstance,
  Identity,

  IdentitiesOptions,
  IdentitiesInstance,
  Identities,

  useIdentityProvider,
  IdentityProvider
}
