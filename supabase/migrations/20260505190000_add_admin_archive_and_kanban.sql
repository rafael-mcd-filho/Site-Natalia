alter table public.leads_empresa
add column if not exists archived_at timestamptz;

alter table public.leads_candidato
add column if not exists archived_at timestamptz;

create table if not exists public.recruitment_boards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null check (char_length(trim(title)) > 0),
  archived_at timestamptz
);

create table if not exists public.recruitment_stages (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.recruitment_boards(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null check (char_length(trim(title)) > 0),
  position integer not null default 0
);

create table if not exists public.recruitment_cards (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.recruitment_boards(id) on delete cascade,
  stage_id uuid not null references public.recruitment_stages(id) on delete cascade,
  candidate_id uuid references public.leads_candidato(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  position integer not null default 0,
  notes text,
  constraint recruitment_cards_stage_board_unique unique (id, board_id)
);

create index if not exists leads_empresa_archived_at_idx on public.leads_empresa (archived_at);
create index if not exists leads_candidato_archived_at_idx on public.leads_candidato (archived_at);
create index if not exists recruitment_boards_created_at_idx on public.recruitment_boards (created_at desc);
create index if not exists recruitment_stages_board_position_idx on public.recruitment_stages (board_id, position asc);
create index if not exists recruitment_cards_board_stage_position_idx on public.recruitment_cards (board_id, stage_id, position asc);
create index if not exists recruitment_cards_candidate_idx on public.recruitment_cards (candidate_id);

create unique index if not exists recruitment_cards_board_candidate_uid
on public.recruitment_cards (board_id, candidate_id)
where candidate_id is not null;

drop trigger if exists set_recruitment_boards_updated_at on public.recruitment_boards;
create trigger set_recruitment_boards_updated_at
before update on public.recruitment_boards
for each row
execute function public.set_updated_at();

drop trigger if exists set_recruitment_stages_updated_at on public.recruitment_stages;
create trigger set_recruitment_stages_updated_at
before update on public.recruitment_stages
for each row
execute function public.set_updated_at();

drop trigger if exists set_recruitment_cards_updated_at on public.recruitment_cards;
create trigger set_recruitment_cards_updated_at
before update on public.recruitment_cards
for each row
execute function public.set_updated_at();

alter table public.recruitment_boards enable row level security;
alter table public.recruitment_stages enable row level security;
alter table public.recruitment_cards enable row level security;
