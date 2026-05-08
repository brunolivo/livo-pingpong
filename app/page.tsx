"use client";

import { useState } from "react";
import { GROUPS } from "@/lib/data";
import GroupCard from "./components/GroupCard";
import Bracket from "./components/Bracket";
import Schedule from "./components/Schedule";
import OlympicRings from "./components/OlympicRings";

type Tab = "overview" | "groups" | "bracket" | "schedule";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview",  icon: "medal" },
  { id: "groups",   label: "Groups",    icon: "grid"  },
  { id: "bracket",  label: "Bracket",   icon: "trophy"},
  { id: "schedule", label: "Schedule",  icon: "list"  },
];

const STAT_CARDS = [
  { label: "Participants", value: "34", icon: "🏓", sub: "athletes"     },
  { label: "Groups",       value: "8",  icon: "🗂️", sub: "pool stage"   },
  { label: "Group Matches",value: "56", icon: "⚡", sub: "round robin"  },
  { label: "Total Matches",value: "71", icon: "🏆", sub: "incl. knockout"},
];

const FORMAT_STEPS = [
  { label: "Group Stage",    desc: "8 groups · Round Robin",    active: true  },
  { label: "Round of 16",   desc: "Top 2 per group advance",   active: false },
  { label: "Quarter-Finals",desc: "8 → 4 players",             active: false },
  { label: "Semi-Finals",   desc: "4 → 2 players",             active: false },
  { label: "Final",         desc: "1 champion crowned",        active: false },
];

const RING_COLORS = ["#0085C7","#F4C300","#A8A9AD","#009F6B","#DF0024","#0085C7","#F4C300","#009F6B"];

export default function Home() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-[#0a0f1e]">

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-xl tracking-tight">LIVO</span>
              <span className="text-gray-600 text-sm font-light mx-1">|</span>
              <span className="text-gray-400 text-sm">Internal Events</span>
            </div>
            <OlympicRings size={28} />
          </div>

          <div className="text-center">
            <p className="text-amber-400/80 text-xs font-bold uppercase tracking-[0.3em] mb-3">
              ✦ Official Tournament ✦
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-2">
              PING <span className="shimmer-gold">PONG</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-white/80 mb-4">
              Tournament 2026
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
              34 players · 8 groups · Group stage + knockout · Best of 3 sets to 11
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-amber-300 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Group Stage — Coming Soon
            </div>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0f1e]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                  tab === t.id
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="space-y-8 animate-fade-in">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STAT_CARDS.map((s, i) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl p-5 text-center animate-fade-in"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Format steps */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-amber-400">✦</span> Tournament Format
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center">
                {FORMAT_STEPS.map((step, i) => (
                  <div key={step.label} className="flex md:flex-col flex-1 items-center gap-3 md:gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        step.active
                          ? "bg-amber-500 text-black"
                          : "bg-white/8 text-gray-400 border border-white/10"
                      }`}
                    >
                      {step.active ? "NOW" : (i + 1)}
                    </div>
                    <div className="md:text-center">
                      <div className={`text-sm font-bold ${step.active ? "text-amber-400" : "text-white"}`}>
                        {step.label}
                      </div>
                      <div className="text-xs text-gray-500">{step.desc}</div>
                    </div>
                    {i < FORMAT_STEPS.length - 1 && (
                      <div className="hidden md:block flex-1 h-px bg-white/10 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">Scoring Rules</h3>
                <div className="space-y-3">
                  {[
                    { icon: "✅", label: "Win",          value: "2 points"            },
                    { icon: "❌", label: "Loss",         value: "0 points"            },
                    { icon: "⚡", label: "Match format", value: "Best of 3 sets"      },
                    { icon: "🎯", label: "Set length",   value: "First to 11 (win by 2)" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <span className="flex items-center gap-2 text-sm text-gray-300">
                        <span>{r.icon}</span> {r.label}
                      </span>
                      <span className="text-sm font-bold text-white">{r.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">Tiebreakers</h3>
                <ol className="space-y-3">
                  {[
                    "Total points in standings",
                    "Head-to-head result between tied players",
                    "Set difference (Sets won minus Sets lost)",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                        style={{ background: ["#C9A84C","#A8A9AD","#CD7F32"][i], color: "#0a0f1e" }}
                      >
                        {i + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 pt-3 border-t border-white/5 text-xs text-gray-500">
                  ✦ Top 2 per group advance to Round of 16
                </div>
              </div>
            </div>

            {/* All participants */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-amber-400">✦</span> All 34 Participants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-1">
                {GROUPS.map((group, gi) =>
                  group.players.map((player) => (
                    <div
                      key={player}
                      className="flex items-center gap-2 py-1 text-sm text-gray-300 border-b border-white/5"
                    >
                      <span
                        className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0"
                        style={{
                          background: RING_COLORS[gi],
                          color: gi === 1 || gi === 6 ? "#0a0f1e" : "#fff",
                        }}
                      >
                        {group.letter}
                      </span>
                      <span className="truncate" title={player}>{player}</span>
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
            <p className="text-sm text-gray-400">
              <span className="text-amber-400 font-semibold">8 groups</span> · Round-robin within each group ·{" "}
              <span className="text-amber-400 font-semibold">Top 2</span> per group advance to Round of 16
            </p>
            <div className="grid md:grid-cols-2 gap-5 animate-stagger">
              {GROUPS.map((group, i) => (
                <GroupCard key={group.letter} group={group} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* BRACKET */}
        {tab === "bracket" && (
          <div className="animate-fade-in">
            <p className="text-sm text-gray-400 mb-6">
              <span className="text-amber-400 font-semibold">16 players</span> qualify from group stage ·{" "}
              Single-elimination knockout · Results update as the tournament progresses
            </p>
            <div className="glass rounded-2xl p-6">
              <Bracket />
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {tab === "schedule" && (
          <div className="animate-fade-in">
            <div className="glass rounded-2xl p-6">
              <Schedule />
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-12 py-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <OlympicRings size={22} />
        </div>
        <p className="text-xs text-gray-600">
          Livo Ping Pong Tournament 2026 · May 2026 · 34 athletes · Let the games begin
        </p>
      </footer>
    </div>
  );
}
