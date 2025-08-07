import { AppTypes } from "@/src/app/api/[[...routes]]/route";
import { hc } from "hono/client";

// const client = hc<AppTypes>(process.env.NEXT_PUBLIC_APP_URL!);
// type Client = typeof client;

export const honoClient = () => hc<AppTypes>(process.env.NEXT_PUBLIC_APP_URL!);
