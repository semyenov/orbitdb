import { fakerRU as faker } from "@faker-js/faker";

import { startOrbitDB, stopOrbitDB } from "./orbit";
import { logger } from "./logger";

import type { Orbit } from "../types/orbitdb";

const dbName = process.argv[2] || "my-database";

// Create OrbitDB instance
const orbitdb: Orbit = await startOrbitDB({
  id: "zdpuAsxVFKAoY6z8LnLsUtTKkGB4deEcXmhyAEbwkefaLsXR6",
  directory: "./orbitdb",
});

// Open a database
const db = await orbitdb.open(dbName, { type: "documents" });
logger.log("address", db.address);

// Listen for updates
db.events.on(
  "update",
  ({ id, hash, payload: { key, op } }) =>
    logger.log("onupdate", { id, hash, op, key }),
);

// Add some data
await generate(10000, 100);

// Get some data
const value = await db.get("12");
logger.debug("value", value);

// Iterate over records
for await (const record of db.iterator({ amount: 5 })) {
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

  logger.info("time", `took ${(time / size).toFixed(2)}ms/op average`);
}
