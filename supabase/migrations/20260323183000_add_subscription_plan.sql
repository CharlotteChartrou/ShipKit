alter table public.users
add column if not exists subscription_plan text not null default 'free' check (
  subscription_plan in ('free', 'starter', 'pro')
);
