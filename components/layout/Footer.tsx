import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/wtandler", label: "GitHub" },
  { href: "https://linkedin.com/in/wtandler", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer
      className="mt-auto py-6"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Winslow Tandler · built with AI
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:underline"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
