"use client";

import { useState } from "react";
import { Group, GROUP_MATCHES } from "@/lib/data";

interface GroupCardProps {
  group: Group;
  index: number;
}

// Livo illustration accent palette mapped to groups
const GROUP_ACCENTS: Record<string, { bg: string; text: string; ring: string }> = {
  A: { bg: "rgba(0,124,146,0.08)",   text: "#007C92", ring: "#007C92" },
  B: { bg: "rgba(75,153,230,0.10)",  text: "#4B99E6", ring: "#4B99E6" },
  C: { bg: "rgba(255,165,56,0.10)",  text: "#CC7700", ring: "#FFA538" },
  D: { bg: "rgba(31,200,110,0.10)",  text: "#17A05A", ring: "#1FC86E" },
  E: { bg: "rgba(254,133,198,0.12)", text: "#C0357A", ring: "#FE85C6" },
  F: { bg: "rgba(0,124,146,0.08)",   text: "#007C92", ring: "#007C92" },
  G: { bg: "rgba(75,153,230,0.10)",  text: "#4B99E6", ring: "#4B99E6" },
  H: { bg: "rgba(255,165,56,0.10)",  text: "#CC7700", ring: "#FFA538" },
};

export default function GroupCard({ group, index }: GroupCardProps) {
  const [tab, setTab] = useState<"players" | "matches">("players");
  const matches = GROUP_MATCHES[group.letter];
  const accent = GROUP_ACCENTS[group.letter];

  return (
    <div
      className="livo-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.07}s`, opacity: 0 }}
    >
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ background: accent.bg, borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
            style={{ background: accent.ring }}
          >
            {group.letter}
          </span>
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "var(--slate-950)" }}>
              Group {group.letter}
            </h3>
            <p className="text-xs" style={{ color: "var(--slate-400)" }}>
              {group.players.length} players · {matches.length} matches
            </p>
          </div>
        </div>
        <span className="text-xl">🏓</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
        {(["players", "matches"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            style={{
              color: tab === t ? accent.text : "var(--slate-400)",
              borderBottom: tab === t ? `2px solid ${accent.ring}` : "2px solid transparent",
              background: "transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === "players" ? (
          <div className="space-y-1">
            {/* Header row */}
            <div
              className="grid grid-cols-[20px_1fr_repeat(4,28px)] gap-x-2 text-xs font-semibold uppercase tracking-wider pb-2 mb-1"
              style={{ color: "var(--slate-400)", borderBottom: "1px solid var(--border)" }}
            >
              <span className="text-center">#</span>
              <span>Player</span>
              <span className="text-center">P</span>
              <span className="text-center">W</span>
              <span className="text-center">L</span>
              <span className="text-center">Pts</span>
            </div>
            {group.players.map((player, i) => (
              <div
                key={player}
                className="grid grid-cols-[20px_1fr_repeat(4,28px)] gap-x-2 items-center py-1.5 px-2 rounded-lg"
                style={{ background: i % 2 === 0 ? "var(--ivory-050)" : "transparent" }}
              >
                <span
                  className="text-center text-xs font-mono font-semibold"
                  style={{ color: "var(--slate-400)" }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--slate-950)" }}
                  title={player}
                >
                  {player}
                </span>
                {["—", "—", "—", "—"].map((v, ci) => (
                  <span key={ci} className="text-center text-xs" style={{ color: "var(--slate-400)" }}>
                    {v}
                  </span>
                ))}
              </div>
            ))}
            <p
              className="text-xs text-center pt-3 font-medium"
              style={{ color: accent.text }}
            >
              ✦ Top 2 advance to Round of 16
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {matches.map((match, mi) => (
              <div
                key={match.id}
                className="flex items-center gap-2 py-1.5 px-2 rounded-lg"
                style={{ background: mi % 2 === 0 ? "var(--ivory-050)" : "transparent" }}
              >
                <span
                  className="text-xs font-mono font-bold w-7 shrink-0 text-center"
                  style={{ color: accent.text }}
                >
                  {match.id}
                </span>
                <span
                  className="text-xs flex-1 truncate text-right"
                  style={{ color: "var(--slate-700)" }}
                >
                  {match.player1}
                </span>
                <span className="text-xs shrink-0 px-1 font-semibold" style={{ color: "var(--slate-400)" }}>
                  vs
                </span>
                <span className="text-xs flex-1 truncate" style={{ color: "var(--slate-700)" }}>
                  {match.player2}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
