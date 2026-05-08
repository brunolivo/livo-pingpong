"use client";

import { useState } from "react";
import { GROUPS, GROUP_MATCHES, ALL_MATCHES } from "@/lib/data";

const GROUP_COLORS: Record<string, string> = {
  A: "#0085C7",
  B: "#F4C300",
  C: "#A8A9AD",
  D: "#009F6B",
  E: "#DF0024",
  F: "#0085C7",
  G: "#F4C300",
  H: "#009F6B",
};

export default function Schedule() {
  const [filter, setFilter] = useState<string>("ALL");

  const groups = ["ALL", ...GROUPS.map((g) => g.letter)];
  const displayed = filter === "ALL" ? ALL_MATCHES : GROUP_MATCHES[filter] ?? [];

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Filter:</span>
        {groups.map((g) => {
          const color = g === "ALL" ? "#6b7280" : GROUP_COLORS[g];
          const active = filter === g;
          return (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: active ? `${color}33` : "rgba(255,255,255,0.04)",
                border: `1px solid ${active ? color : "rgba(255,255,255,0.08)"}`,
                color: active ? color : "#9ca3af",
              }}
            >
              {g === "ALL" ? `All (${ALL_MATCHES.length})` : `Group ${g}`}
            </button>
          );
        })}
      </div>

      {/* Stats bar */}
      <div className="glass rounded-xl px-4 py-3 flex gap-6 text-sm">
        <span className="text-gray-400">
          Showing <span className="text-white font-bold">{displayed.length}</span> matches
        </span>
        <span className="text-gray-400">
          Format: <span className="text-amber-400 font-semibold">Best of 3 sets to 11</span>
        </span>
      </div>

      {/* Match list grouped by group */}
      {filter === "ALL" ? (
        <div className="space-y-6">
          {GROUPS.map((group) => {
            const matches = GROUP_MATCHES[group.letter];
            const color = GROUP_COLORS[group.letter];
            return (
              <div key={group.letter}>
                <div
                  className="flex items-center gap-2 mb-2 pb-2 border-b"
                  style={{ borderColor: `${color}30` }}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: color, color: "#0a0f1e" }}
                  >
                    {group.letter}
                  </span>
                  <span className="font-bold text-white text-sm">Group {group.letter}</span>
                  <span className="text-xs text-gray-500">{matches.length} matches</span>
                </div>
                <div className="space-y-1">
                  {matches.map((match) => (
                    <div
                      key={match.id}
                      className="grid grid-cols-[40px_1fr_auto_1fr] gap-3 items-center py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span
                        className="text-xs font-mono font-bold text-center"
                        style={{ color }}
                      >
                        {match.id}
                      </span>
                      <span className="text-sm text-gray-200 text-right truncate" title={match.player1}>
                        {match.player1}
                      </span>
                      <span className="text-xs text-gray-500 px-2 shrink-0">vs</span>
                      <span className="text-sm text-gray-200 truncate" title={match.player2}>
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
        <div className="space-y-1">
          {displayed.map((match) => {
            const color = GROUP_COLORS[match.group];
            return (
              <div
                key={match.id}
                className="grid grid-cols-[40px_1fr_auto_1fr] gap-3 items-center py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
              >
                <span className="text-xs font-mono font-bold text-center" style={{ color }}>
                  {match.id}
                </span>
                <span className="text-sm text-gray-200 text-right truncate" title={match.player1}>
                  {match.player1}
                </span>
                <span className="text-xs text-gray-500 px-2 shrink-0">vs</span>
                <span className="text-sm text-gray-200 truncate" title={match.player2}>
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
