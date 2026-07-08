"use client";

import { useEffect, useState } from "react";

const GLYPHS = ["✦", "⌖", "✈", "◈", "⛰"];

interface Drift {
  left: number;
  dur: number;
  delay: number;
  size: number;
  glyph: string;
  teal: boolean;
}

export function Ambient() {
  const [drifts, setDrifts] = useState<Drift[]>([]);

  useEffect(() => {
    const next: Drift[] = Array.from({ length: 10 }, (_, i) => ({
      left: Math.random() * 100,
      dur: 14 + Math.random() * 14,
      delay: Math.random() * -20,
      size: 14 + Math.random() * 18,
      glyph: GLYPHS[i % GLYPHS.length],
      teal: i % 3 === 0,
    }));
    // Randomized decoration must be generated client-side only to avoid SSR/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrifts(next);
  }, []);

  return (
    <div id="ambient" aria-hidden="true">
      {drifts.map((d, i) => (
        <div
          key={i}
          className={`drift ${d.teal ? "teal" : ""}`}
          style={{
            left: `${d.left}%`,
            fontSize: `${d.size}px`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        >
          {d.glyph}
        </div>
      ))}
    </div>
  );
}
