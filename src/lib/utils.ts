import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function normalizeKeys<T extends Record<string, any>>(data: T[]) {
  return data.map((item) =>
    Object.fromEntries(
      Object.entries(item).map(([key, value]) => [
        key.toLowerCase().split(" ").join("_"),
        value,
      ]),
    ),
  );
}
