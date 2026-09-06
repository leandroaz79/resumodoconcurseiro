# Conectar o Supabase externo ao painel de conteúdo

Objetivo: fazer o site e o painel (`/admin`) passarem a usar o **seu** Supabase (o projeto que você já criou), em vez do banco gerenciado do Lovable Cloud onde tudo está hoje.

## O que você precisa fazer (só você pode)

1. Abra **Configurações do Projeto → Conectores → Supabase** e autorize a conexão do seu projeto externo pelo navegador.
2. Me avise aqui no chat quando terminar.

Não consigo fazer essa autorização por você — ela depende do seu login no seu Supabase.

## O que eu faço depois da conexão

1. **Recriar a estrutura no seu Supabase externo**: tabelas `produtos` e `site_content`, controle de acesso (apenas administradores editam; visitantes só leem cursos publicados), regra do primeiro cadastro virar administrador, e o repositório de imagens das capas.
2. **Migrar o conteúdo atual**: os 10 cursos e todos os textos das seções que já estão cadastrados serão copiados para o seu banco, para nada se perder.
3. **Recriar as capas**: as imagens das capas dos cursos serão enviadas para o repositório do seu Supabase, com os links atualizados.
4. **Verificar o site de ponta a ponta**: home, loja e páginas de curso lendo do seu banco, e o painel criando/editando cursos nele.

## Atenção: login do painel

O acesso de administrador **não migra** — o cadastro atual vive no banco gerenciado, e seu banco externo não tem usuários. Depois da migração, o primeiro cadastro feito em `/admin` no seu Supabase vira automaticamente o administrador (é a regra que já existe). Ou seja: você/ cliente cria a conta uma vez de novo e confirma o e-mail.

## O que fica de fora

- Nada muda no layout do site nem nas páginas públicas — só a origem dos dados.
- Depoimentos e aprovados continuam fixos no projeto, como já combinado.

## Detalhes técnicos

- A conexão externa substitui as variáveis de ambiente do projeto (URL e chave pública), então o código existente (`site.functions.ts`, `admin.functions.ts`, rotas do painel, rota de capas) continua igual, apenas apontando para o seu projeto.
- Migração do schema no projeto externo inclui: enum `app_role`, `user_roles`, `has_role()` security definer, trigger `handle_new_user()`, triggers `set_updated_at`, RLS + GRANTs, bucket `capas`, e os INSERTs do conteúdo atual (lidos do banco atual antes da troca).
- Enquanto a conexão não for autorizada, nada é alterado — o site segue funcionando no banco atual.
