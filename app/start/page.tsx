"use client";

import { useState } from "react";
import { INTRO_CLUE } from "@/lib/checkpoints";
import { useHunt } from "@/lib/HuntContext";
import { burst } from "@/lib/confetti";
import { ClueCard } from "@/components/ClueCard";
import { LandingScreen } from "@/components/LandingScreen";
import { ProgressBar } from "@/components/ProgressBar";

export default function StartPage() {
  const { hydrated, startFresh } = useHunt();
  const [started, setStarted] = useState(false);

  if (!hydrated) return null;

  if (!started) {
    return (
      <LandingScreen
        buttonText="Start Fresh Hunt"
        onStart={() => {
          startFresh();
          setStarted(true);
          burst({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
        }}
      />
    );
  }

  return (
    <div className="screen fade-pop">
      <div className="eyebrow">{INTRO_CLUE.title}</div>
      <ClueCard
        icon={"\uD83D\uDEA9"}
        lines={INTRO_CLUE.lines}
        meta={`Find ${INTRO_CLUE.destination} · then scan the QR code there`}
      />
      <div style={{ height: 24 }} />
      <ProgressBar pct={0} />
      <div className="footer-tiny">Clue 1 is active. Head to the Library and scan the QR code there.</div>
    </div>
  );
}
