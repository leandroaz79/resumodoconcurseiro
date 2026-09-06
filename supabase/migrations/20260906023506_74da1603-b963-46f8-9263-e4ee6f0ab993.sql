-- ============ Roles ============
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Primeira pessoa que criar conta no painel vira administradora.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from auth.users) <= 1 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ Produtos ============
create table public.produtos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  concurso text not null,
  categoria text not null default 'projetos',
  preco numeric(10,2) not null default 0,
  preco_original numeric(10,2),
  resumo text not null default '',
  descricao text not null default '',
  materias text[] not null default '{}',
  capa_url text not null default '',
  checkout_url text not null default '',
  destaque boolean not null default false,
  ordem integer not null default 0,
  publicado boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.produtos to authenticated;
grant all on public.produtos to service_role;
grant select on public.produtos to anon;

alter table public.produtos enable row level security;

create policy "Publico le produtos publicados"
  on public.produtos for select
  to anon, authenticated
  using (publicado = true);

create policy "Admin gerencia produtos"
  on public.produtos for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ Conteudo do site ============
create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  secao text unique not null,
  conteudo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
grant select on public.site_content to anon;

alter table public.site_content enable row level security;

create policy "Publico le conteudo"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "Admin gerencia conteudo"
  on public.site_content for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ============ updated_at ============
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger produtos_set_updated_at
  before update on public.produtos
  for each row execute function public.set_updated_at();

create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();

-- ============ Seed: produtos atuais ============
insert into public.produtos
  (slug, nome, concurso, categoria, preco, preco_original, resumo, descricao, materias, capa_url, checkout_url, destaque, ordem, publicado)
values
  ('projeto-guardamunicipaltamandare', 'Projeto Guarda Civil Municipal Tamandaré/PE', 'GCM Tamandaré/PE', 'projetos', 87, null,
   'Material completo e atualizado conforme o edital da Guarda Civil Municipal de Tamandaré/PE, com todas as disciplinas em PDF direto ao ponto.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-guardamunicipaltamandare.webp', '', true, 1, true),
  ('projeto-policiapenaldepernambuco', 'Projeto Polícia Penal de Pernambuco', 'Polícia Penal PE', 'projetos', 120, 159.90,
   'Preparação completa para a Polícia Penal de Pernambuco: resumos revisados, esquematizados e alinhados à banca.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-policiapenaldepernambuco.webp', '', true, 2, true),
  ('projeto-pp-rn', 'Projeto PP Rio Grande do Norte', 'Polícia Penal RN', 'projetos', 97, 120,
   'Todo o conteúdo do edital da Polícia Penal do Rio Grande do Norte em material enxuto, para quem tem pouco tempo de estudo.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/7469ded9-33e7-4195-a12a-1c41bf97c6ab/capa-projeto-pp-rn.webp', '', true, 3, true),
  ('projeto-gcm-natal', 'Projeto GCM Natal', 'GCM Natal', 'projetos', 97, 120,
   'Projeto completo para a Guarda Civil Municipal de Natal, com todas as disciplinas cobradas em edital.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-gcm-natal.webp', '', true, 4, true),
  ('projeto-cabodesantoagostinho', 'Projeto GCM Cabo de Santo Agostinho', 'GCM Cabo de Santo Agostinho', 'projetos', 97, 120,
   'Material direcionado ao edital da GCM do Cabo de Santo Agostinho, revisado e atualizado pela equipe RDC.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-cabodesantoagostinho.webp', '', true, 5, true),
  ('projeto-policia-militar-de-pernambuco', 'Projeto Polícia Militar de Pernambuco', 'PMPE', 'projetos', 120, 160,
   'O projeto mais completo do RDC para a PMPE: teoria resumida, esquemas e revisão de reta final.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-policia-militar-de-pernambuco.webp', '', true, 6, true),
  ('projeto-guarda-civil-municipal-recife', 'Projeto Guarda Civil Municipal Recife', 'GCM Recife', 'projetos', 97, 120,
   'Conteúdo completo para a Guarda Civil Municipal do Recife, com legislação municipal específica.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-guarda-civil-municipal-recife.webp', '', true, 7, true),
  ('projeto-policia-militar-de-alagoas', 'Projeto Polícia Militar de Alagoas | PMAL', 'PMAL', 'projetos', 120, null,
   'Preparação direcionada para a Polícia Militar de Alagoas, com material atualizado conforme a banca.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-policia-militar-de-alagoas.webp', '', true, 8, true),
  ('projeto-guarda-civil-municipal-de-campina-grande', 'Projeto GCM Campina Grande (Edital 2026)', 'GCM Campina Grande', 'projetos', 97, 120,
   'Material atualizado para o edital 2026 da Guarda Civil Municipal de Campina Grande.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-guarda-civil-municipal-de-campina-grande.webp', '', true, 9, true),
  ('projeto-policia-penal-da-paraiba', 'Projeto Polícia Penal da Paraíba | PPPB', 'Polícia Penal PB', 'projetos', 97, 120,
   'Todas as disciplinas da Polícia Penal da Paraíba em resumos objetivos, prontos para revisão.',
   '',
   array['Língua Portuguesa','Raciocínio Lógico','Direito Constitucional','Direito Administrativo','Direito Penal','Direitos Humanos','Legislação Específica','Informática'],
   '/__l5e/assets-v1/401b45d4-placeholder/capa-projeto-policia-penal-da-paraiba.webp', '', true, 10, true);

-- ============ Seed: conteudo das secoes ============
insert into public.site_content (secao, conteudo) values
  ('hero', '{"tagline":"Materiais RDC","titulo_linha1":"Você não precisa estar pronto.","titulo_linha2":"Só precisa começar.","subtitulo":"Resumos em PDF, direto ao ponto, para quem estuda com pouco tempo e quer ver o próprio nome na lista de aprovados.","cta_texto":"Comece a estudar agora"}'::jsonb),
  ('beneficios', '{"bloco1_titulo":"Materiais atualizados","bloco1_texto":"Potencialize seus estudos com materiais revisados e sempre atualizados conforme o edital e a banca.","bloco2_titulo":"Download liberado","bloco2_texto":"Baixe nosso material e estude onde e quando quiser, no celular, tablet ou impresso.","contador_valor":"+10 mil","contador_label":"Membros ativos"}'::jsonb),
  ('destaques', '{"kicker":"Material completo","titulo":"Seja membro dos projetos","link_texto":"Ver todos"}'::jsonb),
  ('material_gratuito', '{"titulo":"Conheça nossos materiais gratuitos","subtitulo":"Uma amostra do padrão RDC, sem custo nenhum.","botao":"Material gratuito","url":"https://drive.google.com/drive/folders/1ghUvmwUNqHU4DAOc7zP9tNlHcXl8jc6B?usp=drive_link"}'::jsonb),
  ('suporte', '{"titulo":"Precisa de ajuda?","texto":"Ao encontrar dúvidas em qualquer procedimento do site ou no material, fale diretamente com a nossa equipe pelo WhatsApp.","botao":"Falar no WhatsApp"}'::jsonb),
  ('marquee', '{"texto":"Eles passaram · O próximo pode ser você"}'::jsonb),
  ('rodape', '{"descricao":"Materiais em PDF direto ao ponto para quem estuda com pouco tempo e quer ver o nome na lista de aprovados.","suporte_texto":"Dúvidas sobre o site ou sobre o material? Fale com a gente pelo WhatsApp."}'::jsonb),
  ('links', '{"whatsapp_url":"https://api.whatsapp.com/send?phone=5581994075816"}'::jsonb);