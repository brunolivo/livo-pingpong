"use client";

import { useState } from "react";
import { GROUPS } from "@/lib/data";
import GroupCard from "./components/GroupCard";
import Bracket from "./components/Bracket";
import Schedule from "./components/Schedule";
import OlympicRings from "./components/OlympicRings";

type Tab = "overview" | "groups" | "bracket" | "schedule";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview",  label: "Overview"  },
  { id: "groups",    label: "Groups"    },
  { id: "bracket",   label: "Bracket"   },
  { id: "schedule",  label: "Schedule"  },
];

const STATS = [
  { label: "Participants", value: "34", sub: "athletes",      icon: "🏓" },
  { label: "Groups",       value: "8",  sub: "pool stage",    icon: "🗂️" },
  { label: "Group Matches",value: "56", sub: "round robin",   icon: "⚡" },
  { label: "Total Matches",value: "71", sub: "incl. knockout",icon: "🏆" },
];

const FORMAT_STEPS = [
  { label: "Group Stage",    desc: "8 groups · Round Robin",    active: true  },
  { label: "Round of 16",   desc: "Top 2 per group advance",   active: false },
  { label: "Quarter-Finals",desc: "8 → 4 players",             active: false },
  { label: "Semi-Finals",   desc: "4 → 2 players",             active: false },
  { label: "Final",         desc: "1 champion crowned",        active: false },
];

