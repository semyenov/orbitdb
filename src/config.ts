import { identify } from "@libp2p/identify";
import { webSockets } from "@libp2p/websockets";
import { webRTC } from "@libp2p/webrtc";
import { all } from "@libp2p/websockets/filters";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";

import type { Libp2pOptions } from "libp2p";

export const DefaultLibp2pOptions: Libp2pOptions = {
  addresses: {
    listen: ["/ip4/0.0.0.0/tcp/0/ws"],
  },
  transports: [
    webRTC(),
    webSockets({ filter: all }),
    circuitRelayTransport({ discoverRelays: 1 }),
  ],
  connectionEncryption: [
    noise(),
  ],
  streamMuxers: [
    yamux(),
  ],
  connectionGater: {
    denyDialMultiaddr: () => false,
  },
  services: {
    identify: identify(),
    pubsub: gossipsub({ allowPublishToZeroTopicPeers: true }),
  },
};

export const DefaultLibp2pBrowserOptions: Libp2pOptions = {
  addresses: {
    listen: ["/webrtc"],
  },
  transports: [
    webRTC(),
    webSockets({ filter: all }),
    circuitRelayTransport({ discoverRelays: 1 }),
  ],
  connectionEncryption: [
    noise(),
  ],
  streamMuxers: [
    yamux(),
  ],
  connectionGater: {
    denyDialMultiaddr: () => false,
  },
  services: {
    identify: identify(),
    pubsub: gossipsub({ allowPublishToZeroTopicPeers: true }),
  },
};
