import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation, Footer } from "@/components/layout";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://winslow-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Winslow Tandler | AI-First Builder",
    template: "%s | Winslow Tandler",
  },
  description:
    "I build AI-first products by embedding in a domain and shipping the tool the people there use. Selected work and case studies.",
  keywords: ["AI", "product", "engineering", "portfolio", "AI products", "case studies"],
  authors: [{ name: "Winslow Tandler" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Winslow Tandler",
    title: "Winslow Tandler | AI-First Builder",
    description:
      "I build AI-first products by embedding in a domain and shipping the tool the people there use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winslow Tandler | AI-First Builder",
    description:
      "I build AI-first products by embedding in a domain and shipping the tool the people there use.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <MotionProvider>
          <Navigation />
          <main className="flex-1 pt-24">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
