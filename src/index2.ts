import { fakerRU as faker } from "@faker-js/faker";
import { startOrbitDB, stopOrbitDB } from "./orbit";
import { logger } from "./logger";

// Get DB name and directory from command line
const dbName = process.argv[2] || "my-database";
const dbDir = process.argv[3] || "./orbitdb";

const dbId = process.argv[4] ||
  "zdpuAsxVFKAoY6z8LnLsUtTKkGB4deEcXmhyAEbwkefaLsXR6";

// Create OrbitDB instance
const orbitdb = await startOrbitDB({
  id: dbId,
  directory: dbDir,
});

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// orbitdb.ipfs.libp2p.logger = logger
// logger.log('orbitDb',orbitdb.ipfs.libp2p.logger)
// Open a database
const db = await orbitdb.open<IUser, "documents">(dbName, {
  type: "documents",
});
logger.log("address", db.address);

// Listen for updates
db.events.on(
  "update",
  ({ id, hash, payload: { key, op } }) =>
    logger.log("onupdate", { id, hash, op, key }),
);
db.events.on("join", (peerId, heads) => logger.log("join", peerId));
db.events.on("drop", () => logger.log("drop"));

// Add some data
await generate(10000);

// Get some data
const value = await db.get("12");

logger.debug("value", value);

// Iterate over records
for await (const record of db.iterator({ amount: 1 })) {
  logger.warn("record", record);
}

// Stop OrbitDB
await stopOrbitDB(orbitdb);

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
