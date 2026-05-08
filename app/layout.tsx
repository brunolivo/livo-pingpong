import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Livo Ping Pong Tournament 2026",
  description: "Official bracket and schedule for the Livo Office Ping Pong Tournament 2026 — 34 players, 8 groups, full knockout.",
  openGraph: {
    title: "Livo Ping Pong Tournament 2026",
    description: "34 players. 8 groups. 1 champion.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
