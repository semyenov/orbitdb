import {HeliaLibp2p} from "helia";
import {Libp2p} from "libp2p";

export type IPFS = HeliaLibp2p<Libp2p<Record<string, unknown>>>;
