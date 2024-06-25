import { SyncEvents } from "./events";
import { IPFS } from "./ipfs";
import { LogEntry, Log, LogInstance } from "./log";
import { PeerId } from "@libp2p/interface";

interface SyncOptions<T> {
  ipfs: IPFS;
  log: LogInstance<T>;
  events?: SyncEvents<T>;
  start?: boolean;

  onSynced?: (peerId: PeerId, heads: LogEntry<T>[]) => void;
}

interface SyncInstance<T> {
  events: SyncEvents<T>;
  peers: Set<PeerId>;

  start: () => Promise<void>;
  stop: () => Promise<void>;
  add(entry: LogEntry<T>): void;
}
declare function Sync<T>(options: SyncOptions<T>): Promise<SyncInstance<T>>;

export {
  SyncOptions,
  SyncInstance,
  Sync,
}
