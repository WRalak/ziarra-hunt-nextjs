# Ziarra Scavenger Hunt (Next.js)

A campus scavenger hunt app. Each physical location has its own URL/QR code;
scanning it stamps a passport, unlocks a badge, and reveals the next clue.
Progress is saved in the browser's `localStorage`, so it survives across the
separate page loads that happen every time someone scans a new QR code.

## The journey

| Stop | URL | What happens |
|---|---|---|
| **Our Booth** (start) | `/start` | Students scan the Booth start QR code, land on the event page, then tap **Start Fresh Hunt** to reset stale progress and reveal **Clue 1** directing them to the Library. |
| **Library** | `/library` | Scanning stamps "Knowledge Explorer" and reveals **Clue 2** (Library to Oval Building). |
| **Oval Building** | `/oval` | Scanning stamps "Campus Explorer" and reveals **Clue 3** (Oval Building to MSB). |
| **Management Science Building (MSB)** | `/msb` | Scanning stamps "Future Leader" and reveals **Clue 4** (MSB to Coffee Bar). |
| **Coffee Bar** | `/coffee-bar` | Scanning stamps "Community Connector" and reveals **Clue 5** (Coffee Bar back to our Booth). |
| **Our Booth** (finish) | `/` | Once all 4 checkpoint stamps are collected, `/` automatically shows the trophy/prize screen with a **Staff: Verify Completion** button. Students should not scan the start QR again at finish. |

The clue text lives in `lib/checkpoints.ts`.

Checkpoints are gated: if someone scans, say, the MSB QR code without having
scanned the Library and Oval ones first, they'll see a friendly "not so fast"
screen instead of skipping ahead.

## Print your QR codes

Visit **`/qr-codes`** after deploying. It lists every stop with a printable
QR code pointing at the live URL for that page: Booth start, Library, Oval Building,
MSB, and Coffee Bar. Print those and place them at each location.

## Project structure

```text
app/
  page.tsx              Booth home - hero / active clue / finish screen
  library/page.tsx      Checkpoint page backed by CheckpointScreen
  oval/page.tsx         Checkpoint page backed by CheckpointScreen
  msb/page.tsx          Checkpoint page backed by CheckpointScreen
  coffee-bar/page.tsx   Checkpoint page backed by CheckpointScreen
  qr-codes/page.tsx     Organizer page with printable QR codes
  layout.tsx            Fonts, global shell
  globals.css           Design system (colors, cards, animations)
components/
  HuntShell.tsx         Ambient background + top bar + passport modal
  CheckpointScreen.tsx  Shared checkpoint logic (gating, arrival, next clue)
  Passport.tsx / ClueCard.tsx / ProgressBar.tsx / BadgeUnlock.tsx / deco.tsx
lib/
  checkpoints.ts        All clue text + checkpoint metadata
  useHuntProgress.ts    localStorage-backed progress hook
  HuntContext.tsx       Shares progress + passport-modal state app-wide
  confetti.ts           canvas-confetti helpers
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

This is a standard Next.js App Router project. Deploy it anywhere Next.js is
supported. After deploying, open `/qr-codes` on the live URL to get QR codes
that point at your real domain.

## Notes / things you may want to change

- **Prize copy** ("3 Free Tickets" / "Nairobi Street Food Festival") is
  carried over from the original prototype. Update it in `app/page.tsx`
  (`HeroScreen` and `FinalScreen`) if the prize changes.
- **Verification** is a simple in-browser "Staff: Verify Completion" button
  with no backend. It just flips a local flag so staff can visually confirm
  before handing out the prize. If you want a real record of who finished,
  that would need a small backend or database instead of `localStorage`.
