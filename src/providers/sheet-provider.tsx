"use client";
import NewAccountSheet from "@/src/features/accounts/components/new-account-sheet";
import { useMountedState } from "react-use";

export default function SheetProvider() {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  );
}
