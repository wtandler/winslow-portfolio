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

const siteTitle = "Winslow Tandler | AI Systems Architect and Product Builder";
const siteDescription =
  "AI systems architect and product builder creating Microsoft-native products for enterprise change and program management teams.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Winslow Tandler",
  },
  description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables go on <html>, not <body>: --font-sans is declared
    // on :root and references --font-geist-sans, which must already exist
    // there or the whole site falls back to the system font.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
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
