import { Separator } from "@/src/components/ui/separator";
import { formatCurrency } from "../lib/utils";

export default function CategoryTooltip({ active, payload }: any) {
  if (!active) return null;
  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted text-muted-foreground px-3 py-2 text-sm">
        {name}
      </div>
      <Separator />
      <div className="space-y-1 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <p className="text-muted-foreground text-sm">Expenses</p>
          </div>
          <p className="text-right text-sm font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
}
