import { bitswap } from '@helia/block-brokers'
import { Identities, KeyStore, OrbitDBAccessController, PublicKeyIdentityProvider, createOrbitDB } from '@orbitdb/core'
import { createHelia } from 'helia'
import { createLibp2p } from 'libp2p'

import { DefaultLibp2pOptions } from './config'
import { logger } from './logger'

const id = 'userA'
const keysPath = './.out/keys'
const options = DefaultLibp2pOptions

const ipfs = await createHelia({
  libp2p: await createLibp2p({ ...options }),
  // blockstore: new LevelBlockstore(levelPath),
  blockBrokers: [bitswap()],
})

await ipfs.start()

const keystore = await KeyStore({ path: keysPath })
const identities = await Identities({ keystore, ipfs })
const provider = PublicKeyIdentityProvider({ keystore })

const identity = await identities.createIdentity({ id, provider })
const result = await identities.getIdentity(identity.hash)

logger.log('result', result)
logger.log('address', ipfs.libp2p.peerId)

const orbit = await createOrbitDB({
  id: 'orbitdb-AAA',
  ipfs,
  identities,
  identity,
  directory: './.out/orbitdb',
})

const db = await orbit.open('test', {
  type: 'events',
  AccessController: OrbitDBAccessController({
    write: [identity.id],
  }),
})

for (let i = 0; i < 10; i++) {
  await db.add({ message: `Hello, world! ${i}` })
}

logger.log('db', db.address)

// await ipfs.stop()
