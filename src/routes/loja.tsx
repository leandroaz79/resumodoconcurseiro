import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ProdutoCard } from "@/components/site/ProdutoCard";
import { CATEGORIAS, PRODUTOS, type Categoria } from "@/data/produtos";

export const Route = createFileRoute("/loja")({
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
    ],
  }),
  component: Loja,
});

type Filtro = "todos" | Categoria;

function Loja() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const lista = filtro === "todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoria === filtro);

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
