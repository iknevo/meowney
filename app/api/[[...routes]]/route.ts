import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
app.get("/hello", clerkMiddleware(), (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      error: "no user found!",
    });
  }
  return c.json({
    message: "HELLO!",
    userId: auth?.userId,
  });
});

export const GET = handle(app);
export const POST = handle(app);
