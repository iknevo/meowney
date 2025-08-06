"use client";
import { Button } from "@/src/components/ui/button";
import { useNewAccount } from "@/src/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>open sheet</Button>
    </div>
  );
}
