import Link from "next/link";
import { getAllWriting } from "@/lib/writing";
import { formatDate } from "@/lib/dates";

export const metadata = {
  title: "Writing",
  description: "Research and commentary on current events.",
};

export default function WritingPage() {
  const pieces = getAllWriting();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10">
        <h1
          className="text-2xl sm:text-3xl font-medium tracking-tight mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Writing
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Research and commentary on current events.
        </p>
      </div>

      {pieces.length > 0 ? (
        <section className="rule-strong">
          {pieces.map((piece) => {
            const { slug, frontmatter, readingTime } = piece;
            const formattedDate = formatDate(frontmatter.date);

            return (
              <Link
                key={slug}
                href={`/writing/${slug}`}
                className="group block py-6"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  {frontmatter.category && (
                    <span className="kicker">{frontmatter.category}</span>
                  )}
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {formattedDate}
                  </span>
                </div>
                <h2
                  className="text-lg font-medium mb-1 group-hover:underline"
                  style={{
                    color: "var(--text-primary)",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {piece.frontmatter.title}
                </h2>
                <p
                  className="text-sm max-w-2xl"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {frontmatter.summary}
                </p>
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {readingTime}
                </p>
              </Link>
            );
          })}
        </section>
      ) : (
        <div
          className="p-8 text-center"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <p style={{ color: "var(--text-secondary)" }}>Nothing here yet.</p>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Add MDX files to <code>content/writing/</code>
          </p>
        </div>
      )}
    </div>
  );
}
