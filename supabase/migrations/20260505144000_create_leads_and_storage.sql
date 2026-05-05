create extension if not exists pgcrypto;

create table if not exists public.leads_empresa (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nome text not null check (char_length(trim(nome)) > 0),
  empresa text not null check (char_length(trim(empresa)) > 0),
  email text not null check (position('@' in email) > 1),
  whatsapp text not null check (char_length(trim(whatsapp)) > 0),
  vaga text not null check (char_length(trim(vaga)) > 0),
  prazo text not null check (char_length(trim(prazo)) > 0),
  mensagem text,
  lgpd boolean not null default false,
  origem text not null default 'site',
  status text not null default 'novo' check (status in ('novo', 'em_contato', 'convertido', 'arquivado')),
  observacoes text
);

create table if not exists public.leads_candidato (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nome text not null check (char_length(trim(nome)) > 0),
  email text not null check (position('@' in email) > 1),
  whatsapp text not null check (char_length(trim(whatsapp)) > 0),
  cidade_estado text not null check (char_length(trim(cidade_estado)) > 0),
  area_atuacao text not null check (char_length(trim(area_atuacao)) > 0),
  cargo_atual text not null check (char_length(trim(cargo_atual)) > 0),
  experiencia text not null check (char_length(trim(experiencia)) > 0),
  pretensao_salarial text,
  linkedin text,
  cv_url text,
  cv_nome text,
  lgpd boolean not null default false,
  origem text not null default 'site',
  status text not null default 'novo' check (status in ('novo', 'em_analise', 'contatado', 'arquivado')),
  observacoes text
);

create index if not exists leads_empresa_created_at_idx on public.leads_empresa (created_at desc);
create index if not exists leads_empresa_nome_idx on public.leads_empresa (nome);
create index if not exists leads_empresa_email_idx on public.leads_empresa (email);
create index if not exists leads_empresa_whatsapp_idx on public.leads_empresa (whatsapp);
create index if not exists leads_empresa_empresa_idx on public.leads_empresa (empresa);
create index if not exists leads_empresa_status_idx on public.leads_empresa (status);

create index if not exists leads_candidato_created_at_idx on public.leads_candidato (created_at desc);
create index if not exists leads_candidato_nome_idx on public.leads_candidato (nome);
create index if not exists leads_candidato_email_idx on public.leads_candidato (email);
create index if not exists leads_candidato_whatsapp_idx on public.leads_candidato (whatsapp);
create index if not exists leads_candidato_area_idx on public.leads_candidato (area_atuacao);
create index if not exists leads_candidato_cargo_idx on public.leads_candidato (cargo_atual);
create index if not exists leads_candidato_experiencia_idx on public.leads_candidato (experiencia);
create index if not exists leads_candidato_status_idx on public.leads_candidato (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_leads_empresa_updated_at on public.leads_empresa;
create trigger set_leads_empresa_updated_at
before update on public.leads_empresa
for each row
execute function public.set_updated_at();

drop trigger if exists set_leads_candidato_updated_at on public.leads_candidato;
create trigger set_leads_candidato_updated_at
before update on public.leads_candidato
for each row
execute function public.set_updated_at();

alter table public.leads_empresa enable row level security;
alter table public.leads_candidato enable row level security;

drop policy if exists "Public can create company leads" on public.leads_empresa;
create policy "Public can create company leads"
on public.leads_empresa
for insert
to anon, authenticated
with check (lgpd is true);

drop policy if exists "Public can create candidate leads" on public.leads_candidato;
create policy "Public can create candidate leads"
on public.leads_candidato
for insert
to anon, authenticated
with check (lgpd is true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'curriculos',
  'curriculos',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can upload resumes" on storage.objects;
create policy "Public can upload resumes"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'curriculos');
