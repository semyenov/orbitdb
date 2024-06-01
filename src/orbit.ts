import { bitswap } from "@helia/block-brokers";
import { createOrbitDB } from "@orbitdb/core";
import { LevelBlockstore } from "blockstore-level";
import { spyOn } from "tinyspy";

import { createHelia } from "helia";
import { createLibp2p } from "libp2p";
import { DefaultLibp2pBrowserOptions, DefaultLibp2pOptions } from "./config";

import type { Orbit, OrbitOptions } from "../types/orbitdb";
import { logger } from "./logger";
let spied;

export async function startOrbitDB({
  id,
  identity,
  identities,
  directory = ".",
}: OrbitOptions): Promise<Orbit> {
  const options = typeof window !== "undefined"
    ? DefaultLibp2pBrowserOptions
    : DefaultLibp2pOptions;
  ``;

  const ipfs = await createHelia({
    libp2p: await createLibp2p({ ...options }),
    blockstore: new LevelBlockstore(`${directory}/ipfs/blocks`),
    blockBrokers: [bitswap()],
  });

  spied = spyOn(ipfs, "start");

  return createOrbitDB({
    id,
    identity,
    identities,
    directory,
    ipfs,
  });
}

export async function stopOrbitDB(orbitdb: Orbit): Promise<void> {
  await orbitdb.stop();
  await orbitdb.ipfs.stop();
  await orbitdb.ipfs.blockstore.unwrap().unwrap().child.db.close();

  logger.debug("orbitdb stopped", spied.calls, spied.returns);
}
