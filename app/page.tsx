"use client";

import { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import SubmitMatch from "./components/SubmitMatch";
import PendingMatches from "./components/PendingMatches";
import MatchHistory from "./components/MatchHistory";

type Tab = "leaderboard" | "submit" | "pending" | "history" | "rules";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "submit", label: "Submit Match", icon: "🏓" },
  { id: "pending", label: "Pending Approvals", icon: "⏳" },
  { id: "history", label: "History", icon: "📋" },
  { id: "rules", label: "How it Works", icon: "📖" },
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
              32 players · Points earned match by match · Both players confirm each result
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
        {tab === "rules" && (
          <div className="animate-fade-in max-w-2xl mx-auto space-y-5">

            {/* Prize banner */}
            <div
              className="livo-card p-6 text-center"
              style={{ borderTop: "3px solid #C9A84C" }}
            >
              <div className="text-5xl mb-3">🍾</div>
              <h2
                className="text-xl font-black mb-2"
                style={{ color: "var(--slate-950)", fontFamily: "var(--font-dm-sans)" }}
              >
                The Prize
              </h2>
              <p className="text-sm" style={{ color: "var(--slate-700)" }}>
                The player with the <span className="font-bold" style={{ color: "#C9A84C" }}>highest Elo rating</span> at the
                end of the year wins a{" "}
                <span className="font-bold" style={{ color: "var(--slate-950)" }}>
                  bottle of champagne
                </span>
                . Play hard, confirm your matches, and climb the board.
              </p>
            </div>

            {/* How to play */}
            <div className="livo-card p-6 space-y-4">
              <h3 className="text-base font-bold" style={{ color: "var(--slate-950)" }}>
                How to Play
              </h3>
              {[
                {
                  icon: "1️⃣",
                  title: "Submit a result",
                  body: "After a match, either player opens the Submit Match tab, selects both players, picks the winner, and submits.",
                },
                {
                  icon: "2️⃣",
                  title: "The other player confirms",
                  body: "The opponent opens Pending Approvals, finds the match, and clicks Confirm. If the result is wrong, they can Dispute it instead.",
                },
                {
                  icon: "3️⃣",
                  title: "Elo updates automatically",
                  body: "Once confirmed, both players' ratings update instantly. The leaderboard reflects the new standings in real time.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-sm font-bold mb-0.5" style={{ color: "var(--slate-950)" }}>
                      {title}
                    </p>
                    <p className="text-sm" style={{ color: "var(--slate-700)" }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Elo explained */}
            <div className="livo-card p-6 space-y-4">
              <h3 className="text-base font-bold" style={{ color: "var(--slate-950)" }}>
                How Elo Ratings Work
              </h3>
              <p className="text-sm" style={{ color: "var(--slate-700)" }}>
                Every player starts at <span className="font-bold" style={{ color: "var(--brand-teal)" }}>1200</span>. After each confirmed match, ratings shift based on the expected outcome — upsetting a stronger player earns more points than beating a weaker one.
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "Beat a stronger opponent",
                    desc: "You gain more Elo — the bigger the rating gap, the bigger the reward.",
                    color: "#1FC86E",
                    example: "+24 pts",
                  },
                  {
                    label: "Beat an equal opponent",
                    desc: "A balanced result. Roughly 16 points change hands.",
                    color: "var(--brand-teal)",
                    example: "≈16 pts",
                  },
                  {
                    label: "Beat a weaker opponent",
                    desc: "Expected win — you gain fewer points.",
                    color: "#FCC804",
                    example: "+8 pts",
                  },
                  {
                    label: "Lose any match",
                    desc: "You lose the same amount the winner gains. Floor is 100.",
                    color: "#EC221F",
                    example: "−8 to −24",
                  },
                ].map(({ label, desc, color, example }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 px-4 py-3 rounded-lg"
                    style={{ background: "var(--ivory-200)" }}
                  >
                    <span
                      className="text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-0.5"
                      style={{ background: "var(--ivory-050)", color }}
                    >
                      {example}
                    </span>
                    <div>
                      <p className="text-xs font-bold mb-0.5" style={{ color: "var(--slate-950)" }}>
                        {label}
                      </p>
                      <p className="text-xs" style={{ color: "var(--slate-400)" }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs" style={{ color: "var(--slate-400)" }}>
                Formula: <code className="px-1 py-0.5 rounded text-xs" style={{ background: "var(--ivory-200)" }}>Δ = K × (1 − Eₐ)</code> where K = 32 and Eₐ = expected win probability.
              </p>
            </div>

            {/* Fair play */}
            <div className="livo-card p-6 space-y-3">
              <h3 className="text-base font-bold" style={{ color: "var(--slate-950)" }}>
                Fair Play
              </h3>
              {[
                "Always submit results immediately after playing.",
                "Only confirm matches you actually played — disputing a correct result is unsportsmanlike.",
                "Both players must confirm. No confirmation = no points.",
                "If you forget to submit, both players can agree to enter it later.",
              ].map((rule) => (
                <div key={rule} className="flex gap-2 text-sm" style={{ color: "var(--slate-700)" }}>
                  <span style={{ color: "var(--brand-teal)" }}>✓</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="border-t mt-16 py-6 text-center"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--slate-400)" }}>
          Livo Ping Pong · 2026 · 32 players · Ranked by Elo
        </p>
      </footer>
    </div>
  );
}
