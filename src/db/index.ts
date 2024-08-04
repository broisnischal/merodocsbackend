// import { Pool } from "pg";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("Database credentials missing.");
}

export const sql = neon(process.env.DRIZZLE_DATABASE_URL!);

const db = drizzle(sql, {
  schema,
  // logger: console.log,
});

export { schema, db };
