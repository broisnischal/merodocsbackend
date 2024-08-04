import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { db, schema } from "./db";
import { eq } from "drizzle-orm";

export function getCname<T extends Request>(req: T) {
  return req.headers.get("host")?.split(".")[0];
}

const app = new Elysia()
  .use(swagger())
  .derive(({ request }) => {
    return { cname: getCname(request) };
  })
  .get("/", async ({ cname }) => {
    const user = await db.query.usersTable.findFirst({
      where: eq(schema.usersTable.name, cname!),
    });

    if (!user) return `You do not have the access.`;

    return `Hello, ${cname}`;
  })
  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
