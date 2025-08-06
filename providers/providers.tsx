import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryProvider } from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
}
