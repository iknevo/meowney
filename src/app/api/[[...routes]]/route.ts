import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";

export const dynamic = "force-dynamic";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/accounts", accounts);

const handler = handle(app);
export const GET = handler;
export const POST = handler;
export const PATCH = handler;

export default app;
export type AppTypes = typeof routes;
