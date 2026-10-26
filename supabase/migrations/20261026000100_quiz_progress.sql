begin;

create table public.quiz_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_slug text not null check (length(trim(topic_slug)) > 0),
  question_id text not null check (length(trim(question_id)) > 0),
  status text not null check (status in ('correct', 'incorrect')),
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_slug, question_id)
);

alter table public.quiz_progress enable row level security;

revoke all on public.quiz_progress from anon, authenticated;
grant select, insert, update on public.quiz_progress to authenticated;

create policy "Users read their own quiz progress"
  on public.quiz_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users insert their own quiz progress"
  on public.quiz_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users update their own quiz progress"
  on public.quiz_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create function public.set_quiz_progress_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger quiz_progress_updated_at
  before insert or update on public.quiz_progress
  for each row execute function public.set_quiz_progress_updated_at();

commit;
