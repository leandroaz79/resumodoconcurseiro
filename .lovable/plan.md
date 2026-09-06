# Ajustes na página do curso e na tela de login

## 1. Imagem da capa auto-adaptável (página de detalhes do curso)

Hoje a área da capa em `src/routes/produto.$slug.tsx` força um quadrado (`aspect-square` + `object-cover`), o que cria o espaço vazio abaixo da imagem quando a capa não é quadrada.

**Mudança:**
- Remover o formato quadrado fixo e deixar a imagem definir a altura natural (`w-full h-auto`), mantendo a moldura/borda atual.
- A coluna da esquerda deixa de sobrar espaço vazio e acompanha o tamanho real da capa, no desktop e no mobile.

## 2. "Olho" para visualizar a senha (tela de login)

Em `src/routes/auth.tsx`, adicionar um botão de olho dentro do campo de senha:
- Ícone `Eye`/`EyeOff` (lucide-react) posicionado à direita do campo.
- Clique alterna o campo entre senha oculta e senha visível.
- Funciona tanto no modo "Entrar" quanto no "Criar conta".

## Detalhes técnicos

- Apenas os dois arquivos acima serão alterados.
- Nenhuma mudança de dados, banco ou outras páginas.
