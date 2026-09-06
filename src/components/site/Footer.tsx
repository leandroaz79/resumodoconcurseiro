import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { conteudoOptions } from "@/lib/queries";
import { CONTEUDO_PADRAO } from "@/data/conteudo";
import { MATERIAL_GRATUITO_URL, WHATSAPP_URL } from "@/data/produtos";

export function Footer() {
  // Rodapé é renderizado em todas as páginas (sem loader): consulta no cliente
  // com o conteúdo padrão como valor inicial.
  const { data: c } = useQuery({ ...conteudoOptions, initialData: CONTEUDO_PADRAO });
  const rodape = c["rodape"] ?? {};
  const gratuito = c["material_gratuito"] ?? {};
  const links = c["links"] ?? {};
  const whatsapp = links["whatsapp_url"] || WHATSAPP_URL;
  const urlGratuito = gratuito["url"] || MATERIAL_GRATUITO_URL;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="text-display text-xl font-semibold">Resumo do Concurseiro</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {rodape["descricao"] ??
              "Materiais em PDF direto ao ponto para quem estuda com pouco tempo e quer ver o nome na lista de aprovados."}
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
            <a href={urlGratuito} target="_blank" rel="noreferrer" className="hover:text-primary">
              Material gratuito
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Suporte
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {rodape["suporte_texto"] ??
              "Dúvidas sobre o site ou sobre o material? Fale com a gente pelo WhatsApp."}
          </p>
          <a
            href={whatsapp}
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
