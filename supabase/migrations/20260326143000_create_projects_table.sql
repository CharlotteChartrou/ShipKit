create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.projects enable row level security;

create policy "Users can view their own projects"
on public.projects
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own projects"
on public.projects
for insert
to authenticated
with check ((select auth.uid()) = user_id);
