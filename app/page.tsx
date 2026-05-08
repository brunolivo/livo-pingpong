"use client";

import { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import SubmitMatch from "./components/SubmitMatch";
import PendingMatches from "./components/PendingMatches";
import MatchHistory from "./components/MatchHistory";

type Tab = "leaderboard" | "submit" | "pending" | "history";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "submit", label: "Submit Match", icon: "🏓" },
  { id: "pending", label: "Pending Approvals", icon: "⏳" },
  { id: "history", label: "History", icon: "📋" },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("leaderboard");

  return (
    <div className="min-h-screen" style={{ background: "var(--ivory-100)" }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header
        className="border-b"
        style={{ background: "var(--ivory-050)", borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-10">
          {/* Brand bar */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2">
              <span
                className="font-black text-xl tracking-tight"
                style={{ color: "var(--brand-teal)" }}
              >
                LIVO
              </span>
              <span className="text-sm font-light" style={{ color: "var(--border)" }}>|</span>
              <span className="text-sm" style={{ color: "var(--slate-400)" }}>
                Internal Events
              </span>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: "var(--brand-teal-subtle)",
                color: "var(--brand-teal)",
                border: "1px solid var(--brand-teal-border)",
              }}
            >
              🏓 Live
            </span>
          </div>

          {/* Headline */}
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.3em] mb-3"
              style={{ color: "var(--slate-400)" }}
            >
              Livo · Internal Tournament
            </p>
            <h1
              className="text-4xl md:text-6xl font-black leading-none mb-2"
              style={{ color: "var(--slate-950)", fontFamily: "var(--font-dm-sans)" }}
            >
              PING{" "}
              <span className="teal-shimmer">PONG</span>
            </h1>
            <p className="text-sm md:text-base mt-3" style={{ color: "var(--slate-400)" }}>
              34 players · Points earned match by match · Both players confirm each result
            </p>
          </div>
        </div>
      </header>

      {/* ── NAV TABS ──────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          background: "rgba(251,251,249,0.92)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all"
                style={{
                  borderColor: tab === t.id ? "var(--brand-teal)" : "transparent",
                  color: tab === t.id ? "var(--brand-teal)" : "var(--slate-400)",
                }}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {tab === "leaderboard" && (
          <div className="animate-fade-in">
            <Leaderboard />
          </div>
        )}
        {tab === "submit" && (
          <div className="animate-fade-in">
            <div className="max-w-lg mx-auto mb-6 text-center">
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: "var(--slate-950)" }}
              >
                Report a Match Result
              </h2>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                Select both players and the winner. The other player will need to
                confirm before points are awarded.
              </p>
            </div>
            <SubmitMatch />
          </div>
        )}
        {tab === "pending" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: "var(--slate-950)" }}
              >
                Pending Approvals
              </h2>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                Select your name to see matches waiting for your confirmation.
              </p>
            </div>
            <PendingMatches />
          </div>
        )}
        {tab === "history" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h2
                className="text-xl font-bold mb-1"
                style={{ color: "var(--slate-950)" }}
              >
                Match History
              </h2>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                All confirmed and disputed results.
              </p>
            </div>
            <MatchHistory />
          </div>
        )}
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="border-t mt-16 py-6 text-center"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--slate-400)" }}>
          Livo Ping Pong · 2026 · 34 athletes · 1 point per confirmed win
        </p>
      </footer>
    </div>
  );
}
