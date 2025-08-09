"use client";
import { DataTable } from "@/src/components/data-table";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/src/features/accounts/api/use-bulk-delete";
import { useGetAccounts } from "@/src/features/accounts/api/use-get-accounts";
import { columns } from "@/src/features/accounts/components/columns";
import { useNewAccount } from "@/src/features/accounts/state/use-new-account";
import { Loader2, Plus } from "lucide-react";

export default function Page() {
  const { onOpen } = useNewAccount();
  const { data: accounts = [], isLoading: isLoadingAccounts } =
    useGetAccounts();

  const { mutate: deleteAccounts, isPending: isDeletingAccounts } =
    useBulkDeleteAccounts();
  const isDisabled = isLoadingAccounts || isDeletingAccounts;

  if (isLoadingAccounts)
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-xs">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-100 w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-xs">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">account page</CardTitle>
          <Button onClick={onOpen} className="self-stretch lg:self-auto">
            <Plus className="size-4" />
            <span>Add New</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccounts({ ids });
            }}
            columns={columns}
            data={accounts}
          />
        </CardContent>
      </Card>
    </div>
  );
}
