import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Sign In",
};
export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center mt-8">
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground w-10 h-10" />
        </ClerkLoading>
      </div>
      <div className="bg-primary hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" width={150} height={150} priority alt="logo" />
      </div>
    </div>
  );
}
