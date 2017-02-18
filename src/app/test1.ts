import { benchmark } from "./benchmark1";
import * as noindex1 from "./noindex1";
import * as btree1_1 from "./btree1_1";
import * as btree1_2 from "./btree1_2";
import * as rtree1 from "./rtree1";

async function benchmarks() {
  await benchmark(noindex1.param);
  await benchmark(btree1_1.param);
  await benchmark(btree1_2.param);
  await benchmark(rtree1.param);
}

benchmarks();