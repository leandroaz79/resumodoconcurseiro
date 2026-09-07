# Corrigir o erro "supabaseUrl is required" na aba Textos do site

## Diagnóstico

A aba "Textos do site" do painel carrega os textos pela função `getConteudoSite` (em `src/lib/site.functions.ts`). Ela monta a conexão com o banco lendo as variáveis de ambiente `EXTERNAL_SUPABASE_URL` e `EXTERNAL_SUPABASE_ANON_KEY` via `process.env` na hora da chamada. Em parte das execuções essas variáveis não chegam ao ambiente, a conexão é criada sem endereço e o Supabase dispara "supabaseUrl is required" — por isso a mensagem aparece e some conforme a consulta é refeita ao rolar/navegar.

A correção é simples e definitiva: a URL e a chave pública do banco externo já existem como constantes no código (`src/lib/external-supabase.ts` — são valores públicos, seguros para ficar no código, como já acontece no login). Basta a leitura pública usar essas constantes em vez das variáveis de ambiente.

## Mudança

- **`src/lib/site.functions.ts`** — na função `clientePublico()`, trocar `process.env["EXTERNAL_SUPABASE_URL"]` e `process.env["EXTERNAL_SUPABASE_ANON_KEY"]` pelas constantes `EXTERNAL_SUPABASE_URL` e `EXTERNAL_SUPABASE_ANON_KEY` importadas de `./external-supabase`, reutilizando também o `createSupabaseFetch` já existente ali.

Nenhuma outra página ou funcionalidade é alterada. O upload de capas e as ações administrativas continuam usando a chave privada via variável de ambiente (correto, pois ela é secreta).

## Verificação

- Abrir o painel em `/admin`, aba "Textos do site", rolar a página e alternar entre abas confirmando que o erro não aparece mais e os textos carregam.
- Conferir que a home e a loja continuam listando os cursos normalmente.
