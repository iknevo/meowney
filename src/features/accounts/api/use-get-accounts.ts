import { appURL } from "@/src/lib/constants";
import { hcWithType } from "@/src/lib/hono";
import { useQuery } from "@tanstack/react-query";

const client = hcWithType(appURL);
export function useGetAccounts() {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await client.api.accounts.$get();
      if (!res.ok) throw new Error("Failed to fetch accounts");
      const { data } = await res.json();
      return data;
    },
  });
  return query;
}
