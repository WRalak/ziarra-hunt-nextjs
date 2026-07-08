"use client";

import Link from "next/link";
import { Ambient } from "./Ambient";
import { Passport } from "./Passport";
import { CHECKPOINTS } from "@/lib/checkpoints";
import { HuntProvider, useHunt } from "@/lib/HuntContext";

function TopBar() {
  const { progress, openPassport } = useHunt();
  return (
    <div className="topbar">
      <Link href="/" className="brand" style={{ textDecoration: "none" }}>
        <span className="dot" />
        ZIARRA
      </Link>
      <button className="stamp-pill" onClick={openPassport} aria-label="Open passport">
        <span className="mini-stamps">
          {CHECKPOINTS.map((cp) => (
            <span key={cp.key} className={`mini-dot ${progress[cp.key] ? "on" : ""}`} />
          ))}
        </span>
        <span>Passport</span>
      </button>
    </div>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const { passportOpen, closePassport } = useHunt();

  return (
    <>
      <Ambient />
      <div id="stage">
        <TopBar />
        <div id="app">{children}</div>
      </div>
      {passportOpen && <Passport onClose={closePassport} />}
    </>
  );
}

export function HuntShell({ children }: { children: React.ReactNode }) {
  return (
    <HuntProvider>
      <ShellInner>{children}</ShellInner>
    </HuntProvider>
  );
}
