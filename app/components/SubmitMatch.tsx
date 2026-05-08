"use client";

import { useState } from "react";
import { supabase, formatName } from "@/lib/supabase";
import { PLAYER_NAMES } from "@/lib/data";

export default function SubmitMatch() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [winner, setWinner] = useState<"player1" | "player2" | "">("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const p1Options = PLAYER_NAMES;
  const p2Options = PLAYER_NAMES.filter((n) => n !== player1);
  const submitterOptions = [player1, player2].filter(Boolean);

  const winnerName = winner === "player1" ? player1 : winner === "player2" ? player2 : "";
  const canSubmit = player1 && player2 && winner && submittedBy;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    const { error: err } = await supabase.from("matches").insert({
      player1_name: player1,
      player2_name: player2,
      winner_name: winnerName,
      submitted_by: submittedBy,
      status: "pending",
    });

    setLoading(false);
    if (err) {
      console.error("Supabase insert error:", err);
      setError(`Error ${err.code}: ${err.message}${err.details ? " — " + err.details : ""}`);
    } else {
      setSuccess(true);
      setPlayer1("");
      setPlayer2("");
      setWinner("");
      setSubmittedBy("");
    }
  }

  if (success) {
    return (
      <div className="livo-card p-8 text-center max-w-md mx-auto">
        <div className="text-4xl mb-4">🏓</div>
        <h3 className="text-xl font-bold text-[var(--slate-950)] mb-2">Match Submitted!</h3>
        <p className="text-[var(--slate-700)] text-sm mb-6">
          The result is <span className="font-semibold text-[var(--brand-teal)]">pending approval</span> from the other player.
          Ask them to open the <strong>Pending Approvals</strong> tab to confirm.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="livo-pill-btn px-6 py-2.5 bg-[var(--brand-teal)] text-white text-sm font-semibold hover:bg-[var(--brand-teal-hover)]"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div className="livo-card p-6 space-y-5">
        <h3 className="text-base font-bold text-[var(--slate-950)]">Match Details</h3>

        {/* Player 1 */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--slate-700)] mb-1.5">
            Player 1
          </label>
          <select
            value={player1}
            onChange={(e) => { setPlayer1(e.target.value); setWinner(""); setSubmittedBy(""); }}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--ivory-050)] text-[var(--slate-950)] text-sm focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
          >
            <option value="">Select player…</option>
            {p1Options.map((n) => (
              <option key={n} value={n}>{formatName(n)}</option>
            ))}
          </select>
        </div>

        {/* Player 2 */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--slate-700)] mb-1.5">
            Player 2
          </label>
          <select
            value={player2}
            onChange={(e) => { setPlayer2(e.target.value); setWinner(""); setSubmittedBy(""); }}
            required
            disabled={!player1}
            className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--ivory-050)] text-[var(--slate-950)] text-sm focus:outline-none focus:border-[var(--brand-teal)] transition-colors disabled:opacity-40"
          >
            <option value="">Select player…</option>
            {p2Options.map((n) => (
              <option key={n} value={n}>{formatName(n)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Who won? */}
      {player1 && player2 && (
        <div className="livo-card p-6 space-y-3">
          <h3 className="text-base font-bold text-[var(--slate-950)]">Who won?</h3>
          <div className="grid grid-cols-2 gap-3">
            {(["player1", "player2"] as const).map((key) => {
              const name = key === "player1" ? player1 : player2;
              const selected = winner === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setWinner(key)}
                  className={`rounded-xl p-4 text-center border-2 transition-all ${
                    selected
                      ? "border-[var(--brand-teal)] bg-[var(--brand-teal-subtle)] text-[var(--brand-teal)]"
                      : "border-[var(--border)] bg-[var(--ivory-050)] text-[var(--slate-700)] hover:border-[var(--brand-teal-border)]"
                  }`}
                >
                  <div className="text-2xl mb-2">{selected ? "🏆" : "🏓"}</div>
                  <div className="text-sm font-bold leading-tight">{formatName(name)}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Who's submitting? */}
      {player1 && player2 && winner && (
        <div className="livo-card p-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--slate-700)] mb-1.5">
            Your name (who's entering this result)
          </label>
          <select
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--ivory-050)] text-[var(--slate-950)] text-sm focus:outline-none focus:border-[var(--brand-teal)] transition-colors"
          >
            <option value="">I am…</option>
            {submitterOptions.map((n) => (
              <option key={n} value={n}>{formatName(n)}</option>
            ))}
          </select>
          <p className="text-xs text-[var(--slate-400)] mt-2">
            The other player will need to confirm this result before points are awarded.
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || loading}
        className="livo-pill-btn w-full py-3 bg-[var(--brand-teal)] text-white font-semibold text-sm hover:bg-[var(--brand-teal-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : "Submit Result →"}
      </button>
    </form>
  );
}
