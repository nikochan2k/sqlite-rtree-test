
import { Param } from "./Param";

export const param: Param = {
  fname: "RTree2.sqlite",
  createStmts: [
    "CREATE VIRTUAL TABLE IntRTree USING rtree_i32( " +
    "id" +
    ",minTime,maxTime" +
    ",minLat ,maxLat" +
    ",minLon ,maxLon" +
    " )"
  ],
  insertStmt: "INSERT INTO IntRTree(minTime,maxTime,minLat,maxLat,minLon,maxLon) VALUES(?,?,?,?,?,?)",
  selectStmt: "SELECT id FROM IntRTree"
  + " WHERE ? <= minTime AND maxTime <= ?"
  + " AND   ? <= minLat  AND maxLat  <= ?"
  + " AND   ? <= minLon  AND maxLon  <= ?",
  dropStmt: "DROP TABLE IntRTree"
}
