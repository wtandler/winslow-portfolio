"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <Link
            href="/"
            className="text-sm"
            style={{ color: "var(--accent)" }}
          >
            ~/wtandler
          </Link>

          <div className="flex items-center gap-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-3 py-1 text-sm transition-colors"
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10"
                      style={{
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-default)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
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
