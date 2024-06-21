import { AccessControllerType } from "./access-controller";
import { SyncEvents } from "./events";
import { IPFS } from "./ipfs";
import { Entry, Log, LogInstance } from "./log";
import { PeerId } from "@libp2p/interface";

interface SyncOptions<T, A extends AccessControllerType = 'ipfs'> {
  ipfs: IPFS;
  log: LogInstance<T, A>;
  events?: SyncEvents<T>;
  start?: boolean;

  onSynced?: (peerId: PeerId, heads: Entry<T>[]) => void;
}

interface SyncInstance<T> {
  events: SyncEvents<T>;
  peers: Set<PeerId>;

  start: () => Promise<void>;
  stop: () => Promise<void>;
  add(entry: Entry<T>): void;
}
declare function Sync<T, A extends AccessControllerType = 'ipfs'>(options: SyncOptions<T, A>): Promise<SyncInstance<T>>;

export {
  Sync,
  SyncInstance,
  SyncOptions
}
