import { EventEmitter } from "events";
import { Entry } from "./log";

export interface SyncEvents extends EventEmitter {
  on(event: 'join', listener: (peerId: string, heads: Entry[]) => void): this;
  on(event: 'leave', listener: (peerId: string) => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
}

export interface DatabaseEvents extends EventEmitter {
  on(event: 'join', listener: (peerId: string, heads: Entry[]) => void): this;
  on(event: 'leave', listener: (peerId: string) => void): this;
  on(event: 'close', listener: () => void): this;
  on(event: 'drop', listener: () => void): this;
  on(event: 'update', listener: (entry: Entry) => void): this;
}
