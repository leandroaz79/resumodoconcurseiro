import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_URL } from "@/data/produtos";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/loja", label: "Materiais" },
] as const;

export function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center" onClick={() => setAberto(false)}>
          <img
            src={logoRdc.url}
            alt="Resumo do Concurseiro"
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Falar com a equipe
          </a>
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setAberto((v) => !v)}
          className="md:hidden"
        >
          {aberto ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {aberto && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setAberto(false)}
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-primary px-5 py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-primary-foreground"
            >
              Falar com a equipe
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
