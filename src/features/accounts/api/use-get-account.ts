import { appURL } from "@/src/lib/constants";
import { hcWithType } from "@/src/lib/hono";
import { useQuery } from "@tanstack/react-query";

const client = hcWithType(appURL);

export function useGetAccount(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", id],
    queryFn: async () => {
      const res = await client.api.accounts[":id"].$get({
        param: { id },
      });
      if (!res.ok) throw new Error("Failed to fetch account");
      const { data } = await res.json();
      return data;
    },
  });
  return query;
}
