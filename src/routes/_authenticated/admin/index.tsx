import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { CursosAdmin } from "@/components/admin/CursosAdmin";
import { ConteudoAdmin } from "@/components/admin/ConteudoAdmin";
import { externalSupabase as supabase } from "@/lib/external-supabase";

export const Route = createFileRoute("/_authenticated/admin/")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Painel | Resumo do Concurseiro" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [aba, setAba] = useState<"cursos" | "conteudo">("cursos");

  async function sair() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Ver o site
          </Link>
          <h1 className="mt-2 text-display text-3xl font-bold">Painel RDC</h1>
        </div>
        <button
          type="button"
          onClick={sair}
          className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Sair
        </button>
      </div>

      <div className="mt-8 flex gap-2 border-b border-border pb-4">
        {(
          [
            { id: "cursos" as const, nome: "Cursos" },
            { id: "conteudo" as const, nome: "Textos do site" },
          ]
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAba(item.id)}
            className={
              aba === item.id
                ? "bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground"
                : "border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {item.nome}
          </button>
        ))}
      </div>

      <div className="mt-8">{aba === "cursos" ? <CursosAdmin /> : <ConteudoAdmin />}</div>
    </div>
  );
}
