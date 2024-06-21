import { fakerRU as faker } from "@faker-js/faker";
import { startOrbitDB, stopOrbitDB, } from "./orbit";
import { logger } from "./logger";
import { IPFSAccessController, OrbitDBAccessController } from '../types/orbitdb__core'
// import {userA, userB, identities} from './create-users'

// const users = [userA, userB]
// Get DB name and directory from command line
const dbName = process.argv[2] || "my-database";
const dbDir = process.argv[3] || "./orbitdb";

const dbId = process.argv[4] || "zdpuAsxVFKAoY6z8LnLsUtTKkGB4deEcXmhyAEbwkefaLsXR6";
const userId = process.argv[5] || "0";
logger.log('args', process.argv)
// Create OrbitDB instance
// const currentUser = users[Number(userId)]
const orbitdb = await startOrbitDB({
    id: dbId,
    directory: dbDir,
})

const accessController = OrbitDBAccessController({
    write: ['*']
})
orbitdb.ipfs.libp2p.logger = logger
// logger.log('orbitDb',orbitdb.ipfs.libp2p.logger)
// Open a database
const db = await orbitdb.open<{ test: string }, 'documents', 'orbitdb'>(dbName, { type: "documents", AccessController: accessController });
logger.log("address", db.address);

// Listen for updates
db.events.on(
    "update",
    ({ id, hash, payload: { key, op } }) =>
        logger.log("onupdate", { id, hash, op, key }),
);
db.events.on('join', (peerId, heads) => {
    // db.access?.grant('write', peerId.)
    logger.log('join', peerId)

});
db.events.on("drop", (peerId, heads) => logger.log("drop", peerId));

while (true) {
    const opt = await logger.prompt('Enter a command: ', {
        type: 'select',
        options: [
            { label: 'Get', value: 'get' },
            { label: 'Put', value: 'put' },
            { label: 'Exit', value: 'exit' },
            { label: 'Sync stop', value: 'sync.stop' },
            { label: 'Sync start', value: 'sync.start' },
            { label: 'All', value: 'all' }
        ],
    }) as unknown as string;
    logger.log("opt", opt);
    switch (opt) {
        case 'get':
            const k = await logger.prompt('Enter key: ', { type: 'text' })
            const v = await db.get(k);
            logger.debug("value", v);
            break;
        case 'put':
            const _id = await logger.prompt('Enter key: ', { type: 'text' })
            const value = await logger.prompt('Enter value: ', { type: 'text' })
            await db.put({ _id, value });
            break;
        case 'all':
            const all = await db.all();
            logger.debug("all", all);
            break;
        case 'sync.stop':
            await db.sync.stop();
            break;
        case 'sync.start':
            await db.sync.start();
            break;

        case 'exit':
            process.exit(0);

    }
}
// Add some data
// await generate(1000000);

// Get some data
const value = await db.get("12");

logger.debug("value", value);

// Iterate over records
for await (const record of db.iterator({ amount: 1 })) {
    logger.warn("record", record);
}

// Stop OrbitDB
// await stopOrbitDB(orbitdb);

async function generate(size: number, chunkSize: number = 1000) {
    let time = 0;
    for (let i = 0; i < size; i += chunkSize) {
        const length = Math.min(chunkSize, size - i);
        const chunk = Array.from({ length }, (_, j) => ({
            _id: (i + (j + 1)).toString(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            company: faker.company.name(),
            phone: faker.phone.number(),
            value: faker.lorem.paragraphs({ min: 2, max: 5 }),
        }));

        const startTime = performance.now();
        await Promise.all(chunk.map(db.put));
        time += performance.now() - startTime;
    }

    logger.info("time", `took ${(1000 / time / size).toFixed(2)}op/sec average`);
}


import * as crypto from '@libp2p/crypto';
const unmarshal = crypto.keys.supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey
const unmarshalPubKey = crypto.keys.supportedKeys.secp256k1.unmarshalSecp256k1PublicKey

const createKey = async (id: string) => {
    if (!id) {
        throw new Error('id needed to create a key')
    }
    // Generate a private key
    const keyPair = await crypto.keys.generateKeyPair('secp256k1')
    const keys = await crypto.keys.unmarshalPrivateKey(keyPair.bytes)
    keys.public.marshal()
    const key = {
        publicKey: keys.public.marshal(),
        privateKey: keys.marshal()
    }
    await addKey(id, key)
    return keys
}

const addKey = async (id, key) => {
    const { privateKey } = key
    await storage.put('private_' + id, privateKey)
    // Unmarshal the key and add it to the cache
    const unmarshaledPrivateKey = unmarshal(privateKey)
    await keyCache.put(id, unmarshaledPrivateKey)
}

const getKey = async (id) => {
    if (!id) {
        throw new Error('id needed to get a key')
    }
    let key = await keyCache.get(id)
    if (!key) {
        let storedKey
        try {
            storedKey = await storage.get('private_' + id)
        } catch (e) {
            // ignore ENOENT error
        }
        if (!storedKey) {
            return
        }
        const key = unmarshal(storedKey)
        key.
        await keyCache.put(id, key)
    }
    return key
}
