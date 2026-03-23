create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  company_name text,
  role text not null default 'user',
  onboarding_completed boolean not null default false,
  plan_key text not null default 'free',
  credits_balance integer not null default 1,
  monthly_analysis_limit integer not null default 1,
  analyses_used_this_month integer not null default 0,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  analysis_type text not null,
  input_text text not null,
  result_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.billing_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  stripe_event_id text not null unique,
  event_type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  company_or_role text,
  rating integer not null default 5 check (rating between 1 and 5),
  content text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  name text,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.consume_credit_and_store_analysis(
  p_user_id uuid,
  p_analysis_type text,
  p_input_text text,
  p_result_text text
)
returns void
language plpgsql
security definer
as $$
declare
  v_credits integer;
begin
  select credits_balance into v_credits from public.profiles where id = p_user_id for update;

  if v_credits is null then
    raise exception 'Profile not found';
  end if;

  if v_credits <= 0 then
    raise exception 'No credits left';
  end if;

  update public.profiles
  set credits_balance = credits_balance - 1,
      analyses_used_this_month = analyses_used_this_month + 1,
      updated_at = now()
  where id = p_user_id;

  insert into public.analyses (user_id, analysis_type, input_text, result_text)
  values (p_user_id, p_analysis_type, p_input_text, p_result_text);
end;
$$;

alter table public.profiles enable row level security;
alter table public.analyses enable row level security;
alter table public.billing_events enable row level security;
alter table public.reviews enable row level security;
alter table public.support_messages enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile limited" on public.profiles;
create policy "Users can update own profile limited"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can read own analyses" on public.analyses;
create policy "Users can read own analyses"
on public.analyses for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own analyses" on public.analyses;
create policy "Users can insert own analyses"
on public.analyses for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can read own billing events" on public.billing_events;
create policy "Users can read own billing events"
on public.billing_events for select
using (auth.uid() = user_id);

drop policy if exists "Anyone can create review" on public.reviews;
create policy "Anyone can create review"
on public.reviews for insert
with check (true);

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
on public.reviews for select
using (status = 'approved' or auth.uid() = user_id);

drop policy if exists "Anyone can create support message" on public.support_messages;
create policy "Anyone can create support message"
on public.support_messages for insert
with check (true);

drop policy if exists "Users can read own support messages" on public.support_messages;
create policy "Users can read own support messages"
on public.support_messages for select
using (auth.uid() = user_id);
