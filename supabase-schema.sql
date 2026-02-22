-- Supabase schema for Sonar Launch Kit
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Kits table: stores generated launch kits
create table if not exists public.kits (
  id uuid default uuid_generate_v4() primary key,
  project_name text not null,
  answers jsonb not null default '{}'::jsonb,
  sections jsonb not null default '{}'::jsonb,
  is_premium boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.kits enable row level security;

-- Policy: anyone can read kits (for shareable links)
create policy "Kits are publicly readable"
  on public.kits for select
  using (true);

-- Policy: anyone can insert kits (anonymous generation)
create policy "Anyone can create kits"
  on public.kits for insert
  with check (true);

-- Index for faster lookups
create index if not exists kits_created_at_idx on public.kits (created_at desc);
create index if not exists kits_project_name_idx on public.kits (project_name);
