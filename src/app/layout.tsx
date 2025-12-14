import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/nav/MobileNav";
import { getSiteUrl } from "@/lib/seo/site";
import { CommandPalette } from "@/components/command/CommandPalette";
import { CommandPaletteTrigger } from "@/components/command/CommandPaletteTrigger";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seattle UX",
    template: "%s · Seattle UX",
  },
  description:
    "A community hub for the Seattle UX ecosystem: agencies, teams, guides, playbooks, events, and groups.",
  openGraph: {
    type: "website",
    siteName: "Seattle UX",
    title: "Seattle UX",
    description:
      "A community hub for the Seattle UX ecosystem: agencies, teams, guides, playbooks, events, and groups.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seattle UX",
    description:
      "A community hub for the Seattle UX ecosystem: agencies, teams, guides, playbooks, events, and groups.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 z-[60] rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm"
          >
            Skip to content
          </a>
          <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
              <Link
                href="/"
                className="text-sm font-semibold tracking-tight text-foreground"
              >
                Seattle UX
              </Link>
              <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
                <Link href="/agencies" className="hover:text-foreground">
                  Agencies
                </Link>
                <Link href="/teams" className="hover:text-foreground">
                  Teams
                </Link>
                <Link href="/learn/guides" className="hover:text-foreground">
                  Guides
                </Link>
                <Link href="/learn/playbooks" className="hover:text-foreground">
                  Playbooks
                </Link>
                <Link href="/community/events" className="hover:text-foreground">
                  Events
                </Link>
                <Link href="/community/groups" className="hover:text-foreground">
                  Groups
                </Link>
                <Link href="/contribute" className="hover:text-foreground">
                  Contribute
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <MobileNav />
                <CommandPaletteTrigger />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <div id="content">{children}</div>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
