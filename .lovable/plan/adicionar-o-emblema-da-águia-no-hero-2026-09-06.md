# Adicionar o emblema da águia no hero

## Objetivo
Colocar o logo da águia (imagem enviada) no lado direito do hero, na área marcada em verde, de forma proporcional e profissional.

## O que será feito

1. **Salvar a imagem no projeto**
   - Subir `Design_sem_nome.png` (emblema da águia) como asset do projeto (CDN), gerando `src/assets/logo-aguia.png.asset.json`.

2. **Inserir no hero (`src/routes/index.tsx`)**
   - Posicionar o emblema à direita do título "Você não precisa estar pronto. Só precisa começar.", na área hoje vazia marcada em verde.
   - **Desktop**: emblema visível ao lado do título, com tamanho proporcional (altura aproximada ao bloco do título, ~280–360px), alinhado verticalmente ao centro do texto.
   - **Mobile/tablet**: emblema reduzido e posicionado acima ou ao lado do título sem quebrar o layout, ou oculto em telas muito pequenas se comprometer a leitura — validado no preview.
   - Aplicar leve sombra/brilho sutil (drop-shadow) para o emblema se destacar sobre a foto de fundo sem parecer "colado".
   - Manter intactos: foto de fundo com degradê, grid por cima, textos e botões atuais.

## Detalhes técnicos
- Apenas alterações em `src/routes/index.tsx` + novo asset `src/assets/logo-aguia.png.asset.json`.
- Imagem servida pelo CDN do projeto (sem depender de sites externos).
- Uso de utilitários de layout (flex/grid) existentes; nenhuma dependência nova.
