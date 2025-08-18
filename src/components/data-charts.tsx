"use client";
import { useGetSummary } from "../features/summary/api/use-get-summary";
import Chart from "./chart";
import SpendingPie from "./spending-pie";

export default function DataCharts() {
  const { data, isLoading } = useGetSummary();
  return isLoading ? (
    <div>loading</div>
  ) : (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
}
