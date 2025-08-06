import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryProvider } from "./query-provider";
import SheetProvider from "./sheet-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        {children}
        <SheetProvider />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </ClerkProvider>
  );
}
