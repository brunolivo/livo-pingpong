"use client";

import { useState } from "react";
import { Group, GROUP_MATCHES } from "@/lib/data";

interface GroupCardProps {
  group: Group;
  index: number;
}

const RING_COLORS: Record<string, string> = {
  A: "#0085C7",
  B: "#F4C300",
  C: "#A8A9AD",
  D: "#009F6B",
  E: "#DF0024",
  F: "#0085C7",
  G: "#F4C300",
  H: "#009F6B",
};

export default function GroupCard({ group, index }: GroupCardProps) {
  const [tab, setTab] = useState<"players" | "matches">("players");
  const matches = GROUP_MATCHES[group.letter];
  const ringColor = RING_COLORS[group.letter];

  return (
    <div
      className="glass rounded-2xl overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.07}s`, opacity: 0 }}
    >
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${ringColor}22, ${ringColor}11)`,
          borderBottom: `1px solid ${ringColor}33`,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg"
            style={{ background: ringColor, color: "#0a0f1e" }}
          >
            {group.letter}
          </span>
          <div>
            <h3 className="font-bold text-white text-sm">Group {group.letter}</h3>
            <p className="text-xs text-gray-400">{group.players.length} players · {matches.length} matches</p>
          </div>
        </div>
        <span className="text-2xl">🏓</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5">
        {(["players", "matches"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              tab === t
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === "players" ? (
          <div className="space-y-2">
            {/* Standings header */}
            <div className="grid grid-cols-[auto_1fr_repeat(4,auto)] gap-x-3 text-xs text-gray-500 font-semibold uppercase tracking-wider pb-1 border-b border-white/5">
              <span className="w-5 text-center">#</span>
              <span>Player</span>
              <span className="w-5 text-center">P</span>
              <span className="w-5 text-center">W</span>
              <span className="w-5 text-center">L</span>
              <span className="w-8 text-center">Pts</span>
            </div>
            {group.players.map((player, i) => (
              <div
                key={player}
                className="grid grid-cols-[auto_1fr_repeat(4,auto)] gap-x-3 items-center py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="w-5 text-center text-xs text-gray-500 font-mono">{i + 1}</span>
                <span className="text-sm text-white font-medium truncate" title={player}>
                  {player}
                </span>
                <span className="w-5 text-center text-xs text-gray-500">—</span>
                <span className="w-5 text-center text-xs text-gray-500">—</span>
                <span className="w-5 text-center text-xs text-gray-500">—</span>
                <span className="w-8 text-center text-xs font-bold text-gray-400">—</span>
              </div>
            ))}
            <p className="text-xs text-amber-500/70 text-center pt-2 flex items-center justify-center gap-1">
              <span>✦</span> Top 2 advance to Round of 16 <span>✦</span>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span
                  className="text-xs font-mono font-bold w-7 shrink-0"
                  style={{ color: ringColor }}
                >
                  {match.id}
                </span>
                <span className="text-xs text-gray-300 flex-1 truncate text-right">{match.player1}</span>
                <span className="text-xs text-gray-500 shrink-0 px-1">vs</span>
                <span className="text-xs text-gray-300 flex-1 truncate">{match.player2}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
