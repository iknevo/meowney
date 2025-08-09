import { client } from "@/src/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;
export function useDeleteAccount(id?: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.accounts[":id"].$delete({
        param: { id },
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["account", id] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Account Deleted");
      // todo: update summary and transactions
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete account");
    },
  });

  return { mutate, isPending };
}
