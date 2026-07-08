"use client";

import { createContext, useContext, useState } from "react";
import { useHuntProgress } from "./useHuntProgress";

type HuntContextValue = ReturnType<typeof useHuntProgress> & {
  passportOpen: boolean;
  openPassport: () => void;
  closePassport: () => void;
};

const HuntContext = createContext<HuntContextValue | null>(null);

export function HuntProvider({ children }: { children: React.ReactNode }) {
  const progress = useHuntProgress();
  const [passportOpen, setPassportOpen] = useState(false);

  const value: HuntContextValue = {
    ...progress,
    passportOpen,
    openPassport: () => setPassportOpen(true),
    closePassport: () => setPassportOpen(false),
  };

  return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>;
}

export function useHunt() {
  const ctx = useContext(HuntContext);
  if (!ctx) throw new Error("useHunt must be used within a HuntProvider");
  return ctx;
}
