import { Param } from "./Param";

export const param: Param = {
  fname: "RTree1.sqlite",
  createStmts: ["CREATE VIRTUAL TABLE IntRTree USING rtree_i32(id,minTime,maxTime)"],
  insertStmt: "INSERT INTO IntRTree(minTime,maxTime) VALUES(?,?)",
  selectStmt: "SELECT id FROM IntRTree WHERE ? <= minTime AND maxTime <= ?",
  dropStmt: "DROP TABLE IntRTree"
}