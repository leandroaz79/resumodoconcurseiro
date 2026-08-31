# Ajustar grid da seção "Eles passaram"

## O que será feito
- Na seção **Eles passaram**, alterar o grid para exibir **4 fotos por fila no desktop**.
- Manter **2 fotos por fila no mobile** e **3 fotos por fila no tablet**.
- Ajustar levemente o espaçamento e o tamanho dos cards para que 4 colunas fiquem equilibradas dentro do container `max-w-6xl`.

## Arquivo alterado
- `src/components/site/ElesPassaram.tsx`

## Mudanças técnicas
- Trocar `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` por `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`.
- Reduzir o gap do grid de `gap-4` para `gap-3` (ou ajustar padding interno) para evitar cards muito grandes.
- Verificar visualmente no preview desktop e mobile.
