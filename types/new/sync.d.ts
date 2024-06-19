import {SyncEvents} from "./events";
import {IPFS} from "./ipfs";
import {Entry, Log} from "./log";
import {PeerId} from "libp2p";

interface SyncParams {
    ipfs: IPFS;
    log: Log;
    events?: SyncEvents;
    onSynced?: (peerId: PeerId, heads: Entry[]) => void;
    start?: boolean;
}

interface SyncInstance {
    events: SyncEvents;
    peers: Set<PeerId>;
    start: () => Promise<void>;
    stop: () => Promise<void>;

    add(entry: Entry): void;
}


function Sync(params: SyncParams): Promise<SyncInstance>;

export {
    Sync,
    SyncInstance,
    SyncParams
}
