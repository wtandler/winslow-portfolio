"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  onClick,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 text-sm transition-all";

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "var(--bg-primary)",
      border: "1px solid var(--accent)",
    },
    secondary: {
      background: "var(--bg-secondary)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid transparent",
    },
  };

  const style = variants[variant];

  const content = (
    <motion.span
      className={`${baseStyles} ${className}`}
      style={style}
      whileHover={{
        boxShadow: "var(--shadow-md)",
      }}
      whileTap={{
        boxShadow: "var(--shadow-sm)",
      }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link href={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} type="button">
      {content}
    </button>
  );
}
