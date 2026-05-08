-- Livo Ping Pong — Supabase Schema
-- Run this in your Supabase project: Dashboard → SQL Editor → New query

create table if not exists matches (
  id           uuid default gen_random_uuid() primary key,
  player1_name text not null,
  player2_name text not null,
  winner_name  text not null,
  submitted_by text not null,
  status       text default 'pending'
               check (status in ('pending', 'approved', 'rejected')),
  created_at   timestamptz default now(),
  resolved_at  timestamptz
);

-- Allow anonymous reads and writes (internal tool, no auth needed)
alter table matches enable row level security;

create policy "allow_all_anon" on matches
  for all
  to anon
  using (true)
  with check (true);

-- Index for fast pending lookups
create index if not exists matches_status_idx on matches (status);
create index if not exists matches_player1_idx on matches (player1_name);
create index if not exists matches_player2_idx on matches (player2_name);
