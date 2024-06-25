import { Storage } from "./storage";
import { IPFS } from "./ipfs";
import { DatabaseType } from "./databases";
import { AccessControllerType } from "./access-controller";

interface Manifest {
  name: string;
  type: DatabaseType;
  accessController: AccessControllerType;
  meta?: any;
}

interface ManifestStoreInstance {
  get(address: string): Promise<Manifest>;
  create(manifest: Manifest): Promise<{ hash: string; manifest: Manifest }>;
  close(): Promise<void>;
}

declare function ManifestStore(options?: { ipfs?: IPFS; storage?: Storage }): Promise<ManifestStoreInstance>;

export {
  Manifest,
  ManifestStoreInstance,
  ManifestStore,
};
