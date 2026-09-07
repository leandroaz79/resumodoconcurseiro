# Corrigir erro de slug ao cadastrar curso

## Problema
No painel, ao digitar a slug com letras maiúsculas, o salvamento falha com o erro de validação "Use apenas letras minúsculas, números e hífens".

## Solução
Em `src/components/admin/CursosAdmin.tsx`, no campo "Endereço (slug)":
- Normalizar o valor enquanto digita: converter para minúsculas, trocar espaços por hífens e remover caracteres inválidos (acentos, símbolos). Ex.: "Guarda Municipal PM" vira `guarda-municipal-pm` automaticamente.

Assim o usuário pode digitar maiúsculas ou com espaços e a slug sempre sai válida — sem mudar a validação do servidor.

## Validação
- Testar no painel criando um curso com slug em maiúsculas e confirmar que salva sem erro.
