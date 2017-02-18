import { Param } from "./Param";

export const param: Param = {
  fname: "BTree1_2.sqlite",
  createStmts: [
    "CREATE TABLE IntBTree(id INTEGER PRIMARY KEY,minTime INTEGER NOT NULL,maxTime INTEGER NOT NULL)",
    "CREATE INDEX IxIntBTree1 ON IntBTree(minTime,maxTime)"
  ],
  insertStmt: "INSERT INTO IntBTree(minTime,maxTime) VALUES(?,?)",
  selectStmt: "SELECT id FROM IntBTree WHERE ? <= minTime AND maxTime <= ?",
  dropStmt: "DROP TABLE IntBTree"
}