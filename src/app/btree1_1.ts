import { Param } from "./Param";

export const param: Param = {
  fname: "BTree1_1.sqlite",
  createStmts: [
    "CREATE TABLE IntBTree(id INTEGER PRIMARY KEY,minTime INTEGER NOT NULL,maxTime INTEGER NOT NULL)",
    "CREATE INDEX IxIntBTree1 ON IntBTree(minTime)",
    "CREATE INDEX IxIntBTree2 ON IntBTree(maxTime)"
  ],
  insertStmt: "INSERT INTO IntBTree(minTime,maxTime) VALUES(?,?)",
  selectStmt: "SELECT id FROM IntBTree WHERE ? <= minTime AND maxTime <= ?",
  dropStmt: "DROP TABLE IntBTree"
}
