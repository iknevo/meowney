import { AppTypes } from "@/src/app/api/[[...routes]]/route";
import { hc } from "hono/client";

// const client = hc<AppTypes>(process.env.NEXT_PUBLIC_APP_URL!);
// type Client = typeof client;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = hc<AppTypes>("");

export const hcWithType = (...args: Parameters<typeof hc>): typeof client =>
  hc<AppTypes>(...args);
// export const honoClient = () => hc<AppTypes>(process.env.NEXT_PUBLIC_APP_URL!);
