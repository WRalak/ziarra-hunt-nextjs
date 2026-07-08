export function CompassSVG() {
  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      style={{ position: "absolute", right: -20, top: -20, opacity: 0.5 }}
    >
      <circle cx="70" cy="70" r="58" fill="none" stroke="#FFB800" strokeWidth="1" strokeDasharray="3 6" />
      <circle cx="70" cy="70" r="38" fill="none" stroke="#00CFC1" strokeWidth="1" />
      <path d="M70 20 L78 70 L70 120 L62 70 Z" fill="#FFB800" opacity="0.6" />
    </svg>
  );
}

export function PinSVG() {
  return (
    <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
      <path
        d="M17 0C7.6 0 0 7.6 0 17c0 12 17 25 17 25s17-13 17-25C34 7.6 26.4 0 17 0z"
        fill="#FFB800"
      />
      <circle cx="17" cy="17" r="6.5" fill="#111111" />
    </svg>
  );
}

export function DottedPathSVG({ color }: { color: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 170"
      style={{ position: "absolute", inset: 0 }}
      preserveAspectRatio="none"
    >
      <path
        d="M10 150 Q 80 100 130 120 T 260 40"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="1 10"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function FootprintsSVG() {
  return (
    <svg
      width="60"
      height="30"
      viewBox="0 0 60 30"
      style={{ position: "absolute", left: 14, bottom: 14, opacity: 0.4 }}
    >
      <ellipse cx="8" cy="18" rx="5" ry="8" fill="#00CFC1" />
      <ellipse cx="24" cy="8" rx="5" ry="8" fill="#FFB800" />
      <ellipse cx="40" cy="18" rx="5" ry="8" fill="#00CFC1" />
    </svg>
  );
}
