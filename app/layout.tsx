import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation, Footer } from "@/components/layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Winslow | AI-First Developer",
    template: "%s | Winslow",
  },
  description:
    "Building software with AI. Explore my projects and learn about my approach to AI-first development.",
  keywords: ["developer", "AI", "portfolio", "software engineer", "projects"],
  authors: [{ name: "Winslow" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Winslow",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased noise-overlay min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
