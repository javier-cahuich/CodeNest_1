begin;

create table public.flashcard_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_slug text not null check (length(trim(topic_slug)) > 0),
  card_id text not null check (length(trim(card_id)) > 0),
  status text not null check (status in ('known', 'inProgress')),
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_slug, card_id)
);

alter table public.flashcard_progress enable row level security;

revoke all on public.flashcard_progress from anon, authenticated;
grant select, insert, update on public.flashcard_progress to authenticated;

create policy "Users read their own flashcard progress"
  on public.flashcard_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users insert their own flashcard progress"
  on public.flashcard_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users update their own flashcard progress"
  on public.flashcard_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create function public.set_flashcard_progress_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger flashcard_progress_updated_at
  before insert or update on public.flashcard_progress
  for each row execute function public.set_flashcard_progress_updated_at();

commit;
