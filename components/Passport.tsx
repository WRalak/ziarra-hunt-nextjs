"use client";

import { CHECKPOINTS } from "@/lib/checkpoints";
import { useHunt } from "@/lib/HuntContext";

export function Passport({ onClose }: { onClose: () => void }) {
  const { progress, completedCount } = useHunt();

  return (
    <div
      className="modal-scrim"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="passport-book">
        <div className="grabber" />
        <div className="passport-head">
          <div>
            <h2>Ziarra Passport</h2>
            <div className="sub">{completedCount} of {CHECKPOINTS.length} stamps collected</div>
          </div>
          <button className="close-x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="passport-id">
          <span>EXPLORER · CAMPUS HUNT</span>
          <span>№ ZR-{1000 + completedCount * 111}</span>
        </div>
        <div className="stamp-grid">
          {CHECKPOINTS.map((cp) => {
            const filled = progress[cp.key];
            return (
              <div className={`stamp-tile ${filled ? "filled" : ""}`} key={cp.key}>
                {filled ? (
                  <div className="stamp-ink">
                    <div className="si">{cp.icon}</div>
                    <div className="st">{cp.badge}</div>
                  </div>
                ) : (
                  <>
                    <div className="locked-ic">{cp.icon}</div>
                    <div className="locked-label">{cp.badge}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="passport-footer">
          <p className="pf-note">
            {completedCount === CHECKPOINTS.length
              ? "Fully stamped — welcome to the club."
              : "Keep exploring to fill every page."}
          </p>
        </div>
      </div>
    </div>
  );
}
