import Accounts from "@/src/features/accounts/components/accounts";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Accounts",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-50 w-full items-center justify-center">
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </div>
      }
    >
      <Accounts />
    </Suspense>
  );
}
