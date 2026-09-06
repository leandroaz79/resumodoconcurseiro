# Preparar o site para publicação no Dokploy (Docker)

Hoje o build do projeto gera um pacote para Cloudflare Workers (padrão do Lovable). Para rodar no Dokploy (seu VPS com Docker), o site precisa ser compilado como um **servidor Node.js** dentro de um container. Nada no layout ou no painel muda — é só a "embalagem" de publicação.

## O que será feito

1. **Trocar o alvo do build para Node** (`vite.config.ts`)
   - Adicionar `nitro: { preset: "node-server" }`.
   - Dentro do Lovable esse ajuste é ignorado automaticamente (o preview e o publish continuam funcionando como hoje); fora do Lovable (no Docker do Dokploy) o build sai como servidor Node.

2. **Criar `Dockerfile`** (multi-stage, o que o Dokploy usa para buildar)
   - Estágio 1: `bun install` + `bun run build` → gera `.output/`.
   - Estágio 2: imagem Node enxuta rodando `node .output/server/index.mjs`, porta 3000 (o Dokploy redireciona o domínio para ela).

3. **Criar `.dockerignore`** — exclui `node_modules`, `.git`, `.env` etc. do build do container.

4. **Script `start` no `package.json`** — `node .output/server/index.mjs` (facilita testes locais e serve como referência de comando).

5. **Validar o build** — rodar o build localmente simulando o ambiente Docker e conferir que o servidor Node sobe e responde na porta 3000.

## Configuração que você faz no Dokploy (fora do código)

Na tela do serviço no Dokploy, antes de subir:

- **Tipo de deploy**: Git (apontando para o repositório) com **Dockerfile** como build.
- **Variável de ambiente obrigatória**:
  - `EXTERNAL_SUPABASE_SERVICE_ROLE_KEY` = a mesma service role do seu banco externo que já está salva aqui no Lovable (usada para upload de capas no painel).
- **Porta**: 3000 (o app já obedece à variável `PORT` se o Dokploy definir outra).
- **Domínio**: configurar em "Domains" do serviço (ex.: resumodoconcurseiro.com.br) com HTTPS automático.

## Pontos já verificados (não precisam de ação)

- O código do servidor já é compatível com Node (não usa nada exclusivo de Workers nem binários nativos).
- O app não depende das variáveis `VITE_SUPABASE_*` do Lovable Cloud — todo o acesso a dados vai para o seu banco externo, cuja URL e chave pública já estão no código.
- O banco, o login do painel e o storage de capas continuam no seu Supabase externo, sem mudança nenhuma.

## Depois de publicado

- O painel continua em `/admin` e o login em `/auth`, no novo domínio.
- Se quiser manter também a versão publicada aqui no Lovable, ela continua funcionando — os dois ambientes leem o mesmo banco.
