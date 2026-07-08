export function BadgeUnlock({ icon, badge }: { icon: string; badge: string }) {
  return (
    <div className="badge-unlock">
      <div className="bic">{icon}</div>
      <div>
        <div className="bt">Badge unlocked</div>
        <div className="bn">{badge}</div>
      </div>
    </div>
  );
}
