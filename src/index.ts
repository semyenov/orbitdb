import { inspect } from "util";
import { startOrbitDB, stopOrbitDB } from "./orbit";

import type { Orbit } from "../types/orbitdb";

const orbitdb: Orbit = await startOrbitDB({
  id: "zdpuAsxVFKAoY6z8LnLsUtTKkGB4deEcXmhyAEbwkefaLsXR6",
  directory: "./orbitdb",
});

const db = await orbitdb.open("my-database");
console.log(
  "\n--- db address - " + new Date().toISOString() + "\n" +
    db.address,
);

// db.events.on("update", async (entry) => {
//   console.log(
//     "\n--- on update - " + new Date().toISOString() + "\n" +
//       inspect(entry, {
//         showHidden: false,
//         colors: true,
//         depth: 1,
//       }),
//   );
// });

for (let i = 0; i < 1000; i++) {
  const promises = Array.from({ length: 1000 }).map((_, index) => {
    return db.add({ value: i * 1000 + index }).then((key) => {
      console.log(
        "\n--- db add - " + new Date().toISOString() + "\n" + i + " - " + key,
      );
    });
  });

  await Promise.all(promises);

  // db.get(key).then((value) => {
  //   console.log(
  //     "\n--- db get - " + new Date().toISOString() + "\n" +
  //       inspect(value, {
  //         showHidden: false,
  //         colors: true,
  //         depth: 1,
  //       }),
  //   );
  // });
}

await stopOrbitDB(orbitdb);
