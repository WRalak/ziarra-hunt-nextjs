"use client";

import { useEffect, useRef } from "react";
import { INTRO_CLUE } from "@/lib/checkpoints";
import { useHunt } from "@/lib/HuntContext";
import { burst } from "@/lib/confetti";
import { ClueCard } from "@/components/ClueCard";
import { ProgressBar } from "@/components/ProgressBar";

export default function StartPage() {
  const { hydrated, startFresh } = useHunt();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!hydrated || startedRef.current) return;
    startedRef.current = true;
    startFresh();
    burst({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
  }, [hydrated, startFresh]);

  if (!hydrated) return null;

  return (
    <div className="screen fade-pop">
      <div className="eyebrow">{INTRO_CLUE.title}</div>
      <ClueCard
        icon="🚩"
        lines={INTRO_CLUE.lines}
        meta={`Find ${INTRO_CLUE.destination} · then scan the QR code there`}
      />
      <div style={{ height: 24 }} />
      <ProgressBar pct={0} />
      <div className="footer-tiny">This start QR resets this phone for a new event run.</div>
    </div>
  );
}
