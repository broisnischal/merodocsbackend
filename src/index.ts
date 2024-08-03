import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", ({ request, params, path }) => {
    return `Hello, ${request?.url}! ${path} ${params}`;
  })
  .listen(process.env.PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
