import * as fs from "fs";
import { AsyncDatabase } from "./AsyncDatabase";
import { Param } from "./Param";

export async function benchmark(param: Param) {
  console.log(param.fname);

  let start: number;
  let diff: number;

  const db = await AsyncDatabase.open(param.fname);
  await db.exec("PRAGMA synchronous = NORMAL");
  await db.exec("PRAGMA journal_mode = WAL");
  await db.serialize(() => {
    param.createStmts.forEach(async (createStmt) => {
      await db.exec(createStmt);
    })
  });

  start = Date.now();
  await db.exec("BEGIN");
  let stmt = await db.prepare(param.insertStmt);
  for (let i = 0; i < 50000 * 2;) {
    const minTime = i++;
    const maxTime = i++;
    await stmt.run(minTime, maxTime);
  }
  await stmt.finalize();
  await db.exec("COMMIT");
  diff = Date.now() - start;
  console.log("Insert time: " + diff);

  start = Date.now();
  stmt = await db.prepare(param.selectStmt);
  for (let i = 1; i <= 1000; i++) {
    await stmt.all([i, i + 1]);
  }
  await stmt.finalize();
  diff = Date.now() - start;
  console.log("Select time: " + diff);

  await db.exec(param.dropStmt);
  await db.close();

  console.log("Size: " + fs.statSync(param.fname).size)
  fs.unlinkSync(param.fname);
}
