alter table public.leads_empresa
add column if not exists quantidade_colaboradores text;

create index if not exists leads_empresa_quantidade_colaboradores_idx
on public.leads_empresa (quantidade_colaboradores);
