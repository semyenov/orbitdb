import { StorageInstance } from "./storage";
import { IPFS } from "./ipfs";
import { DatabaseType } from "./databases";

interface Manifest {
  name: string;
  type: DatabaseType;
  accessController: string;
  meta?: any;
}

interface ManifestStoreOptions {
  ipfs?: IPFS;
  storage?: StorageInstance;
}

interface ManifestStoreInstance {
  get(address: string): Promise<Manifest>;
  create(manifest: Manifest): Promise<{ hash: string; manifest: Manifest }>;
  close(): Promise<void>;
}

declare function ManifestStore(
  options?: ManifestStoreOptions,
): Promise<ManifestStoreInstance>;

export type { Manifest, ManifestStoreInstance };

export { ManifestStore };
