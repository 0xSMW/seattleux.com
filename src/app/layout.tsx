import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Seattle UX",
  description: "Seattle UX community site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Seattle UX
            </Link>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
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
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
