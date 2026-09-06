# Formulário de edição de curso: acordeão na lista + modal para novo curso

## O que muda

Na aba **Cursos** do painel (`src/components/admin/CursosAdmin.tsx`):

1. **Editar** — o formulário passa a abrir expandido logo abaixo do curso clicado, dentro da própria lista (acordeão). Os outros cursos continuam visíveis acima e abaixo. Apenas um formulário aberto por vez; clicar em "Editar" em outro curso fecha o anterior. Um botão "Cancelar" (ou "Fechar") recolhe o formulário.
2. **+ Novo curso** — abre um **modal** (janela sobreposta) com o mesmo formulário. Fecha pelo X, pela tecla Esc, clicando fora ou no botão Cancelar.

## Como

- Extrair o JSX do formulário atual para um componente interno `FormularioCurso` (mesmos campos, upload de capa, validações), reaproveitado nos dois lugares — nada muda na lógica de salvar/excluir/enviar imagem.
- Acordeão: renderizar o `FormularioCurso` condicionalmente dentro do item da lista selecionado (`selecionado?.id === p.id`), sem mudança de dados.
- Modal: usar o `Dialog` já existente em `src/components/ui/dialog.tsx` (Radix) para o modo "novo curso".
- Estado: `selecionado` continua controlando a edição inline; `novo` passa a abrir o modal. Ao salvar com sucesso no modo novo, fecha o modal e atualiza a lista (invalidação de queries já existente).
- Nenhuma mudança de backend, rotas ou da aba "Textos do site".
