import { env } from "~/env";
import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

declare global {
    // eslint-disable-next-line no-var -- only var works here
    var db: PostgresJsDatabase<typeof schema> | undefined;
  }

import postgres from "postgres";
let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

pg = postgres(env.POSTGRES_URL);
db = drizzle(pg, { schema});

export { db, pg };