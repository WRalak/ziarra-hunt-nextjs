"use client";

import { CHECKPOINTS, INTRO_CLUE } from "@/lib/checkpoints";
import { useHunt } from "@/lib/HuntContext";
import { burst } from "@/lib/confetti";
import { CompassSVG, PinSVG, DottedPathSVG } from "@/components/deco";
import { ProgressBar } from "@/components/ProgressBar";
import { ClueCard } from "@/components/ClueCard";

export default function HomePage() {
  const { progress, hydrated, update, isComplete } = useHunt();

  if (!hydrated) return null;

  if (isComplete) return <FinalScreen />;

  if (progress.started) return <ClueScreen />;

  return (
    <HeroScreen
      onStart={() => {
        update({ started: true });
        burst({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
      }}
    />
  );
}

function HeroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="screen">
      <div className="hero-visual">
        <CompassSVG />
        <div style={{ position: "absolute", left: 22, bottom: 20 }}>
          <PinSVG />
        </div>
        <DottedPathSVG color="#00CFC1" />
        <div style={{ position: "absolute", right: 26, top: 26, fontSize: 22 }}>✈</div>
      </div>

      <h1 className="h1-title">
        🔍 Ziarra <span className="accent">Scavenger Hunt</span>
      </h1>
      <p className="subtitle">
        Explore campus. <b>Solve clues.</b> Win big.
      </p>

      <div className="prize-card">
        <span className="tag">🎟️ WIN</span>
        <h2>3 Free Tickets</h2>
        <div className="fest-name">Nairobi Street Food Festival</div>
        <div className="fest-poster">
          <div className="fp-txt">
            <span className="k">Street Food Fest · Nairobi</span>
            <span className="b">Taste the City</span>
          </div>
          <div style={{ fontSize: 30 }}>🥘</div>
        </div>
      </div>

      <div className="howitworks">
        <div className="section-title">How it works</div>
        <div className="hiw-grid">
          <div className="hiw-card">
            <span className="ic">📍</span>
            <div className="t">Find locations</div>
            <div className="d">Head to each campus checkpoint.</div>
          </div>
          <div className="hiw-card">
            <span className="ic">🧩</span>
            <div className="t">Solve clues</div>
            <div className="d">Riddles point the way.</div>
          </div>
          <div className="hiw-card">
            <span className="ic">📲</span>
            <div className="t">Scan QR codes</div>
            <div className="d">Unlock your passport stamp.</div>
          </div>
          <div className="hiw-card">
            <span className="ic">🏆</span>
            <div className="t">Finish to enter</div>
            <div className="d">Complete all four to win.</div>
          </div>
        </div>
      </div>

      <ProgressBar pct={0} />

      <button className="btn-primary" onClick={onStart}>
        Start the Hunt →
      </button>

      <div className="footer-tiny">Ziarra · Explore the World, Together</div>
    </div>
  );
}

function ClueScreen() {
  const { completedCount, progressPct } = useHunt();

  // The clue that's currently active: the intro clue if nothing is solved yet,
  // otherwise the "next destination" clue handed out at the last checkpoint reached.
  const activeClue =
    completedCount === 0
      ? { eyebrow: INTRO_CLUE.title, icon: "🚩", lines: INTRO_CLUE.lines, dest: INTRO_CLUE.destination }
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
        <span className="tr">🏆</span>
      </div>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <h2 style={{ fontSize: 26, marginBottom: 6 }}>🎉 You did it!</h2>
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

      <div className="prize-card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 6 }}>🏆</div>
        <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 6 }}>
          You&apos;re officially entered to win
        </p>
        <h2 style={{ fontSize: 19 }}>1 of 3 Free Tickets</h2>
        <div className="fest-name">Nairobi Street Food Festival</div>
      </div>

      <div className={`verify-box ${progress.verified ? "done" : ""}`}>
        {progress.verified ? (
          <div className="verified-stamp">✅ Verified by Ziarra team</div>
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
