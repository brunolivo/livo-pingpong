"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, computeLeaderboard, formatName, type DbMatch, type PlayerStats } from "@/lib/supabase";
import { PLAYER_NAMES } from "@/lib/data";

const MEDAL = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setStats(computeLeaderboard(PLAYER_NAMES, data as DbMatch[]));
      setUpdatedAt(new Date());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-teal)] border-t-transparent animate-spin" />
      </div>
    );
  }

  const played = stats.filter((s) => s.wins + s.losses > 0);
  const notPlayed = stats.filter((s) => s.wins + s.losses === 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--slate-400)]">
          <span className="font-semibold text-[var(--brand-teal)]">{played.length}</span> players on the board
          {notPlayed.length > 0 && (
            <span className="ml-2 text-[var(--slate-400)]">· {notPlayed.length} yet to play</span>
          )}
        </p>
        {updatedAt && (
          <p className="text-xs text-[var(--slate-400)]">
            Updated {updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>

      {/* Podium — top 3 */}
      {played.length >= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
          {stats.slice(0, Math.min(3, played.length)).map((p) => (
            <div
              key={p.name}
              className="livo-card p-5 text-center relative overflow-hidden"
              style={{
                borderTop: `3px solid ${p.rank === 1 ? "#C9A84C" : p.rank === 2 ? "#A8A9AD" : "#CD7F32"}`,
              }}
            >
              <div className="text-3xl mb-1">{MEDAL[p.rank - 1]}</div>
              <div className="text-xs font-bold text-[var(--slate-400)] uppercase tracking-widest mb-1">
                #{p.rank}
              </div>
              <div className="font-bold text-[var(--slate-950)] text-sm leading-tight mb-2">
                {formatName(p.name)}
              </div>
              <div className="text-4xl font-black text-[var(--brand-teal)] mb-1">
                {p.points}
              </div>
              <div className="text-xs text-[var(--slate-400)]">
                {p.wins}W · {p.losses}L
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full table */}
      <div className="livo-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--ivory-200)] text-[var(--slate-700)] text-xs uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-semibold">Rank</th>
              <th className="text-left px-4 py-3 font-semibold">Player</th>
              <th className="text-center px-3 py-3 font-semibold">Pts</th>
              <th className="text-center px-3 py-3 font-semibold hidden sm:table-cell">W</th>
              <th className="text-center px-3 py-3 font-semibold hidden sm:table-cell">L</th>
              <th className="text-right px-4 py-3 font-semibold hidden md:table-cell">Win %</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((p, i) => {
              const hasPlayed = p.wins + p.losses > 0;
              return (
                <tr
                  key={p.name}
                  className="border-t border-[var(--border)] transition-colors hover:bg-[var(--ivory-050)]"
                >
                  <td className="px-4 py-3">
                    {p.rank <= 3 && hasPlayed ? (
                      <span className="text-lg">{MEDAL[p.rank - 1]}</span>
                    ) : (
                      <span className="text-[var(--slate-400)] font-semibold">{hasPlayed ? p.rank : "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--slate-950)]">
                    {formatName(p.name)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`font-black text-base ${
                        hasPlayed ? "text-[var(--brand-teal)]" : "text-[var(--slate-400)]"
                      }`}
                    >
                      {p.points}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-[var(--slate-700)] hidden sm:table-cell">
                    {p.wins}
                  </td>
                  <td className="px-3 py-3 text-center text-[var(--slate-400)] hidden sm:table-cell">
                    {p.losses}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {hasPlayed ? (
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-20 h-1.5 rounded-full bg-[var(--ivory-200)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[var(--brand-teal)] transition-all"
                            style={{ width: `${p.winRate * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-[var(--slate-400)] w-8 text-right">
                          {Math.round(p.winRate * 100)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[var(--slate-400)] text-right block">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
