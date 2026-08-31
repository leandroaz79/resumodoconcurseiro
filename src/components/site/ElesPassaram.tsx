import { APROVADOS } from "@/data/aprovados";

export function ElesPassaram() {
  return (
    <section className="border-b border-border bg-background py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-display text-2xl font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-3xl">
            Eles passaram...
          </p>
          <h2 className="mt-2 text-display text-4xl font-bold uppercase text-primary sm:text-5xl">
            “O próximo pode ser você”
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quem já aplicou <span className="font-bold text-foreground">RDC</span> teve esse
            resultado
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {APROVADOS.map((a) => (
            <li
              key={a.nome + a.foto}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface p-2 transition-colors hover:border-primary"
            >
              <img
                src={a.foto}
                alt={`${a.nome} — ${a.aprovacao}`}
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover"
              />
              <div className="flex flex-1 items-center justify-center px-1 py-3 text-center">
                <p className="text-[11px] font-bold uppercase leading-snug tracking-wide">
                  <span className="text-foreground">{a.nome}</span>
                  <span className="text-muted-foreground">, {a.aprovacao}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-center text-display text-2xl font-bold uppercase leading-tight sm:text-4xl">
          Somos{" "}
          <span className="border-b-4 border-primary bg-primary px-2 text-primary-foreground">
            mais de 700 aprovados
          </span>{" "}
          em apenas dois anos de RDC
        </p>
      </div>
    </section>
  );
}
