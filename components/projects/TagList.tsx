interface TagListProps {
  tags: string[];
  // Show at most this many tags, with a "+N" overflow indicator. Omit to
  // show all.
  max?: number;
}

// Shared tag-chip row used for platforms (cards, case-study header) and the
// technology list inside a case study.
export function TagList({ tags, max }: TagListProps) {
  const visible = max ? tags.slice(0, max) : tags;
  const overflow = tags.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 text-xs"
          style={{
            background: "var(--bg-secondary)",
            color: "var(--text-tertiary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {tag}
        </span>
      ))}
      {overflow > 0 && (
        <span
          className="px-2 py-0.5 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
