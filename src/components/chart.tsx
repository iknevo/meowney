import { AreaChart, BarChart3, FileSearch, LineChart } from "lucide-react";
import { useState } from "react";
import AreaVariant from "./area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  data?: { date: string; income: number; expenses: number }[];
};
export default function Chart({ data = [] }: Props) {
  const [chartType, setChartType] = useState("area");
  const onTypeChange = (type: string) => {
    setChartType(type);
    // todo: add paywall
  };
  return (
    <Card className="border-none drop-shadow-xs">
      <CardHeader className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center lg:gap-0">
        <CardTitle className="line-clamp-1 text-xl">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="h-9 w-full rounded-md px-3 lg:w-auto">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center gap-2">
                <AreaChart className="size-4 shrink-0" />
                <p className="line-clamp-1">Area Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center gap-2">
                <LineChart className="size-4 shrink-0" />
                <p className="line-clamp-1">Line Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 shrink-0" />
                <p className="line-clamp-1">Bar Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-4">
            <FileSearch className="text-muted-foreground size-6" />
            <p className="text-muted-foreground text-sm">
              No data for this period.
            </p>
          </div>
        ) : (
          <>
            {chartType === "line" && <LineVariant data={data} />}
            {chartType === "bar" && <BarVariant data={data} />}
            {chartType === "area" && <AreaVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
}
