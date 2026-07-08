"use client";

import { useEffect, useRef, useState } from "react";

export function ProgressBar({ pct }: { pct: number }) {
  const [width, setWidth] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), mounted.current ? 0 : 150);
    mounted.current = true;
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>Your progress</span>
        <b>{pct}%</b>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
