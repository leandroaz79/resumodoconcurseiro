import { queryOptions } from "@tanstack/react-query";
import { CONTEUDO_PADRAO } from "@/data/conteudo";
import { PRODUTOS } from "@/data/produtos";
import {
  getConteudoSite,
  getProdutoPublico,
  getProdutosPublicos,
} from "@/lib/site.functions";

// Lista pública de cursos; se o banco estiver indisponível, usa o catálogo estático.
export const produtosOptions = queryOptions({
  queryKey: ["produtos"],
  queryFn: () => getProdutosPublicos().catch(() => PRODUTOS),
});

export const produtoOptions = (slug: string) =>
  queryOptions({
    queryKey: ["produto", slug],
    queryFn: () =>
      getProdutoPublico({ data: { slug } }).catch(
        () => PRODUTOS.find((p) => p.slug === slug) ?? null,
      ),
  });

// Textos editáveis das seções; fallback para o conteúdo padrão.
export const conteudoOptions = queryOptions({
  queryKey: ["conteudo"],
  queryFn: () => getConteudoSite().catch(() => CONTEUDO_PADRAO),
});
