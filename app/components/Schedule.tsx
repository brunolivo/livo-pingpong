"use client";

import { useState } from "react";
import { GROUPS, GROUP_MATCHES, ALL_MATCHES } from "@/lib/data";

const GROUP_ACCENTS: Record<string, { text: string; bg: string; ring: string }> = {
  A: { text: "#007C92", bg: "rgba(0,124,146,0.08)",   ring: "#007C92" },
  B: { text: "#4B99E6", bg: "rgba(75,153,230,0.10)",  ring: "#4B99E6" },
  C: { text: "#CC7700", bg: "rgba(255,165,56,0.10)",  ring: "#FFA538" },
  D: { text: "#17A05A", bg: "rgba(31,200,110,0.10)",  ring: "#1FC86E" },
  E: { text: "#C0357A", bg: "rgba(254,133,198,0.12)", ring: "#FE85C6" },
  F: { text: "#007C92", bg: "rgba(0,124,146,0.08)",   ring: "#007C92" },
  G: { text: "#4B99E6", bg: "rgba(75,153,230,0.10)",  ring: "#4B99E6" },
  H: { text: "#CC7700", bg: "rgba(255,165,56,0.10)",  ring: "#FFA538" },
};

export default function Schedule() {
  const [filter, setFilter] = useState<string>("ALL");
  const groups = ["ALL", ...GROUPS.map((g) => g.letter)];
  const displayed = filter === "ALL" ? ALL_MATCHES : GROUP_MATCHES[filter] ?? [];

  return (
    <div className="space-y-4">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--slate-400)" }}>
          Filter:
        </span>
        {groups.map((g) => {
          const accent = g === "ALL" ? { text: "var(--slate-700)", ring: "var(--slate-400)", bg: "transparent" } : GROUP_ACCENTS[g];
          const active = filter === g;
          return (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="livo-pill px-3 py-1.5 text-xs font-semibold"
              style={{
                background: active ? (g === "ALL" ? "var(--ivory-200)" : GROUP_ACCENTS[g]?.bg) : "transparent",
                border: `1px solid ${active ? (g === "ALL" ? "rgba(0,0,0,0.15)" : GROUP_ACCENTS[g]?.ring) : "var(--border)"}`,
                color: active ? (g === "ALL" ? "var(--slate-950)" : GROUP_ACCENTS[g]?.text) : "var(--slate-700)",
              }}
            >
              {g === "ALL" ? `All (${ALL_MATCHES.length})` : `Group ${g}`}
            </button>
          );
        })}
      </div>

      {/* Info strip */}
      <div
        className="rounded-lg px-4 py-3 flex flex-wrap gap-4 text-sm items-center"
        style={{ background: "var(--ivory-050)", border: "1px solid var(--border)" }}
      >
        <span style={{ color: "var(--slate-700)" }}>
          Showing <span className="font-bold" style={{ color: "var(--slate-950)" }}>{displayed.length}</span> matches
        </span>
        <span style={{ color: "var(--slate-700)" }}>
          Format:{" "}
          <span className="font-semibold" style={{ color: "var(--brand-teal)" }}>
            Best of 3 sets to 11
          </span>
        </span>
      </div>

      {/* List */}
      {filter === "ALL" ? (
        <div className="space-y-6">
          {GROUPS.map((group) => {
            const matches = GROUP_MATCHES[group.letter];
            const accent = GROUP_ACCENTS[group.letter];
            return (
              <div key={group.letter}>
                <div className="flex items-center gap-2 mb-2 pb-2" style={{ borderBottom: `1px solid ${accent.ring}30` }}>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: accent.ring }}
                  >
                    {group.letter}
                  </span>
                  <span className="font-semibold text-sm" style={{ color: "var(--slate-950)" }}>
                    Group {group.letter}
                  </span>
                  <span className="text-xs" style={{ color: "var(--slate-400)" }}>
                    {matches.length} matches
                  </span>
                </div>
                <div className="space-y-0.5">
                  {matches.map((match, mi) => (
                    <div
                      key={match.id}
                      className="grid grid-cols-[36px_1fr_auto_1fr] gap-3 items-center py-2 px-3 rounded-lg transition-all duration-200"
                      style={{ background: mi % 2 === 0 ? "var(--ivory-050)" : "transparent" }}
                    >
                      <span className="text-xs font-mono font-bold text-center" style={{ color: accent.text }}>
                        {match.id}
                      </span>
                      <span className="text-sm text-right truncate" style={{ color: "var(--slate-700)" }} title={match.player1}>
                        {match.player1}
                      </span>
                      <span className="text-xs font-semibold px-2" style={{ color: "var(--slate-400)" }}>vs</span>
                      <span className="text-sm truncate" style={{ color: "var(--slate-700)" }} title={match.player2}>
                        {match.player2}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-0.5">
          {displayed.map((match, mi) => {
            const accent = GROUP_ACCENTS[match.group];
            return (
              <div
                key={match.id}
                className="grid grid-cols-[36px_1fr_auto_1fr] gap-3 items-center py-2.5 px-3 rounded-lg transition-all duration-200"
                style={{ background: mi % 2 === 0 ? "var(--ivory-050)" : "transparent" }}
              >
                <span className="text-xs font-mono font-bold text-center" style={{ color: accent.text }}>
                  {match.id}
                </span>
                <span className="text-sm text-right truncate" style={{ color: "var(--slate-700)" }} title={match.player1}>
                  {match.player1}
                </span>
                <span className="text-xs font-semibold px-2" style={{ color: "var(--slate-400)" }}>vs</span>
                <span className="text-sm truncate" style={{ color: "var(--slate-700)" }} title={match.player2}>
                  {match.player2}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