const GROUP_ACCENT_RINGS = [
  "#007C92","#4B99E6","#FFA538","#1FC86E","#FE85C6","#007C92","#4B99E6","#FFA538"
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen" style={{ background: "var(--ivory-100)" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <header style={{ background: "var(--ivory-050)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-lg tracking-tight"
                style={{ color: "var(--brand-teal)", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
              >
                LIVO
              </span>
              <span style={{ color: "var(--slate-400)", fontSize: "14px", margin: "0 4px" }}>|</span>
              <span className="text-sm" style={{ color: "var(--slate-400)" }}>Internal Events</span>
            </div>
            <OlympicRings size={26} />
          </div>

          {/* Headline */}
          <div className="text-center max-w-2xl mx-auto">
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em] mb-4"
              style={{ color: "var(--brand-teal)" }}
            >
              Official Tournament · May 2026
            </p>
            <h1
              className="text-4xl md:text-6xl font-semibold leading-tight mb-2"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', ui-sans-serif, sans-serif",
                color: "var(--slate-950)",
              }}
            >
              Ping{" "}
              <span className="teal-shimmer">Pong</span>
            </h1>
            <h2
              className="text-xl md:text-2xl font-semibold mb-4"
              style={{ color: "var(--slate-700)", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              Tournament 2026
            </h2>
            <p className="text-sm md:text-base mb-6" style={{ color: "var(--slate-400)" }}>
              34 players · 8 groups · Group stage + knockout · Best of 3 sets to 11
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 livo-pill" style={{ background: "var(--brand-teal-subtle)", border: "1px solid var(--brand-teal-border)", color: "var(--brand-teal)" }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--brand-teal)", animation: "pulseRing 2s ease infinite" }}
              />
              <span className="text-sm font-semibold">Group Stage — Coming Soon</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50"
        style={{ background: "var(--ivory-050)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2"
                style={{
                  color: tab === t.id ? "var(--brand-teal)" : "var(--slate-400)",
                  borderColor: tab === t.id ? "var(--brand-teal)" : "transparent",
                  background: "transparent",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── CONTENT ──────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="space-y-6 animate-fade-in">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="livo-card p-5 text-center animate-fade-in"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: "var(--slate-950)", fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--brand-teal)" }}>
                    {s.label}
                  </div>
                  <div className="text-xs" style={{ color: "var(--slate-400)" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Format */}
            <div className="livo-card p-6">
              <h3 className="font-semibold text-base mb-5 flex items-center gap-2" style={{ color: "var(--slate-950)" }}>
                <span style={{ color: "var(--brand-teal)" }}>✦</span> Tournament Format
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center">
                {FORMAT_STEPS.map((step, i) => (
                  <div key={step.label} className="flex md:flex-col flex-1 items-center gap-3 md:gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200"
                      style={
                        step.active
                          ? { background: "var(--brand-teal)", color: "#fff" }
                          : { background: "var(--ivory-200)", color: "var(--slate-400)", border: "1px solid var(--border)" }
                      }
                    >
                      {step.active ? "NOW" : i + 1}
                    </div>
                    <div className="md:text-center">
                      <div
                        className="text-sm font-semibold"
                        style={{ color: step.active ? "var(--brand-teal)" : "var(--slate-950)" }}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs" style={{ color: "var(--slate-400)" }}>{step.desc}</div>
                    </div>
                    {i < FORMAT_STEPS.length - 1 && (
                      <div className="hidden md:block flex-1 h-px mx-2" style={{ background: "var(--border)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="livo-card p-6">
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "var(--brand-teal)" }}
                >
                  Scoring Rules
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: "✅", label: "Win",           value: "2 points"               },
                    { icon: "❌", label: "Loss",          value: "0 points"               },
                    { icon: "⚡", label: "Match format",  value: "Best of 3 sets"         },
                    { icon: "🎯", label: "Set length",    value: "First to 11 (win by 2)" },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between py-2"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span className="flex items-center gap-2 text-sm" style={{ color: "var(--slate-700)" }}>
                        <span>{r.icon}</span> {r.label}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: "var(--slate-950)" }}>
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="livo-card p-6">
                <h3
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "var(--brand-teal)" }}
                >
                  Tiebreakers
                </h3>
                <ol className="space-y-3">
                  {[
                    "Total points in standings",
                    "Head-to-head result between tied players",
                    "Set difference (Sets won minus Sets lost)",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--slate-700)" }}>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                        style={{ background: ["var(--brand-teal)", "#C9A84C", "#CD7F32"][i] }}
                      >
                        {i + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ol>
                <div
                  className="mt-4 pt-3 text-xs font-medium"
                  style={{ borderTop: "1px solid var(--border)", color: "var(--brand-teal)" }}
                >
                  ✦ Top 2 per group advance to Round of 16
                </div>
              </div>
            </div>

            {/* All participants */}
            <div className="livo-card p-6">
              <h3 className="font-semibold text-base mb-5 flex items-center gap-2" style={{ color: "var(--slate-950)" }}>
                <span style={{ color: "var(--brand-teal)" }}>✦</span> All 34 Participants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-0.5">
                {GROUPS.map((group, gi) =>
                  group.players.map((player) => (
                    <div
                      key={player}
                      className="flex items-center gap-2 py-1.5"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span
                        className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 text-white"
                        style={{ background: GROUP_ACCENT_RINGS[gi] }}
                      >
                        {group.letter}
                      </span>
                      <span
                        className="text-sm truncate"
                        style={{ color: "var(--slate-700)" }}
                        title={player}
                      >
                        {player}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* GROUPS */}
        {tab === "groups" && (
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "var(--slate-400)" }}>
              <span className="font-semibold" style={{ color: "var(--brand-teal)" }}>8 groups</span> · Round-robin within each group ·{" "}
              <span className="font-semibold" style={{ color: "var(--brand-teal)" }}>Top 2</span> per group advance to Round of 16
            </p>
            <div className="grid md:grid-cols-2 gap-4 animate-stagger">
              {GROUPS.map((group, i) => (
                <GroupCard key={group.letter} group={group} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* BRACKET */}
        {tab === "bracket" && (
          <div className="animate-fade-in space-y-4">
            <p className="text-sm" style={{ color: "var(--slate-400)" }}>
              <span className="font-semibold" style={{ color: "var(--brand-teal)" }}>16 players</span> qualify from group stage ·{" "}
              Single-elimination · Results will appear here as the tournament progresses
            </p>
            <div className="livo-card p-6">
              <Bracket />
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {tab === "schedule" && (
          <div className="animate-fade-in">
            <div className="livo-card p-6">
              <Schedule />
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="mt-16 py-6 text-center"
        style={{ borderTop: "1px solid var(--border)", background: "var(--ivory-050)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <OlympicRings size={20} />
        </div>
        <p className="text-xs" style={{ color: "var(--slate-400)" }}>
          Livo Ping Pong Tournament 2026 · May 2026 · 34 athletes · Let the games begin 🏓
        </p>
      </footer>
    </div>
  );
}
