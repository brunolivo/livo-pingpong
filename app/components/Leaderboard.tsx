"use client";

import { useEffect, useState, useCallback } from "react";
import {
  supabase,
  computeLeaderboard,
  formatName,
  ELO_INITIAL,
  type DbMatch,
  type PlayerStats,
} from "@/lib/supabase";
import { PLAYER_NAMES } from "@/lib/data";

const MEDAL = ["🥇", "🥈", "🥉"];

function EloChange({ delta }: { delta: number }) {
  if (delta === 0) return <span className="text-xs text-[var(--slate-400)]">—</span>;
  return (
    <span
      className="text-xs font-bold px-1.5 py-0.5 rounded"
      style={{
        background: delta > 0 ? "rgba(31,200,110,0.12)" : "rgba(236,34,31,0.10)",
        color: delta > 0 ? "#1FC86E" : "#EC221F",
      }}
    >
      {delta > 0 ? "+" : ""}
      {delta}
    </span>
  );
}

export default function Leaderboard() {
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("created_at", { ascending: true });

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

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--slate-400)]">
          <span className="font-semibold text-[var(--brand-teal)]">{played.length}</span> players on
          the board · ranked by Elo
        </p>
        {updatedAt && (
          <p className="text-xs text-[var(--slate-400)]">
            Updated {updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
      </div>

      {/* Elo explainer chip */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
        style={{
          background: "var(--brand-teal-subtle)",
          border: "1px solid var(--brand-teal-border)",
          color: "var(--brand-teal)",
        }}
      >
        <span>📊</span>
        <span>
          Elo rating · K=32 · Starting at {ELO_INITIAL} · Updates after each confirmed match
        </span>
      </div>

      {/* Podium — top 3 */}
      {played.length >= 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.slice(0, Math.min(3, played.length)).map((p) => {
            const medalColor =
              p.rank === 1 ? "#C9A84C" : p.rank === 2 ? "#A8A9AD" : "#CD7F32";
            return (
              <div
                key={p.name}
                className="livo-card p-5 text-center relative"
                style={{ borderTop: `3px solid ${medalColor}` }}
              >
                <div className="text-3xl mb-1">{MEDAL[p.rank - 1]}</div>
                <div className="font-bold text-[var(--slate-950)] text-sm leading-tight mb-3">
                  {formatName(p.name)}
                </div>
                {/* Elo */}
                <div
                  className="text-4xl font-black mb-1"
                  style={{ color: "var(--brand-teal)" }}
                >
                  {p.elo}
                </div>
                <div className="text-xs text-[var(--slate-400)] mb-2">Elo rating</div>
                <div className="flex items-center justify-center gap-2">
                  <EloChange delta={p.eloChange} />
                  <span className="text-xs text-[var(--slate-400)]">
                    {p.wins}W · {p.losses}L
                  </span>
                </div>
                <div className="text-xs text-[var(--slate-400)] mt-1">
                  {p.wins + p.losses} {p.wins + p.losses === 1 ? "match" : "matches"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full table */}
      <div className="livo-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-xs uppercase tracking-wider"
              style={{ background: "var(--ivory-200)", color: "var(--slate-700)" }}
            >
              <th className="text-left px-4 py-3 font-semibold">Rank</th>
              <th className="text-left px-4 py-3 font-semibold">Player</th>
              <th className="text-center px-3 py-3 font-semibold">Elo</th>
              <th className="text-center px-3 py-3 font-semibold hidden sm:table-cell">±</th>
              <th className="text-center px-3 py-3 font-semibold hidden sm:table-cell">GP</th>
              <th className="text-center px-3 py-3 font-semibold hidden sm:table-cell">W</th>
              <th className="text-center px-3 py-3 font-semibold hidden sm:table-cell">L</th>
              <th className="text-right px-4 py-3 font-semibold hidden md:table-cell">Win %</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((p) => {
              const hasPlayed = p.wins + p.losses > 0;
              const isAboveStart = p.elo > ELO_INITIAL;
              const isBelowStart = p.elo < ELO_INITIAL;
              return (
                <tr
                  key={p.name}
                  className="border-t transition-colors hover:bg-[var(--ivory-050)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td className="px-4 py-3">
                    {hasPlayed && p.rank <= 3 ? (
                      <span className="text-lg">{MEDAL[p.rank - 1]}</span>
                    ) : (
                      <span style={{ color: "var(--slate-400)", fontWeight: 600 }}>
                        {hasPlayed ? p.rank : "—"}
                      </span>
                    )}
                  </td>
                  <td
                    className="px-4 py-3 font-medium"
                    style={{ color: "var(--slate-950)" }}
                  >
                    {formatName(p.name)}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className="font-black text-base"
                      style={{
                        color: isAboveStart
                          ? "var(--brand-teal)"
                          : isBelowStart
                          ? "#EC221F"
                          : "var(--slate-400)",
                      }}
                    >
                      {p.elo}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center hidden sm:table-cell">
                    {hasPlayed && <EloChange delta={p.eloChange} />}
                  </td>
                  <td
                    className="px-3 py-3 text-center hidden sm:table-cell font-semibold"
                    style={{ color: "var(--slate-950)" }}
                  >
                    {hasPlayed ? p.wins + p.losses : "—"}
                  </td>
                  <td
                    className="px-3 py-3 text-center hidden sm:table-cell"
                    style={{ color: "var(--slate-700)" }}
                  >
                    {p.wins}
                  </td>
                  <td
                    className="px-3 py-3 text-center hidden sm:table-cell"
                    style={{ color: "var(--slate-400)" }}
                  >
                    {p.losses}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {hasPlayed ? (
                      <div className="flex items-center gap-2 justify-end">
                        <div
                          className="w-20 h-1.5 rounded-full overflow-hidden"
                          style={{ background: "var(--ivory-200)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${p.winRate * 100}%`,
                              background: "var(--brand-teal)",
                            }}
                          />
                        </div>
                        <span
                          className="text-xs w-8 text-right"
                          style={{ color: "var(--slate-400)" }}
                        >
                          {Math.round(p.winRate * 100)}%
                        </span>
                      </div>
                    ) : (
                      <span
                        className="text-xs block text-right"
                        style={{ color: "var(--slate-400)" }}
                      >
                        —
                      </span>
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
