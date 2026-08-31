# Seção "Eles passaram — O próximo pode ser você"

Hoje a home tem apenas a faixa vermelha com o texto "Eles passaram · O próximo pode ser você". A prova social real do site original (o mural com 15 aprovados) não foi reproduzida.

No site original essa seção não é um grid em HTML: é **uma única imagem** (`CHECKOOUT-7.png`, 1366x1280) com os 15 cards já "chapados" dentro, exibida num carrossel do Elementor. Por isso ela não aparecia no conteúdo extraído.

## O que será feito

Recriar a seção como grid nativo, não como imagem única:

1. Recortar as 15 fotos individuais da imagem original e salvá-las como assets do projeto.
2. Criar uma lista de dados com nome + aprovação de cada um, transcritos da imagem:
   Charleston (PMPE), Milena Chaves (Escrivã PCPE), Alison (PMPE e Corpo de Bombeiro), Fagundes (PMPE), Mirelly (PM Rio Grande do Norte), Emanuel (Bombeiro PB, PMPE e GCM Belo Jardim), Danylo Doane (GCM Camaragibe e Moreno), Felipe Lins (Agente PCPE, Escrivão PCPE, CBMPE e PMPE), Ana Clara (PMPE), Luís Morais (PMPE), Genilson (GCM Caruaru e Santa Cruz do Capibaribe), Matheus (GCM Caruaru e Santa Cruz do Capibaribe), Hugo (GCM Caruaru, Jaboatão e Santa Cruz do Capibaribe), Bruno Araujo (Santa Cruz do Capibaribe), Cibelle (PMPB, GCM Belo Jardim e Caruaru).
3. Montar a seção na home logo após a faixa vermelha, mantendo o visual atual (preto/vermelho, tipografia condensada):
   - Título "Eles passaram..." com "O próximo pode ser você" em destaque.
   - Subtítulo "Quem já aplicou RDC teve esse resultado".
   - Grid responsivo de cards com foto + legenda (5 colunas no desktop, 3 no tablet, 2 no celular).
   - Faixa de fecho "Somos mais de 700 aprovados em apenas dois anos de RDC", com o número destacado em vermelho.

## Detalhes técnicos

- Recorte das fotos com Python/PIL a partir da imagem baixada, coordenadas fixas por card; saída em WEBP quadrado.
- Fotos registradas como assets do projeto (ponteiros de asset) e importadas nos componentes.
- Novo arquivo `src/data/aprovados.ts` com `{ nome, aprovacao, foto }`.
- Novo componente `src/components/site/ElesPassaram.tsx`, usado em `src/routes/index.tsx` no lugar/abaixo da faixa marquee atual.
- Apenas layout — sem backend, sem alterar produtos ou depoimentos existentes.
