import { Link } from "@tanstack/react-router";
import { MATERIAL_GRATUITO_URL, WHATSAPP_URL } from "@/data/produtos";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="text-display text-xl font-semibold">Resumo do Concurseiro</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Materiais em PDF direto ao ponto para quem estuda com pouco tempo e quer ver o
            nome na lista de aprovados.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Navegação
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-primary">
              Início
            </Link>
            <Link to="/loja" className="hover:text-primary">
              Materiais
            </Link>
            <a href={MATERIAL_GRATUITO_URL} target="_blank" rel="noreferrer" className="hover:text-primary">
              Material gratuito
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Suporte
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Dúvidas sobre o site ou sobre o material? Fale com a gente pelo WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Resumo do Concurseiro. Todos os direitos reservados.
      </div>
    </footer>
  );
}
