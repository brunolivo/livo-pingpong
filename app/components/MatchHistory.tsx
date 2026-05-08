"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, formatName, type DbMatch } from "@/lib/supabase";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MatchHistory() {
  const [matches, setMatches] = useState<DbMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "approved" | "rejected">("all");

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("matches")
      .select("*")
      .in("status", ["approved", "rejected"])
      .order("resolved_at", { ascending: false });
    setMatches((data as DbMatch[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = filter === "all" ? matches : matches.filter((m) => m.status === filter);
  const approved = matches.filter((m) => m.status === "approved").length;
  const rejected = matches.filter((m) => m.status === "rejected").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--brand-teal)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary + filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-[var(--slate-400)]">
          <span className="font-semibold text-[var(--slate-950)]">{approved}</span> confirmed ·{" "}
          <span className="font-semibold text-[var(--slate-400)]">{rejected}</span> disputed
        </p>
        <div className="flex gap-1">
          {(["all", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`livo-pill px-3 py-1.5 text-xs font-semibold transition-all border ${
                filter === f
                  ? "bg-[var(--brand-teal)] text-white border-[var(--brand-teal)]"
                  : "bg-transparent text-[var(--slate-700)] border-[var(--border)] hover:border-[var(--brand-teal-border)]"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="livo-card p-8 text-center text-sm text-[var(--slate-400)]">
          No matches here yet.
        </div>
      ) : (
        <div className="livo-card overflow-hidden">
          {filtered.map((m, i) => {
            const loser =
              m.winner_name === m.player1_name ? m.player2_name : m.player1_name;
            const isApproved = m.status === "approved";
            return (
              <div
                key={m.id}
                className={`flex items-center gap-3 px-4 py-3.5 flex-wrap ${
                  i > 0 ? "border-t border-[var(--border)]" : ""
                }`}
              >
                {/* Status dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: isApproved ? "#1FC86E" : "#EC221F" }}
                />

                {/* Players */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap text-sm">
                    <span
                      className={`font-bold ${
                        m.winner_name === m.player1_name
                          ? "text-[var(--brand-teal)]"
                          : "text-[var(--slate-400)] line-through decoration-1"
                      }`}
                    >
                      {formatName(m.player1_name)}
                    </span>
                    <span className="text-[var(--slate-400)] text-xs">vs</span>
                    <span
                      className={`font-bold ${
                        m.winner_name === m.player2_name
                          ? "text-[var(--brand-teal)]"
                          : "text-[var(--slate-400)] line-through decoration-1"
                      }`}
                    >
                      {formatName(m.player2_name)}
                    </span>
                  </div>
                  {!isApproved && (
                    <p className="text-xs text-red-500 mt-0.5">Disputed</p>
                  )}
                </div>

                {/* Badge */}
                <div className="flex-shrink-0 text-right">
                  {isApproved ? (
                    <span className="text-xs font-semibold text-[var(--brand-teal)] bg-[var(--brand-teal-subtle)] px-2.5 py-1 rounded-full">
                      +1 pt → {formatName(m.winner_name).split(" ")[0]}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                      No points
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="w-full sm:w-auto text-xs text-[var(--slate-400)] sm:text-right">
                  {formatDate(m.resolved_at ?? m.created_at)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
