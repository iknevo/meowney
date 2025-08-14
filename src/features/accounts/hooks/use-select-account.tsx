import { Select } from "@/src/components/select";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { JSX, useRef, useState } from "react";
import { useCreateAccount } from "../api/use-create-account";
import { useGetAccounts } from "../api/use-get-accounts";

export default function useSelectAccount(): [
  () => JSX.Element,
  () => Promise<boolean | string>,
] {
  const { data: accounts = [], isLoading } = useGetAccounts();
  const { mutate: createAccount, isPending } = useCreateAccount();
  const onCreateAccount = (name: string) => createAccount({ name });
  const accountOptions = accounts.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<
    ((value: string | undefined) => void) | null
  >(null);
  const selectValue = useRef<string | undefined>(undefined);

  function confirm() {
    return new Promise<boolean>((resolve) => {
      setPromise(() => resolve);
    });
  }
  function handleClose() {
    setPromise(null);
  }
  function handleConfirm() {
    promise?.(selectValue.current);
    handleClose();
  }

  function handleCancel() {
    promise?.(undefined);
    handleClose();
  }
  const ConfirmationDialog = () => (
    <Dialog open={!!promise}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please Select an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={isLoading || isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant={"destructive"}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
}
