import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProdutoCard } from "@/components/site/ProdutoCard";
import { produtosOptions } from "@/lib/queries";
import { CATEGORIAS, type Categoria } from "@/data/produtos";

export const Route = createFileRoute("/loja")({
  loader: ({ context }) => context.queryClient.ensureQueryData(produtosOptions),
  errorComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-24 text-center">
      <h1 className="text-display text-3xl font-bold">Não foi possível carregar a loja</h1>
      <p className="mt-4 text-muted-foreground">Tente recarregar em alguns instantes.</p>
      <Link to="/" className="mt-6 inline-block text-primary underline">
        Voltar ao início
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-24 text-center">
      <h1 className="text-display text-3xl font-bold">Página não encontrada</h1>
      <Link to="/" className="mt-6 inline-block text-primary underline">
        Voltar ao início
      </Link>
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Materiais para concursos | Resumo do Concurseiro" },
      {
        name: "description",
        content:
          "Projetos completos e matérias isoladas em PDF para PMPE, GCM Recife, Polícia Penal e outros concursos. Material revisado e sempre atualizado.",
      },
      { property: "og:title", content: "Materiais para concursos | Resumo do Concurseiro" },
      {
        property: "og:description",
        content:
          "Projetos completos e matérias isoladas em PDF, direto ao ponto, para você estudar onde e quando quiser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Loja,
});

type Filtro = "todos" | Categoria;

function Loja() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const { data: produtos } = useSuspenseQuery(produtosOptions);
  const lista =
    filtro === "todos" ? produtos : produtos.filter((p) => p.categoria === filtro);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-xs uppercase tracking-[0.32em] text-primary">Loja RDC</p>
      <h1 className="mt-4 text-display text-4xl font-bold sm:text-6xl">Todos os materiais</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Escolha o projeto do seu concurso. Todo material é enviado em PDF, revisado conforme
        o edital e com acesso imediato após a compra.
      </p>

      <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-4">
        {[{ id: "todos" as const, nome: "Todos" }, ...CATEGORIAS].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFiltro(cat.id)}
            className={
              filtro === cat.id
                ? "bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
                : "border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {cat.nome}
          </button>
        ))}
      </div>

      {lista.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">
          Nenhum material nesta categoria por enquanto. Novos projetos em breve.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((produto) => (
            <ProdutoCard key={produto.slug} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
