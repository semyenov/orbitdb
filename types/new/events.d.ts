import {EventEmitter} from "events";
import {Entry} from "./log";
import {PeerId} from "libp2p";

export interface Events extends EventEmitter {
    on(event: 'join', listener: (peerId: PeerId, heads: Entry[]) => void): void;
    on(event: 'leave', listener: (peerId: PeerId ) => void): void;
    on(event: 'error', listener: (error: Error ) => void): void;
}
export interface EventsDatabase implements Events {
    on(event: 'close', listener: () => void): void;
    on(event: 'drop', listener: () => void): void;
    on(event: 'update', listener: (entry: Entry) => void): void;
}
