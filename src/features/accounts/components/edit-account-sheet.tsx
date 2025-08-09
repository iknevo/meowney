import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { insertAccountSchema } from "@/src/db/schema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useGetAccount } from "../api/use-get-account";
import { useOpenAccount } from "../state/use-open-account";
import AccountForm from "./account-form";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const { data: account, isLoading } = useGetAccount(id);
  const { mutate: createAccount, isPending } = useCreateAccount();
  const defaultValues = account ? { name: account.name } : { name: "" };

  const onSubmit = (values: FormValues) => {
    createAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="text-muted-foreground size-8 animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
