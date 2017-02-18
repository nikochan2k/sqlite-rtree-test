import { benchmark } from "./benchmark2";
import * as btree2 from "./btree2";
import * as rtree2 from "./rtree2";

async function benchmarks() {
  await benchmark(btree2.param);
  await benchmark(rtree2.param);
}

benchmarks();