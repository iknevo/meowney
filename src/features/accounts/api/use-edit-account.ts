import { client } from "@/src/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export function useEditAccount(id?: string) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts[":id"].$patch({
        param: { id },
        json,
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", id] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast.success("Account Updated");
      // todo: update summary and transactions
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to update account");
    },
  });

  return { mutate, isPending };
}
