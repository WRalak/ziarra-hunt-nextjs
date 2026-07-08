"use client";

import Image from "next/image";
import { CompassSVG, DottedPathSVG, PinSVG } from "@/components/deco";
import { ProgressBar } from "@/components/ProgressBar";

function FestivalPoster() {
  return (
    <div className="fest-poster">
      <Image
        src="/nairobi-street-food-festival-poster.jpeg"
        alt="Nairobi Street Food Festival Playtime Edition poster"
        width={1179}
        height={1179}
        sizes="(max-width: 480px) calc(100vw - 72px), 392px"
      />
    </div>
  );
}

export function PrizeCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="prize-card" style={compact ? { textAlign: "center" } : undefined}>
      {compact ? <div style={{ fontSize: 36, marginBottom: 6 }}>{"\uD83C\uDFC6"}</div> : <span className="tag">WIN</span>}
      {compact ? (
        <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 6 }}>You&apos;re officially entered to win</p>
      ) : null}
      <h2 style={compact ? { fontSize: 19 } : undefined}>{compact ? "1 of 3 Free Tickets" : "3 Free Tickets"}</h2>
      <div className="fest-name">Nairobi Street Food Festival</div>
      <FestivalPoster />
    </div>
  );
}

export function LandingScreen({
  onStart,
  buttonText = "Start the Hunt",
}: {
  onStart: () => void;
  buttonText?: string;
}) {
  return (
    <div className="screen">
      <div className="hero-visual">
        <CompassSVG />
        <div style={{ position: "absolute", left: 22, bottom: 20 }}>
          <PinSVG />
        </div>
        <DottedPathSVG color="#00CFC1" />
        <div style={{ position: "absolute", right: 26, top: 26, fontSize: 22 }}>GO</div>
      </div>

      <h1 className="h1-title">
        Ziarra <span className="accent">Scavenger Hunt</span>
      </h1>
      <p className="subtitle">
        Explore campus. <b>Solve clues.</b> Win free festival tickets.
      </p>

      <PrizeCard />

      <div className="howitworks">
        <div className="section-title">How it works</div>
        <div className="hiw-grid">
          <div className="hiw-card">
            <span className="ic">1</span>
            <div className="t">Start here</div>
            <div className="d">Tap start only once at the Ziarra booth.</div>
          </div>
          <div className="hiw-card">
            <span className="ic">2</span>
            <div className="t">Read the clue</div>
            <div className="d">Your first clue sends you to the Library.</div>
          </div>
          <div className="hiw-card">
            <span className="ic">3</span>
            <div className="t">Scan at stops</div>
            <div className="d">Each correct QR unlocks a stamp and next clue.</div>
          </div>
          <div className="hiw-card">
            <span className="ic">4</span>
            <div className="t">Verify to win</div>
            <div className="d">Return to our booth and show the finish screen.</div>
          </div>
        </div>
      </div>

      <ProgressBar pct={0} />

      <button className="btn-primary" onClick={onStart}>
        {buttonText} →
      </button>

      <div className="footer-tiny">Ziarra · Explore the World, Together</div>
    </div>
  );
}
