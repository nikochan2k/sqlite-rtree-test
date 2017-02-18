
import { Param } from "./Param";

export const param: Param = {
  fname: "BTree2.sqlite",
  createStmts: [
    "CREATE TABLE IntBTree( " +
    "id INTEGER PRIMARY KEY" +
    ",minTime INTEGER NOT NULL,maxTime INTEGER NOT NULL" +
    ",minLat  INTEGER NOT NULL,maxLat  INTEGER NOT NULL" +
    ",minLon  INTEGER NOT NULL,maxLon  INTEGER NOT NULL" +
    " )",
    "CREATE INDEX IxIntBTree1 ON IntBTree(minTime)",
    "CREATE INDEX IxIntBTree2 ON IntBTree(maxTime)",
    "CREATE INDEX IxIntBTree3 ON IntBTree(minLat)",
    "CREATE INDEX IxIntBTree4 ON IntBTree(maxLat)",
    "CREATE INDEX IxIntBTree5 ON IntBTree(minLon)",
    "CREATE INDEX IxIntBTree6 ON IntBTree(maxLon)"
  ],
  insertStmt: "INSERT INTO IntBTree(minTime,maxTime,minLat,maxLat,minLon,maxLon) VALUES(?,?,?,?,?,?)",
  selectStmt: "SELECT id FROM IntBTree"
  + " WHERE ? <= minTime AND maxTime <= ?"
  + " AND   ? <= minLat  AND maxLat <= ?"
  + " AND   ? <= minLon  AND maxLon <= ?",
  dropStmt: "DROP TABLE IntBTree"
}
