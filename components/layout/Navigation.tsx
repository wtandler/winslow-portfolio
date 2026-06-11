"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-sm font-semibold uppercase transition-opacity hover:opacity-70"
            style={{ color: "var(--text-primary)", letterSpacing: "0.14em" }}
          >
            Winslow Tandler
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    isActive ? "underline" : "hover:underline"
                  }`}
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-tertiary)",
                    textUnderlineOffset: "6px",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
