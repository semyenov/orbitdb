import { bitswap } from "@helia/block-brokers";
import { createOrbitDB, CreateOrbitDBOptions, OrbitDBInstance } from "@orbitdb/core";
import { LevelBlockstore } from "blockstore-level";

import { createHelia } from "helia";
import { createLibp2p } from "libp2p";
import { DefaultLibp2pBrowserOptions, DefaultLibp2pOptions } from "./config";

import { logger } from "./logger";
let spied;

const isBrowser = () => typeof window !== "undefined";
export async function startOrbitDB({
  id,
  identity,
  identities,
  directory = ".",
}: Omit<CreateOrbitDBOptions, 'ipfs'>) {
  const options = isBrowser()
    ? DefaultLibp2pBrowserOptions
    : DefaultLibp2pOptions;

  const ipfs = await createHelia({
    libp2p: await createLibp2p({ ...options }),
    blockstore: new LevelBlockstore(`${directory}/ipfs/blocks`),
    blockBrokers: [bitswap()],
  });

  return createOrbitDB({
    id,
    identity,
    identities,
    directory,
    ipfs,
  });
}

export async function stopOrbitDB(orbitdb: OrbitDBInstance): Promise<void> {
  await orbitdb.stop();
  await orbitdb.ipfs.stop();

  logger.debug("orbitdb stopped", spied.calls, spied.returns);
}
