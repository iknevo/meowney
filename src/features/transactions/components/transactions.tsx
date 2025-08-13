"use client";
import { DataTable } from "@/src/components/data-table";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Loader2, Plus } from "lucide-react";
import { useBulkDeleteTransactions } from "../api/use-bulk-delete-transactions";
import { useGetTransactions } from "../api/use-get-transactions";
import { useNewTransaction } from "../state/use-new-transaction";
import { transactionsColumns } from "./transactions-columns";

export default function Transactions() {
  const { onOpen } = useNewTransaction();
  const { data: transactions = [], isLoading: isLoadingTransactions } =
    useGetTransactions();

  const { mutate: deleteTransactions, isPending: isDeletingTransactions } =
    useBulkDeleteTransactions();
  const isDisabled = isLoadingTransactions || isDeletingTransactions;

  if (isLoadingTransactions)
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-xs">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex h-50 w-full items-center justify-center">
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-xs">
        <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Transactions History
          </CardTitle>
          <Button onClick={onOpen} className="self-stretch lg:self-auto">
            <Plus className="size-4" />
            <span>Add New</span>
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="payee"
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions({ ids });
            }}
            confirmOptions={{
              title: "Are you sure?",
              message: "You are about to delete this transaction(s).",
            }}
            columns={transactionsColumns}
            data={transactions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
