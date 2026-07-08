"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckpointKey, getCheckpoint } from "@/lib/checkpoints";
import { useHunt } from "@/lib/HuntContext";
import { bigBurst } from "@/lib/confetti";
import { DottedPathSVG, FootprintsSVG } from "./deco";
import { BadgeUnlock } from "./BadgeUnlock";
import { ProgressBar } from "./ProgressBar";
import { ClueCard } from "./ClueCard";

function NotYet({ cpKey }: { cpKey: CheckpointKey }) {
  const cp = getCheckpoint(cpKey);
  return (
    <div className="screen fade-pop">
      <div className="notyet-icon">🧭</div>
      <div className="card" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 20, marginBottom: 10 }}>Not so fast, explorer</h2>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55, marginBottom: 22 }}>
          {cp.place} unlocks once you&apos;ve solved the earlier clues first. Head back to the
          Booth and pick up where you left off.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
          Take me back →
        </Link>
      </div>
    </div>
  );
}

export function CheckpointScreen({ cpKey }: { cpKey: CheckpointKey }) {
  const cp = getCheckpoint(cpKey);
  const { progress, hydrated, update, prereqMet, progressPct, openPassport } = useHunt();
  const [celebrating, setCelebrating] = useState(false);
  const handledRef = useRef(false);

  useEffect(() => {
    if (!hydrated || handledRef.current) return;
    handledRef.current = true;
    if (!prereqMet(cpKey)) return;
    if (!progress[cpKey]) {
      // First arrival at this checkpoint: mark it complete and play a one-off celebration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCelebrating(true);
      bigBurst();
      update({ [cpKey]: true });
      const t = setTimeout(() => setCelebrating(false), 1250);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (!hydrated) return null;

  if (!prereqMet(cpKey)) return <NotYet cpKey={cpKey} />;

  const accentColor = cp.accent === "teal" ? "#00CFC1" : "#FFB800";
  const bg = cp.accent === "teal" ? "#122522" : "#241f14";

  return (
    <div className="screen">
      <div className="location-visual" style={{ background: `linear-gradient(160deg, ${bg}, #131315)` }}>
        <DottedPathSVG color={accentColor} />
        <FootprintsSVG />
        <div style={{ position: "absolute", right: 20, top: 18, fontSize: 34 }}>{cp.icon}</div>
      </div>

      {celebrating && (
        <div className="celebrate-flash">
          <div className="celebrate-card">
            <div className="big">🎉</div>
            <h3>Checkpoint Complete!</h3>
            <p>{cp.place}</p>
          </div>
        </div>
      )}

      <div className="eyebrow">QR scanned · {cp.place}</div>

      <BadgeUnlock icon={cp.icon} badge={cp.badge} />

      <ProgressBar pct={progressPct} />

      <div className="eyebrow">{cp.clueTitle}</div>
      <ClueCard
        icon={cpKey === "coffeebar" ? "🏁" : "🧭"}
        lines={cp.clueLines}
        meta={
          cpKey === "coffeebar"
            ? "Return to our Booth - do not scan the start QR again"
            : "Walk there · then scan the next QR code"
        }
      />

      <div style={{ height: 16 }} />
      {cpKey === "coffeebar" ? (
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
          Head back to the Booth →
        </Link>
      ) : (
        <button className="btn-secondary" onClick={openPassport}>
          View my passport
        </button>
      )}
    </div>
  );
}
