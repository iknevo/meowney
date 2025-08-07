import { honoClient } from "@/src/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

const client = honoClient();
type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      console.log("client.api.accounts", client.api.accounts);
      const res = await client.api.accounts.$post({ json });
      const data = await res.json();
      console.log(data, "data");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to create account");
    },
  });

  return { mutate, isPending };
}
