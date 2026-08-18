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
  process.env.NEXT_PUBLIC_SITE_URL || "https://winslowtandler.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Winslow Tandler | AI Systems Architect and Product Builder",
    template: "%s | Winslow Tandler",
  },
  description:
    "AI systems architect and product builder creating Microsoft-native products for enterprise change and program management teams.",
  keywords: [
    "AI systems architect",
    "AI product builder",
    "enterprise change management",
    "program management",
    "Microsoft ecosystem",
    "Power Platform",
    "case studies",
  ],
  authors: [{ name: "Winslow Tandler" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Winslow Tandler",
    title: "Winslow Tandler | AI Systems Architect and Product Builder",
    description:
      "AI systems architect and product builder creating Microsoft-native products for enterprise change and program management teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Winslow Tandler | AI Systems Architect and Product Builder",
    description:
      "AI systems architect and product builder creating Microsoft-native products for enterprise change and program management teams.",
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
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
