import { Database, Statement } from "sqlite3";


export class AsyncDatabase {

  public static open(filename: string): Promise<AsyncDatabase> {
    return new Promise((resolve, reject) => {
      try {
        const asyncDb = new AsyncDatabase(filename);
        resolve(asyncDb);
      } catch (err) {
        reject(err);
      }
    });
  }

  private db: Database

  private constructor(filename: string) {
    const promise = new Promise((resolve, reject) => {
      this.db = new Database(filename, (err) => {
        if (err) reject(err); else resolve();
      });
    });
    promise.then().catch((err) => { throw err });
  }

  public exec(sql: string): Promise<AsyncDatabase> {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) reject(err); else resolve(this);
      });
    });
  }

  public serialize(callback: () => void): Promise<AsyncDatabase> {
    return new Promise((resolve) => {
      this.db.serialize(() => {
        callback();
        resolve(this);
      });
    });
  }

  public prepare(sql: string, params?: any): Promise<AsyncStatement> {
    let stmt: Statement;
    return new Promise<AsyncStatement>((resolve, reject) => {
      let innerPromise: Promise<AsyncDatabase>;
      if (params) {
        innerPromise = new Promise((res, rej) => {
          stmt = this.db.prepare(sql, params, (err) => {
            if (err) rej(err); else res(this);
          });
        });
      } else {
        innerPromise = new Promise((res, rej) => {
          stmt = this.db.prepare(sql, params, (err) => {
            if (err) rej(err); else res(this);
          });
        });
      }
      innerPromise.then(() => {
        const asyncStmt = new AsyncStatement(stmt);
        resolve(asyncStmt);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public close(): Promise<AsyncDatabase> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err); else resolve(this);
      });
    });
  }
}

export class AsyncStatement {
  public constructor(private stmt: Statement) {
  }

  public run(...params: any[]): Promise<AsyncStatement> {
    return new Promise((resolve, reject) => {
      if (params) {
        this.stmt.run(params, (err) => {
          if (err) reject(err); else resolve(this);
        });
      } else {
        this.stmt.run((err) => {
          if (err) reject(err); else resolve(this);
        });
      }
    });
  }

  public each(params?: any, callback?: (row: any) => void, complete?: (complete: number) => void): Promise<AsyncStatement> {
    return new Promise((resolve, reject) => {
      if (params) {
        this.stmt.each(params, (err, row) => {
          if (err) reject(err); else if (callback) callback(row);
        }, (err, count) => {
          if (err) reject(err); else if (complete) complete(count);
        });
      } else {
        this.stmt.each((err, row) => {
          if (err) reject(err); else if (callback) callback(row);
        }, (err, count) => {
          if (err) reject(err); else if (complete) complete(count);
        });
      }
      resolve(this);
    });
  }

  public all(params?: any, callback?: (rows: any[]) => void): Promise<AsyncStatement> {
    return new Promise((resolve, reject) => {
      if (params) {
        this.stmt.all(params, (err, rows) => {
          if (err) reject(err); else if (callback) callback(rows);
        });
      } else {
        this.stmt.all((err, rows) => {
          if (err) reject(err); else if (callback) callback(rows);
        });
      }
      resolve(this);
    });
  }

  public finalize(): Promise<AsyncStatement> {
    return new Promise((resolve, reject) => {
      this.stmt.finalize((err) => {
        if (err) reject(err); else resolve(this);
      });
    });
  }
}