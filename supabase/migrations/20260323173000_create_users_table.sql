create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default timezone('utc', now()),
  subscription_status text not null default 'free' check (
    subscription_status in ('free', 'trialing', 'active', 'past_due', 'canceled')
  )
);

alter table public.users enable row level security;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do update
  set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();

create policy "Users can view their own record"
on public.users
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert their own record"
on public.users
for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update their own record"
on public.users
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);
