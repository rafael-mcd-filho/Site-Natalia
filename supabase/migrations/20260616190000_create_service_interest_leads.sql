create table if not exists public.leads_interesse (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nome text not null check (char_length(trim(nome)) > 0),
  email text not null check (position('@' in email) > 1),
  servico text not null default 'Gestão e Desenvolvimento de Equipes Comerciais' check (char_length(trim(servico)) > 0),
  lgpd boolean not null default false,
  origem text not null default 'site',
  status text not null default 'novo' check (status in ('novo', 'em_contato', 'convertido', 'arquivado')),
  observacoes text,
  archived_at timestamptz,
  admin_notes text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_path text,
  referrer text,
  user_agent text
);

create index if not exists leads_interesse_created_at_idx on public.leads_interesse (created_at desc);
create index if not exists leads_interesse_nome_idx on public.leads_interesse (nome);
create index if not exists leads_interesse_email_idx on public.leads_interesse (email);
create index if not exists leads_interesse_servico_idx on public.leads_interesse (servico);
create index if not exists leads_interesse_status_idx on public.leads_interesse (status);
create index if not exists leads_interesse_archived_at_idx on public.leads_interesse (archived_at);
create index if not exists leads_interesse_utm_source_idx on public.leads_interesse (utm_source);

drop trigger if exists set_leads_interesse_updated_at on public.leads_interesse;
create trigger set_leads_interesse_updated_at
before update on public.leads_interesse
for each row
execute function public.set_updated_at();

alter table public.leads_interesse enable row level security;

drop policy if exists "Public can create service interest leads" on public.leads_interesse;
create policy "Public can create service interest leads"
on public.leads_interesse
for insert
to anon, authenticated
with check (lgpd is true);
