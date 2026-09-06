# ---------- Estágio 1: build ----------
FROM oven/bun:1 AS build
WORKDIR /app

# Dependências primeiro (melhor cache de camadas)
COPY package.json bun.lock ./
COPY bunfig.toml .npmrc* ./
RUN bun install --frozen-lockfile

# Código-fonte e build (gera .output/ com servidor Node + assets)
COPY . .
RUN bun run build

# ---------- Estágio 2: runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/.output ./.output

# O servidor escuta na porta definida por PORT (padrão 3000)
ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
