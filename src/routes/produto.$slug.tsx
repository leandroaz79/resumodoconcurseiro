import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Download, FileText, RefreshCw } from "lucide-react";
import { ProdutoCard } from "@/components/site/ProdutoCard";
import {
  formatarPreco,
  getProduto,
  PRODUTOS,
  WHATSAPP_URL,
} from "@/data/produtos";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const produto = getProduto(params.slug);
    if (!produto) throw notFound();
    return { produto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Material não encontrado | RDC" }, { name: "robots", content: "noindex" }],
      };
    }
    const { produto } = loaderData;
    return {
      meta: [
        { title: `${produto.nome} | Resumo do Concurseiro` },
        { name: "description", content: produto.resumo },
        { property: "og:title", content: `${produto.nome} | Resumo do Concurseiro` },
        { property: "og:description", content: produto.resumo },
        { property: "og:image", content: produto.capa },
        { name: "twitter:image", content: produto.capa },
      ],
    };
  },
  component: ProdutoPage,
});

function ProdutoPage() {
  const { produto } = Route.useLoaderData();
  const relacionados = PRODUTOS.filter((p) => p.slug !== produto.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <nav className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/loja" className="hover:text-primary">
          Materiais
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{produto.concurso}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="border border-border bg-surface">
          <img
            src={produto.capa}
            alt={`Capa do ${produto.nome}`}
            className="aspect-4/5 w-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            {produto.concurso}
          </span>
          <h1 className="mt-4 text-display text-4xl font-bold sm:text-5xl">{produto.nome}</h1>
          <p className="mt-5 max-w-xl text-muted-foreground">{produto.resumo}</p>

          <div className="mt-8 flex items-baseline gap-3">
            {produto.precoOriginal && (
              <span className="text-lg text-muted-foreground line-through">
                {formatarPreco(produto.precoOriginal)}
              </span>
            )}
            <span className="text-display text-5xl font-bold text-primary">
              {formatarPreco(produto.preco)}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Pagamento único, acesso imediato ao material em PDF.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Comprar agora
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-8 py-4 text-sm font-bold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
            >
              Tirar dúvidas
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icone: FileText, texto: "Resumos em PDF direto ao ponto" },
              { icone: RefreshCw, texto: "Atualizações conforme o edital" },
              { icone: Download, texto: "Download para estudar offline" },
            ].map((item) => (
              <div key={item.texto} className="border border-border bg-surface p-4">
                <item.icone className="size-5 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">{item.texto}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-display text-2xl font-semibold">O que está incluído</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {produto.materias.map((materia) => (
                <li key={materia} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 shrink-0 text-primary" />
                  {materia}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="text-display text-3xl font-bold">Outros projetos RDC</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relacionados.map((p) => (
            <ProdutoCard key={p.slug} produto={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
