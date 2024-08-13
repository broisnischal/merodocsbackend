import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // dialect: "sqlite",
  dbCredentials: {
    url: String(process.env.DRIZZLE_DATABASE_URL),
    // host: String(process.env.DATABASE_HOST),
    // user: String(process.env.DATABASE_USER),
    // password: String(process.env.DATABASE_PASSWORD),
    // database: String(process.env.DATABASE_NAME),
  },
  verbose: true,
  strict: true,
} satisfies Config;
