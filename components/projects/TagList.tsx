interface TagListProps {
  tags: string[];
  // Show at most this many tags, with a "+N" overflow indicator. Omit to
  // show all.
  max?: number;
  className?: string;
}

// Plain-text tag line, items separated by slashes. Used for platforms (project
// table, case-study header) and the technology list inside a case study.
export function TagList({ tags, max, className = "text-sm" }: TagListProps) {
  const visible = max ? tags.slice(0, max) : tags;
  const overflow = tags.length - visible.length;
  const items = overflow > 0 ? [...visible, `+${overflow}`] : visible;

  return (
    <p className={className} style={{ color: "var(--text-muted)" }}>
      {items.join(" / ")}
    </p>
  );
}
