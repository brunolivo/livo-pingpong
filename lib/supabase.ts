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
  points: number;
  wins: number;
  losses: number;
  winRate: number;
}

export function computeLeaderboard(
  playerNames: string[],
  matches: DbMatch[]
): PlayerStats[] {
  const stats = new Map<string, { wins: number; losses: number }>(
    playerNames.map((n) => [n, { wins: 0, losses: 0 }])
  );

  matches
    .filter((m) => m.status === "approved")
    .forEach((m) => {
      const loser =
        m.winner_name === m.player1_name ? m.player2_name : m.player1_name;
      const w = stats.get(m.winner_name) ?? { wins: 0, losses: 0 };
      const l = stats.get(loser) ?? { wins: 0, losses: 0 };
      stats.set(m.winner_name, { wins: w.wins + 1, losses: w.losses });
      stats.set(loser, { wins: l.wins, losses: l.losses + 1 });
    });

  return Array.from(stats.entries())
    .map(([name, { wins, losses }]) => ({
      name,
      points: wins,
      wins,
      losses,
      winRate: wins + losses > 0 ? wins / (wins + losses) : 0,
      rank: 0,
    }))
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.wins - a.wins ||
        a.losses - b.losses ||
        a.name.localeCompare(b.name)
    )
    .map((p, i) => ({ ...p, rank: i + 1 }));
}

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
