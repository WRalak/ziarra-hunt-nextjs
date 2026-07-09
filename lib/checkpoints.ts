export type CheckpointKey = "library" | "oval" | "msb" | "coffeebar";

export interface Checkpoint {
  key: CheckpointKey;
  path: string; // route that the QR code at this location points to
  place: string; // human name of the location
  badge: string; // stamp / badge name earned on arrival
  icon: string; // emoji glyph
  accent: "teal" | "gold";
  arrivalLine: string; // shown when the badge unlocks
  clueTitle: string; // "Clue 2: From the Auditorium to the Oval Building"
  clueLines: string[]; // the riddle, split into lines/stanzas
  destination: string; // where this clue sends them next
}

// Clue 1 — shown at the Booth before the hunt starts. Sends explorers to the Auditorium.
export const INTRO_CLUE = {
  title: "Clue 1: From the Booth to the Auditorium",
  lines: [
    "Your adventure begins where voices rise,",
    "Where ideas come alive before many eyes.",
    "But don’t stop where everyone can see,",
    "The next step is waiting quietly behind me.",
  ],
  destination: "the Auditorium",
};

export const CHECKPOINTS: Checkpoint[] = [
  {
    key: "library",
    path: "/library",
    place: "the Auditorium",
    badge: "Knowledge Explorer",
    icon: "📚",
    accent: "teal",
    arrivalLine: "You found the Auditorium — where every big idea gets its stage.",
    clueTitle: "Clue 2: From the Auditorium to the Oval Building",
    clueLines: [
      "Knowledge secured, now look all around,",
      "For a structure where no sharp corners are found.",
      "It's not a square, it's not a straight line,",
      "Look for the curves of a geometric design.",
    ],
    destination: "the Oval Building",
  },
  {
    key: "oval",
    path: "/oval",
    place: "the Oval Building",
    badge: "Campus Explorer",
    icon: "🌳",
    accent: "gold",
    arrivalLine: "You found the Oval Building — no sharp corners in sight.",
    clueTitle: "Clue 3: From the Oval Building to the Management Science Building (MSB)",
    clueLines: [
      "From the curves of the circle, we shift our view,",
      "To where data, strategy, and spreadsheets brew.",
      "Where future leaders master the craft,",
      "Weighing the metrics on a corporate graph.",
      "",
      "Find the three letters where logic aligns,",
      "Your next destination is where Science meets minds!",
    ],
    destination: "the Management Science Building (MSB)",
  },
  {
    key: "msb",
    path: "/msb",
    place: "the Management Science Building (MSB)",
    badge: "Future Leader",
    icon: "📈",
    accent: "teal",
    arrivalLine: "You found the MSB — where future leaders are made.",
    clueTitle: "Clue 4: From the MSB to the Coffee Bar",
    clueLines: [
      "Now that you've managed the science of the brain,",
      "It's time for a boost to keep you sane.",
      "Follow the scent of the grind and the steam,",
      "Race to the spot that pours the hot brews!",
    ],
    destination: "the Coffee Bar",
  },
  {
    key: "coffeebar",
    path: "/coffee-bar",
    place: "the Coffee Bar",
    badge: "Community Connector",
    icon: "☕",
    accent: "gold",
    arrivalLine: "You found the Coffee Bar — almost there.",
    clueTitle: "Clue 5: From the Coffee Bar back to Our Booth",
    clueLines: [
      "Fully caffeinated and finished with the tour,",
      "There is only one final stop left for sure.",
      "Circle right back to where it all began,",
      "And cross the finish line as fast as you can.",
      "",
      "Return to our Booth to claim your prize.",
    ],
    destination: "our Booth",
  },
];

export function idxOf(key: CheckpointKey): number {
  return CHECKPOINTS.findIndex((c) => c.key === key);
}

export function getCheckpoint(key: CheckpointKey): Checkpoint {
  const cp = CHECKPOINTS.find((c) => c.key === key);
  if (!cp) throw new Error(`Unknown checkpoint: ${key}`);
  return cp;
}
