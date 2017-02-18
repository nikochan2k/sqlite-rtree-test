import { Param } from "./Param";

export const param: Param = {
  fname: "NoIndex1.sqlite",
  createStmts: [
    "CREATE TABLE IntNoIndex(id INTEGER PRIMARY KEY,minTime INTEGER NOT NULL,maxTime INTEGER NOT NULL)"
  ],
  insertStmt: "INSERT INTO IntNoIndex(minTime,maxTime) VALUES(?,?)",
  selectStmt: "SELECT id FROM IntNoIndex WHERE ? <= minTime AND maxTime <= ?",
  dropStmt: "DROP TABLE IntNoIndex"
}