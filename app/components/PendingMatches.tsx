"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, formatName, type DbMatch } from "@/lib/supabase";
import { PLAYER_NAMES } from "@/lib/data";

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function PendingMatches() {
  const [myName, setMyName] = useState("");
  const [allPending, setAllPending] = useState<DbMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [acting, setActing] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("matches")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    setAllPending((data as DbMatch[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 15000);
    return () => clearInterval(interval);
  }, [load]);

  async function resolve(id: string, status: "approved" | "rejected") {
    setActing(id);
    await supabase
      .from("matches")
      .update({ status, resolved_at: new Date().toISOString() })
      .eq("id", id);
    await load();
    setActing(null);
  }

  // Matches I need to approve: I'm a player, I didn't submit
  const needMyApproval = myName
    ? allPending.filter(
        (m) =>
          (m.player1_name === myName || m.player2_name === myName) &&
          m.submitted_by !== myName
      )
    : [];

  // Matches I submitted, waiting for the other player
  const waitingForOther = myName
    ? allPending.filter((m) => m.submitted_by === myName)
    : [];

  return (
    <div className="space-y-6">
      {/* Name picker */}
      <div className="livo-card p-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--slate-700)] mb-1.5">
          Select your name to see your pending matches
        </label>
        <select
          value={myName}
          onChange={(e) => setMyName(e.target.value)}
          className="w-full sm:w-80 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--ivory-050)] text-[var(--slate-950)] text-sm focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
        >
          <option value="">I am…</option>
          {PLAYER_NAMES.map((n) => (
            <option key={n} value={n}>
              {formatName(n)}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-[var(--slate-400)]">
          <div className="w-4 h-4 rounded-full border-2 border-[var(--brand-teal)] border-t-transparent animate-spin" />
          Loading…
        </div>
      )}

      {/* Needs my approval */}
      {myName && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--slate-700)] flex items-center gap-2">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white"
              style={{ background: needMyApproval.length > 0 ? "#007C92" : "#A8A9AD" }}
            >
              {needMyApproval.length}
            </span>
            Waiting for your approval
          </h3>

          {needMyApproval.length === 0 ? (
            <div className="livo-card p-6 text-center text-sm text-[var(--slate-400)]">
              No matches waiting for your approval.
            </div>
          ) : (
            needMyApproval.map((m) => {
              const winnerLabel = formatName(m.winner_name);
              const loserName =
                m.winner_name === m.player1_name ? m.player2_name : m.player1_name;
              return (
                <div key={m.id} className="livo-card p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[var(--slate-950)]">
                          {formatName(m.player1_name)}
                        </span>
                        <span className="text-[var(--slate-400)] text-xs">vs</span>
                        <span className="font-bold text-[var(--slate-950)]">
                          {formatName(m.player2_name)}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--slate-700)]">
                        Result claimed:{" "}
                        <span className="font-semibold text-[var(--brand-teal)]">
                          {winnerLabel}
                        </span>{" "}
                        beat{" "}
                        <span className="font-semibold">{formatName(loserName)}</span>
                      </p>
                      <p className="text-xs text-[var(--slate-400)]">
                        Submitted by {formatName(m.submitted_by)} · {timeAgo(m.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => resolve(m.id, "rejected")}
                        disabled={acting === m.id}
                        className="livo-pill-btn px-4 py-2 text-sm font-semibold border-2 border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-40"
                      >
                        Dispute
                      </button>
                      <button
                        onClick={() => resolve(m.id, "approved")}
                        disabled={acting === m.id}
                        className="livo-pill-btn px-4 py-2 bg-[var(--brand-teal)] text-white text-sm font-semibold hover:bg-[var(--brand-teal-hover)] disabled:opacity-40"
                      >
                        {acting === m.id ? "…" : "Confirm ✓"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      )}

      {/* Submitted by me, waiting */}
      {myName && waitingForOther.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--slate-700)]">
            Matches you submitted — awaiting the other player
          </h3>
          {waitingForOther.map((m) => (
            <div key={m.id} className="livo-card p-4 opacity-70">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <span className="font-semibold text-[var(--slate-950)]">
                  {formatName(m.player1_name)}
                </span>
                <span className="text-[var(--slate-400)] text-xs">vs</span>
                <span className="font-semibold text-[var(--slate-950)]">
                  {formatName(m.player2_name)}
                </span>
                <span className="text-[var(--slate-400)]">·</span>
                <span className="text-[var(--brand-teal)] font-semibold">
                  {formatName(m.winner_name)} won
                </span>
                <span className="text-[var(--slate-400)] text-xs ml-auto">
                  {timeAgo(m.created_at)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Show all pending if no name selected */}
      {!myName && allPending.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--slate-700)]">
            All pending matches ({allPending.length})
          </h3>
          {allPending.map((m) => (
            <div key={m.id} className="livo-card p-4">
              <div className="flex items-center gap-2 flex-wrap text-sm text-[var(--slate-700)]">
                <span className="font-semibold text-[var(--slate-950)]">
                  {formatName(m.player1_name)}
                </span>
                <span className="text-xs text-[var(--slate-400)]">vs</span>
                <span className="font-semibold text-[var(--slate-950)]">
                  {formatName(m.player2_name)}
                </span>
                <span className="text-[var(--slate-400)]">·</span>
                <span className="text-[var(--brand-teal)] font-semibold">
                  {formatName(m.winner_name)} won
                </span>
                <span className="text-xs text-[var(--slate-400)] ml-auto">
                  {timeAgo(m.created_at)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {!myName && allPending.length === 0 && !loading && (
        <div className="livo-card p-8 text-center text-sm text-[var(--slate-400)]">
          No pending matches. Play a game and submit the result!
        </div>
      )}
    </div>
  );
}
