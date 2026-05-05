alter table public.leads_empresa
add column if not exists admin_notes text,
add column if not exists utm_source text,
add column if not exists utm_medium text,
add column if not exists utm_campaign text,
add column if not exists utm_term text,
add column if not exists utm_content text,
add column if not exists landing_path text,
add column if not exists referrer text,
add column if not exists user_agent text;

alter table public.leads_candidato
add column if not exists admin_notes text,
add column if not exists utm_source text,
add column if not exists utm_medium text,
add column if not exists utm_campaign text,
add column if not exists utm_term text,
add column if not exists utm_content text,
add column if not exists landing_path text,
add column if not exists referrer text,
add column if not exists user_agent text;

create index if not exists leads_empresa_utm_source_idx on public.leads_empresa (utm_source);
create index if not exists leads_candidato_utm_source_idx on public.leads_candidato (utm_source);
