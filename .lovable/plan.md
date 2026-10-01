# Adicionar "Área de membros" no menu superior

Inserir um novo item no menu do topo, entre "Início" e "Materiais", com o texto
"Área de membros" apontando para https://app.resumodoconcurseiro.com.br.

## O que muda

- `src/components/site/Header.tsx` — no menu desktop, entre o link "Início" e o
  link "Materiais", inserir um `<a href="https://app.resumodoconcurseiro.com.br">`
  com o texto "Área de membros", no mesmo estilo dos outros itens (mesmo tamanho,
  espaçamento e comportamento de hover).
- O mesmo item no menu mobile (o menu que abre ao clicar no ícone), na mesma
  posição entre "Início" e "Materiais".
- Como é um link externo (outro site), abre em nova aba (`target="_blank"`),
  igual ao botão de WhatsApp. É um link simples, não uma rota interna.

## O que não muda

- Nenhuma outra página, seção ou componente.
- O botão "Falar com a equipe" permanece onde está, após "Materiais".
