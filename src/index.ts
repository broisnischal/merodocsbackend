import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", ({ request, params, path }) => {
    return `Hello, ${request?.url}! ${path} ${params}`;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
