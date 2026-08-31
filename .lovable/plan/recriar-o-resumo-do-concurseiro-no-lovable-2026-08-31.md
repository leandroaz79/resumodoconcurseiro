# Recriar o Resumo do Concurseiro no Lovable

Recriação visual do site atual (WordPress/WooCommerce) com layout novo e moderno, mantendo a marca RDC e o conteúdo real. Só layout — sem banco de dados, login ou pagamento nesta etapa.

## Páginas

1. **Home (`/`)**
   - Hero: "Você não precisa estar pronto. Só precisa começar." + CTA para a loja
   - Blocos "Materiais RDC": Cursos completos e Matérias isoladas
   - Seção de benefícios: materiais atualizados, download/estude offline, contador de membros ativos
   - Faixa de material gratuito (link do Drive)
   - Depoimentos de alunos (carrossel), com o bloco "ELES PASSARAM — o próximo pode ser você"
   - Suporte/WhatsApp e rodapé

2. **Loja (`/loja`)**
   - Grade de produtos com capa, nome, preço original riscado, preço promocional e selo "Oferta!"
   - Filtro por categoria: Projetos e Matérias Isoladas (Simulados hoje está vazio)
   - Botão "Adicionar ao carrinho" apenas visual nesta etapa

3. **Produto (`/produto/$slug`)**
   - Capa grande, título, preço, descrição, o que está incluído, CTA de compra e produtos relacionados

## Conteúdo

Uso os textos e produtos reais da loja (Guarda Civil Tamandaré/PE, Polícia Penal PE, PP RN, GCM Natal, GCM Cabo de Santo Agostinho, PMPE, GCM Recife, PMAL, GCM Campina Grande, PPPB) com os preços atuais. As imagens (capas de produto e fotos de depoimentos) são carregadas direto das URLs do WordPress, para ficarem idênticas às do site.

## Design

Antes de codar, gero 3 direções de layout renderizadas para você escolher — redesign moderno, com a marca RDC preservada. Depois de escolher, implemento a direção escolhida nas três páginas.

## Detalhes técnicos

- Rotas TanStack: `src/routes/index.tsx`, `loja.tsx`, `produto.$slug.tsx`
- Catálogo de produtos em um arquivo TypeScript estático (`src/data/produtos.ts`) — fácil de editar depois
- Tokens de cor/tipografia da direção escolhida em `src/styles.css`
- Header e footer compartilhados no `__root.tsx`
- SEO por página: title, description e og tags em português

## Fora do escopo agora

Carrinho funcional, checkout, área do aluno e integração com o WooCommerce. Podem entrar numa próxima etapa.
