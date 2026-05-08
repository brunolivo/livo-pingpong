import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-dm-sans" });

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
    <html lang="en" className={`${inter.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
