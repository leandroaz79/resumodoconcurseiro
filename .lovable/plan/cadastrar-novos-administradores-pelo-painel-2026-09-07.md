# Cadastrar novos administradores pelo painel

## Situação atual
Hoje só o **primeiro** cadastro feito em `/auth` vira administrador automaticamente. Qualquer conta criada depois entra como usuário comum e não acessa o painel. Não existe forma de promover um segundo administrador sem mexer direto no banco.

## Solução
Adicionar no painel `/admin` uma nova aba **"Administradores"**, visível apenas para quem já é admin, com:

1. **Lista dos administradores atuais** (e-mail de cada um).
2. **Cadastrar novo administrador**: o admin atual informa e-mail e senha; o sistema cria a conta já confirmada e concede o papel de administrador. A pessoa então entra em `/auth` normalmente.
3. **Remover administrador**: tira o acesso ao painel (a conta continua existindo, mas vira usuário comum). O admin não pode remover a si mesmo.

## Detalhes técnicos
- Nova server function protegida em `src/lib/admin.functions.ts`: verifica `has_role(auth.uid(), 'admin')` antes de criar o usuário via cliente admin (service role) e inserir em `user_roles`.
- Criação de usuário com `email_confirm: true` para não depender de confirmação de e-mail.
- Remoção apaga apenas a linha em `user_roles` (mantém o cadastro em `auth.users`).
- Nova aba no painel `src/routes/_authenticated/admin/index.tsx` com a lista e os formulários.

## Validação
- Criar um segundo administrador pela nova aba e confirmar login em `/auth` com acesso ao painel.
- Confirmar que um usuário sem papel admin não consegue chamar a função nem acessar `/admin`.
