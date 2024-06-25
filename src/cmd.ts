import { fakerRU as faker } from "@faker-js/faker";
import { startOrbitDB } from "./orbit";
import { logger } from "./logger";
import { OrbitDBAccessController } from "@orbitdb/core";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// const users = [userA, userB]
// Get DB name and directory from command line
const dbName = process.argv[2] || "my-database";
const dbDir = process.argv[3] || "./orbitdb";

const dbId = process.argv[4] ||
  "zdpuAsxVFKAoY6z8LnLsUtTKkGB4deEcXmhyAEbwkefaLsXR6";
const userId = process.argv[5] || "0";
logger.log("args", process.argv);
// Create OrbitDB instance
// const currentUser = users[Number(userId)]
const orbitdb = await startOrbitDB({
  id: dbId,
  directory: dbDir,
});

const accessController = await OrbitDBAccessController({ write: ["*"] });
// orbitdb.ipfs.libp2p.logger = logger
// logger.log('orbitDb',orbitdb.ipfs.libp2p.logger)

// Open a database
const db = await orbitdb.open<IUser, "documents">(
  dbName,
  { type: "documents", AccessController: accessController },
);
logger.log("address", db.address);

// Listen for updates
db.events.on(
  "update",
  ({ id, hash, payload }) => logger.log("onupdate", payload),
);
db.events.on("join", (peerId, heads) => {
  // db.access?.grant('write', peerId.)
  logger.log("join", peerId);
});
db.events.on("drop", () => logger.log("drop"));

while (true) {
  const opt = await logger.prompt("Enter a command: ", {
    type: "select",
    options: [
      { label: "Get", value: "get" },
      { label: "Put", value: "put" },
      { label: "Exit", value: "exit" },
      { label: "Sync stop", value: "sync.stop" },
      { label: "Sync start", value: "sync.start" },
      { label: "All", value: "all" },
    ],
  }) as unknown as string;
  logger.log("opt", opt);
  switch (opt) {
    case "get":
      const k = await logger.prompt("Enter key: ", { type: "text" });
      const v = await db.get(k);
      logger.debug("value", v);
      break;
    case "put":
      const _id = await logger.prompt("Enter key: ", { type: "text" });
      const value = await logger.prompt("Enter value: ", { type: "text" });
      await db.put({
        _id,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
      });
      break;
    case "all":
      const all = await db.all();
      logger.debug("all", all);
      break;
    case "sync.stop":
      await db.sync.stop();
      break;
    case "sync.start":
      await db.sync.start();
      break;

    case "exit":
      process.exit(0);
  }
}
