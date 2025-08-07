import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "../components/ui/sonner";
import { QueryProvider } from "./query-provider";
import SheetsProvider from "./sheet-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        {children}
        <Toaster />
        <SheetsProvider />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </ClerkProvider>
  );
}
