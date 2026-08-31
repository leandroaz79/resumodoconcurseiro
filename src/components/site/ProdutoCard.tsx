import { Link } from "@tanstack/react-router";
import { formatarPreco, type Produto } from "@/data/produtos";

export function ProdutoCard({ produto }: { produto: Produto }) {
  const desconto = produto.precoOriginal
    ? Math.round((1 - produto.preco / produto.precoOriginal) * 100)
    : null;

  return (
    <Link
      to="/produto/$slug"
      params={{ slug: produto.slug }}
      className="group flex flex-col border border-border bg-surface transition-colors hover:border-primary"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
        <img
          src={produto.capa}
          alt={`Capa do ${produto.nome}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {desconto !== null && (
          <span className="absolute left-0 top-4 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            -{desconto}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {produto.concurso}
        </span>
        <h3 className="text-display text-lg font-semibold leading-tight">{produto.nome}</h3>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          {produto.precoOriginal && (
            <span className="text-sm text-muted-foreground line-through">
              {formatarPreco(produto.precoOriginal)}
            </span>
          )}
          <span className="text-display text-2xl font-bold text-primary">
            {formatarPreco(produto.preco)}
          </span>
        </div>
        <span className="border border-border px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          Ver material
        </span>
      </div>
    </Link>
  );
}
