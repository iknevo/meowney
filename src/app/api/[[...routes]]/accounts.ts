import { db } from "@/src/db/dirzzle";
import { accounts, insertAccountSchema } from "@/src/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      // the latest version of hono you don't have to use this but make sure to add the status code to make it work
      // --> use http exception if destructuring {data} gives you a type error
      // throw new HTTPException(401, {
      //   res: c.json({ error: "Unauthorized" } as const, 401),
      // });
      return c.json({ error: "Unauthorized" } as const, 401);
    }
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({
      data,
    });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertAccountSchema.pick({
        name: true,
      }),
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" } as const, 401);
      }
      const [data] = await db
        .insert(accounts)
        .values({
          id: uuidv4(),
          userId: auth?.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    },
  );
export default app;
