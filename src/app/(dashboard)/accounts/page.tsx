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
import { columns, Payment } from "@/src/features/accounts/components/columns";
import { useNewAccount } from "@/src/features/accounts/state/use-new-account";
import { Plus } from "lucide-react";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "success",
    email: "a@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

export default function Page() {
  const { onOpen } = useNewAccount();
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl">
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
            filterKey="email"
            disabled={false}
            onDelete={() => {}}
            columns={columns}
            data={data}
          />
        </CardContent>
      </Card>
    </div>
  );
}
