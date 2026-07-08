import confetti from "canvas-confetti";

const COLORS = ["#FFB800", "#00CFC1", "#FFFFFF"];

export function burst(opts?: confetti.Options) {
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.6 },
    colors: COLORS,
    ...opts,
  });
}

export function bigBurst() {
  const end = Date.now() + 1400;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors: COLORS });
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors: COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 140, spread: 100, origin: { y: 0.4 }, colors: COLORS });
}
