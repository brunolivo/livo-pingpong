import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(url, key);

export type MatchStatus = "pending" | "approved" | "rejected";

export interface DbMatch {
  id: string;
  player1_name: string;
  player2_name: string;
  winner_name: string;
  submitted_by: string;
  status: MatchStatus;
  created_at: string;
  resolved_at: string | null;
}

export interface PlayerStats {
  name: string;
  rank: number;
  elo: number;
  eloChange: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface MatchWithElo extends DbMatch {
  loserName: string;
  winnerEloBefore: number;
  loserEloBefore: number;
  eloChange: number;
}

// ── Elo constants ────────────────────────────────────────────────────────────
export const ELO_INITIAL = 1200;
const K = 32;

function expected(ra: number, rb: number): number {
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
}

function sortedApproved(matches: DbMatch[]): DbMatch[] {
  return [...matches]
    .filter((m) => m.status === "approved")
    .sort(
      (a, b) =>
        new Date(a.resolved_at ?? a.created_at).getTime() -
        new Date(b.resolved_at ?? b.created_at).getTime()
    );
}

// ── Leaderboard ──────────────────────────────────────────────────────────────
export function computeLeaderboard(
  playerNames: string[],
  matches: DbMatch[]
): PlayerStats[] {
  const elos = new Map<string, number>(playerNames.map((n) => [n, ELO_INITIAL]));
  const wins = new Map<string, number>(playerNames.map((n) => [n, 0]));
  const losses = new Map<string, number>(playerNames.map((n) => [n, 0]));
  const lastChange = new Map<string, number>(playerNames.map((n) => [n, 0]));

  sortedApproved(matches).forEach((m) => {
    const loser = m.winner_name === m.player1_name ? m.player2_name : m.player1_name;
    const Rw = elos.get(m.winner_name) ?? ELO_INITIAL;
    const Rl = elos.get(loser) ?? ELO_INITIAL;
    const delta = Math.round(K * (1 - expected(Rw, Rl)));

    elos.set(m.winner_name, Rw + delta);
    elos.set(loser, Math.max(100, Rl - delta));
    lastChange.set(m.winner_name, delta);
    lastChange.set(loser, -delta);
    wins.set(m.winner_name, (wins.get(m.winner_name) ?? 0) + 1);
    losses.set(loser, (losses.get(loser) ?? 0) + 1);
  });

  return playerNames
    .map((name) => {
      const w = wins.get(name) ?? 0;
      const l = losses.get(name) ?? 0;
      return {
        name,
        elo: elos.get(name) ?? ELO_INITIAL,
        eloChange: lastChange.get(name) ?? 0,
        wins: w,
        losses: l,
        winRate: w + l > 0 ? w / (w + l) : 0,
        rank: 0,
      };
    })
    .sort(
      (a, b) =>
        b.elo - a.elo ||
        b.wins - a.wins ||
        a.losses - b.losses ||
        a.name.localeCompare(b.name)
    )
    .map((p, i) => ({ ...p, rank: i + 1 }));
}

// ── Match history with Elo deltas ────────────────────────────────────────────
export function computeMatchesWithElo(matches: DbMatch[]): MatchWithElo[] {
  const elos = new Map<string, number>();
  const get = (n: string) => elos.get(n) ?? ELO_INITIAL;

  return sortedApproved(matches).map((m) => {
    const loser = m.winner_name === m.player1_name ? m.player2_name : m.player1_name;
    const Rw = get(m.winner_name);
    const Rl = get(loser);
    const delta = Math.round(K * (1 - expected(Rw, Rl)));

    elos.set(m.winner_name, Rw + delta);
    elos.set(loser, Math.max(100, Rl - delta));

    return {
      ...m,
      loserName: loser,
      winnerEloBefore: Rw,
      loserEloBefore: Rl,
      eloChange: delta,
    };
  });
}

// ── Formatting ───────────────────────────────────────────────────────────────
export function formatName(raw: string): string {
  if (raw.includes(",")) {
    const [surname, first] = raw.split(",").map((s) => s.trim());
    return `${titleCase(first)} ${titleCase(surname)}`;
  }
  return titleCase(raw);
}

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
