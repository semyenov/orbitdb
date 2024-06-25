import type { HeliaLibp2p } from 'helia'
import type { Libp2p } from 'libp2p'

export type { PeerId } from '@libp2p/interface'

export type IPFS = HeliaLibp2p<Libp2p<Record<string, unknown>>>
