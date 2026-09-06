# Painel de conteúdo para o site de cursos

Objetivo: seu cliente entra num painel protegido por login e atualiza sozinho os cursos e os textos das seções, sem mexer no código. As vendas continuam num checkout externo — cada curso tem um link de compra que você/ele define.

## O que ele vai poder editar

**Cursos**
- Criar, editar, duplicar, despublicar e excluir
- Campos: nome, concurso, categoria (curso completo / matéria isolada), preço, preço antigo, resumo, descrição, lista de matérias, imagem de capa, link do checkout, destaque na home e ordem de exibição
- Upload da capa direto no painel

**Textos das seções**
- Hero: título, subtítulo, texto do botão e link do botão
- Textos e chamadas das demais seções da página inicial (faixa, "Eles passaram", rodapé, contatos/redes)

Aprovados e depoimentos continuam como estão hoje (imagens fixas no projeto). Se depois quiser deixá-los editáveis também, é um acréscimo simples.

## Acesso

- Página de login por e-mail e senha em `/admin` (não aparece no menu do site)
- Só contas marcadas como administrador entram no painel; cadastro aberto fica desativado — você cria o acesso do cliente
- Painel com lista de cursos, formulário de curso e uma aba "Conteúdo do site" para os textos

## Site público

- A vitrine (home, loja, página do curso) passa a ler os dados do banco em vez do arquivo fixo
- Botão "Comprar" leva ao link de checkout externo cadastrado no curso
- O conteúdo atual é migrado para o banco, então a página continua exatamente como está hoje ao entrar no ar

## Banco de dados (seu Supabase externo)

Você já tem o projeto criado. Para conectá-lo: **Configurações do Projeto → Conectores → Supabase**, autorizando pelo navegador. Isso não pode ser feito por mim daqui. Depois disso eu crio a estrutura.

## Detalhes técnicos

Tabelas em `public`:
- `produtos` — slug único, nome, concurso, categoria, preco, preco_original, resumo, descricao, materias (text[]), capa_url, checkout_url, destaque, ordem, publicado, timestamps
- `site_content` — chave/valor em JSON por seção (`hero`, `faixa`, `aprovados`, `rodape`)
- `user_roles` + enum `app_role` + função `has_role()` security definer (papéis nunca no perfil do usuário)

Segurança: RLS ligada em tudo, com GRANTs explícitos. `SELECT` público (anon) apenas para linhas publicadas; `INSERT/UPDATE/DELETE` só para `has_role(auth.uid(),'admin')`. Storage bucket público `capas` com upload restrito a admin.

Aplicação: leitura pública via server function com cliente publishable (SSR/SEO preservados); mutações via `createServerFn` com `requireSupabaseAuth` + verificação de papel. Rotas do painel sob `_authenticated/`. Migração inclui os INSERTs do conteúdo atual.
