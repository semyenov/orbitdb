export type { PeerId } from "@libp2p/interface";
import type { HeliaLibp2p } from "helia";
import type { Libp2p } from "libp2p";

export type IPFS = HeliaLibp2p<Libp2p<Record<string, unknown>>>;
