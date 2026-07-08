"use client";

import { CHECKPOINTS, INTRO_CLUE } from "@/lib/checkpoints";
import { useHunt } from "@/lib/HuntContext";
import { burst } from "@/lib/confetti";
import { ProgressBar } from "@/components/ProgressBar";
import { ClueCard } from "@/components/ClueCard";
import { LandingScreen, PrizeCard } from "@/components/LandingScreen";

export default function HomePage() {
  const { progress, hydrated, update, isComplete } = useHunt();

  if (!hydrated) return null;

  if (isComplete) return <FinalScreen />;

  if (progress.started) return <ClueScreen />;

  return (
    <LandingScreen
      onStart={() => {
        update({ started: true });
        burst({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
      }}
    />
  );
}

function ClueScreen() {
  const { completedCount, progressPct } = useHunt();

  // The clue that's currently active: the intro clue if nothing is solved yet,
  // otherwise the "next destination" clue handed out at the last checkpoint reached.
  const activeClue =
    completedCount === 0
      ? { eyebrow: INTRO_CLUE.title, icon: "\uD83D\uDEA9", lines: INTRO_CLUE.lines, dest: INTRO_CLUE.destination }
      : (() => {
          const cp = CHECKPOINTS[completedCount - 1];
          return { eyebrow: cp.clueTitle, icon: cp.icon, lines: cp.clueLines, dest: cp.destination };
        })();

  return (
    <div className="screen fade-pop">
      <div className="eyebrow">{activeClue.eyebrow}</div>
      <ClueCard
        icon={activeClue.icon}
        lines={activeClue.lines}
        meta={`Find ${activeClue.dest} · then scan the QR code there`}
      />
      <div style={{ height: 24 }} />
      <ProgressBar pct={progressPct} />
      <div className="footer-tiny">Lost? Come back to this screen any time from the Booth.</div>
    </div>
  );
}

function FinalScreen() {
  const { progress, update } = useHunt();

  return (
    <div className="screen fade-pop">
      <div className="trophy-wrap">
        <span className="tr">{"\uD83C\uDFC6"}</span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <h2 style={{ fontSize: 26, marginBottom: 6 }}>You did it!</h2>
        <p style={{ color: "var(--muted)", fontSize: 14.5 }}>
          You&apos;ve completed the Ziarra Scavenger Hunt!
        </p>
      </div>

      <div className="section-title">Badges earned</div>
      <div className="final-badges">
        {CHECKPOINTS.map((c) => (
          <div className="fb-card" key={c.key}>
            <div className="fi">{c.icon}</div>
            <div className="fn">{c.badge}</div>
          </div>
        ))}
      </div>

      <PrizeCard compact />

      <div className={`verify-box ${progress.verified ? "done" : ""}`}>
        {progress.verified ? (
          <div className="verified-stamp">Verified by Ziarra team</div>
        ) : (
          <>
            <div className="vt">Show this screen to the Ziarra team to confirm your entry</div>
            <button
              className="staff-btn"
              onClick={() => {
                update({ verified: true });
                burst({ particleCount: 50, spread: 50, origin: { y: 0.5 }, colors: ["#00CFC1", "#FFFFFF"] });
              }}
            >
              Staff: Verify Completion
            </button>
          </>
        )}
      </div>
    </div>
  );
}
