import Dashboard from "@/src/features/dashboard/dashboard";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-50 w-full items-center justify-center">
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
