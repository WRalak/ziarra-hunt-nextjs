"use client";

import { useCallback, useEffect, useState } from "react";
import { CHECKPOINTS, CheckpointKey } from "./checkpoints";

export interface HuntProgress {
  started: boolean;
  library: boolean;
  oval: boolean;
  msb: boolean;
  coffeebar: boolean;
  verified: boolean;
}

const DEFAULT_PROGRESS: HuntProgress = {
  started: false,
  library: false,
  oval: false,
  msb: false,
  coffeebar: false,
  verified: false,
};

const STORAGE_KEY = "ziarra-hunt-progress";

function readStorage(): HuntProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function writeStorage(progress: HuntProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private mode, etc.) — progress just won't persist.
  }
}

/**
 * Progress is kept in localStorage so it survives across separate QR-code
 * scans/page loads on the same phone (each checkpoint is its own URL).
 */
export function useHuntProgress() {
  const [progress, setProgress] = useState<HuntProgress>(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage once on mount (client-only, can't be read during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(readStorage());
    setHydrated(true);

    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setProgress(readStorage());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((patch: Partial<HuntProgress>) => {
    setProgress((prev) => {
      const next = { ...prev, ...patch };
      writeStorage(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    writeStorage(DEFAULT_PROGRESS);
    setProgress(DEFAULT_PROGRESS);
  }, []);

  const completedCount = CHECKPOINTS.filter((c) => progress[c.key]).length;
  const progressPct = Math.round((completedCount / CHECKPOINTS.length) * 100);
  const isComplete = completedCount === CHECKPOINTS.length;

  const prereqMet = useCallback(
    (key: CheckpointKey) => {
      const i = CHECKPOINTS.findIndex((c) => c.key === key);
      if (i <= 0) return true;
      return !!progress[CHECKPOINTS[i - 1].key];
    },
    [progress]
  );

  const lastCompletedIndex = (() => {
    let last = -1;
    for (let i = 0; i < CHECKPOINTS.length; i++) {
      if (progress[CHECKPOINTS[i].key]) last = i;
      else break;
    }
    return last;
  })();

  return {
    progress,
    hydrated,
    update,
    reset,
    completedCount,
    progressPct,
    isComplete,
    prereqMet,
    lastCompletedIndex,
  };
}
