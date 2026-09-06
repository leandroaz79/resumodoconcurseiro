import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Download, FileText, RefreshCw } from "lucide-react";
import { ProdutoCard } from "@/components/site/ProdutoCard";
import { produtosOptions, produtoOptions } from "@/lib/queries";
import { formatarPreco, WHATSAPP_URL } from "@/data/produtos";

export const Route = createFileRoute("/produto/$slug")({
  loader: async ({ params, context }) => {
    const produto = await context.queryClient.ensureQueryData(produtoOptions(params.slug));
    if (!produto) throw notFound();
    return { produto };
  },
  errorComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-24 text-center">
      <h1 className="text-display text-3xl font-bold">Não foi possível carregar o material</h1>
      <p className="mt-4 text-muted-foreground">Tente recarregar em alguns instantes.</p>
      <Link to="/loja" className="mt-6 inline-block text-primary underline">
        Voltar à loja
      </Link>
    </div>
  ),
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
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProdutoPage,
});

function ProdutoPage() {
  const { produto } = Route.useLoaderData();
  const { data: produtos } = useSuspenseQuery(produtosOptions);
  const relacionados = produtos.filter((p) => p.slug !== produto.slug).slice(0, 3);
  const whatsapp = WHATSAPP_URL;

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
        <div className="self-start border border-border bg-surface">
          <img
            src={produto.capa}
            alt={`Capa do ${produto.nome}`}
            className="h-auto w-full"
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
            {produto.checkoutUrl ? (
              <a
                href={produto.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Comprar agora
              </a>
            ) : (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Comprar agora
              </a>
            )}
            <a
              href={whatsapp}
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

          {produto.descricao && (
            <div className="mt-10">
              <h2 className="text-display text-2xl font-semibold">Sobre o material</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {produto.descricao}
              </p>
            </div>
          )}
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
