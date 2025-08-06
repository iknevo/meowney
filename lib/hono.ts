import { AppTypes } from "@/app/api/[[...routes]]/route";
import { hc } from "hono/client";

export const client = hc<AppTypes>(process.env.NEXT_APP_PUBLIC_URL!);
