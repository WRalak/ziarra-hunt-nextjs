export function ClueCard({
  icon,
  title,
  lines,
}: {
  icon: string;
  title?: string;
  lines: string[];
}) {
  return (
    <div className="card clue-card float">
      <div className="clue-glyph">{icon}</div>
      {title && <div className="clue-title">{title}</div>}
      <div className="clue-riddle">
        {lines.map((line, i) =>
          line === "" ? (
            <br key={i} />
          ) : (
            <span className="riddle-line" key={i}>
              {line}
            </span>
          )
        )}
        <span className="q">Where am I?</span>
      </div>
    </div>
  );
}
