import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpenCheck, Download, RefreshCw, Target } from "lucide-react";
import { ProdutoCard } from "@/components/site/ProdutoCard";
import { ElesPassaram } from "@/components/site/ElesPassaram";
import { produtosOptions, conteudoOptions } from "@/lib/queries";
import heroPm from "@/assets/hero-pm.png.asset.json";
import logoAguia from "@/assets/logo-aguia.png.asset.json";
import { DEPOIMENTOS, WHATSAPP_URL } from "@/data/produtos";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(produtosOptions),
      context.queryClient.ensureQueryData(conteudoOptions),
    ]);
  },
  errorComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-24 text-center">
      <h1 className="text-display text-3xl font-bold">Não foi possível carregar a página</h1>
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
      { title: "Resumo do Concurseiro | Resumos em PDF para concursos" },
      {
        name: "description",
        content:
          "Materiais em PDF direto ao ponto para PMPE, GCM, Polícia Penal e outros concursos. Conteúdo revisado, atualizado e feito para quem tem pouco tempo.",
      },
      { property: "og:title", content: "Resumo do Concurseiro | Resumos em PDF para concursos" },
      {
        property: "og:description",
        content:
          "Você não precisa estar pronto. Só precisa começar. Materiais RDC revisados e sempre atualizados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: produtos } = useSuspenseQuery(produtosOptions);
  const { data: c } = useSuspenseQuery(conteudoOptions);
  const destaques = produtos.slice(0, 6);
  const hero = c["hero"] ?? {};
  const beneficios = c["beneficios"] ?? {};
  const destaquesTxt = c["destaques"] ?? {};
  const gratuito = c["material_gratuito"] ?? {};
  const suporte = c["suporte"] ?? {};
  const marquee = c["marquee"] ?? {};
  const links = c["links"] ?? {};
  const whatsapp = links["whatsapp_url"] || WHATSAPP_URL;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroPm.url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,1) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-background/55" aria-hidden />
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="absolute -left-40 top-0 size-[520px] rounded-full bg-primary/20 blur-[140px]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <p className="text-xs uppercase tracking-[0.36em] text-primary">
            {hero["tagline"] ?? "Materiais RDC"}
          </p>
          <div className="mt-6 flex items-center gap-8 lg:gap-14">
            <div>
              <h1 className="max-w-3xl text-display text-5xl font-bold sm:text-7xl">
                {hero["titulo_linha1"] ?? "Você não precisa estar pronto."}
                <br />
                <span className="text-primary">
                  {hero["titulo_linha2"] ?? "Só precisa começar."}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                {hero["subtitulo"] ??
                  "Resumos em PDF, direto ao ponto, para quem estuda com pouco tempo e quer ver o próprio nome na lista de aprovados."}
              </p>
            </div>
            <img
              src={logoAguia.url}
              alt="Emblema Resumo do Concurseiro"
              className="hidden w-40 shrink-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.12)] sm:block md:w-56 lg:w-72"
            />
          </div>
          <Link
            to="/loja"
            className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {hero["cta_texto"] ?? "Comece a estudar agora"}
            <ArrowRight className="size-4" />
          </Link>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            <Link
              to="/loja"
              className="group flex items-start gap-4 border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <BookOpenCheck className="size-6 shrink-0 text-primary" />
              <span>
                <span className="block text-display text-xl font-semibold">
                  Cursos completos
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Prepare-se para concursos de forma organizada.
                </span>
              </span>
            </Link>
            <Link
              to="/loja"
              className="group flex items-start gap-4 border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <Target className="size-6 shrink-0 text-primary" />
              <span>
                <span className="block text-display text-xl font-semibold">
                  Matérias isoladas
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Preparação direcionada para o seu concurso.
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios + contador */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <RefreshCw className="size-6 text-primary" />
              <h2 className="mt-4 text-display text-2xl font-semibold">
                {beneficios["bloco1_titulo"] ?? "Materiais atualizados"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {beneficios["bloco1_texto"] ??
                  "Potencialize seus estudos com materiais revisados e sempre atualizados conforme o edital e a banca."}
              </p>
            </div>
            <div>
              <Download className="size-6 text-primary" />
              <h2 className="mt-4 text-display text-2xl font-semibold">
                {beneficios["bloco2_titulo"] ?? "Download liberado"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {beneficios["bloco2_texto"] ??
                  "Baixe nosso material e estude onde e quando quiser, no celular, tablet ou impresso."}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center border-l-2 border-primary pl-8">
            <span className="text-display text-6xl font-bold leading-none sm:text-7xl">
              {beneficios["contador_valor"] ?? "+10 mil"}
            </span>
            <span className="mt-2 text-sm uppercase tracking-[0.28em] text-muted-foreground">
              {beneficios["contador_label"] ?? "Membros ativos"}
            </span>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-primary">
              {destaquesTxt["kicker"] ?? "Material completo"}
            </p>
            <h2 className="mt-3 text-display text-4xl font-bold">
              {destaquesTxt["titulo"] ?? "Seja membro dos projetos"}
            </h2>
          </div>
          <Link
            to="/loja"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary hover:underline"
          >
            {destaquesTxt["link_texto"] ?? "Ver todos"}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((produto) => (
            <ProdutoCard key={produto.slug} produto={produto} />
          ))}
        </div>
      </section>

      {/* Material gratuito */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14">
          <div>
            <h2 className="text-display text-3xl font-bold">
              {gratuito["titulo"] ?? "Conheça nossos materiais gratuitos"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {gratuito["subtitulo"] ?? "Uma amostra do padrão RDC, sem custo nenhum."}
            </p>
          </div>
          <a
            href={gratuito["url"] || "#"}
            target="_blank"
            rel="noreferrer"
            className="bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {gratuito["botao"] ?? "Material gratuito"}
          </a>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Depoimentos</p>
        <h2 className="mt-3 max-w-2xl text-display text-4xl font-bold">
          O que os nossos alunos estão dizendo
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DEPOIMENTOS.map((dep) => (
            <figure key={dep.foto} className="flex flex-col border border-border bg-surface p-6">
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                “{dep.texto}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={dep.foto}
                  alt=""
                  loading="lazy"
                  className="size-11 rounded-full object-cover"
                />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {dep.autor}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Eles passaram */}
      <section className="overflow-hidden border-y border-border bg-primary py-8">
        <div className="flex w-max marquee-track">
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }).map((_, j) => (
                <span
                  key={j}
                  className="px-8 text-display text-3xl font-bold text-primary-foreground sm:text-4xl"
                >
                  {marquee["texto"] ?? "Eles passaram · O próximo pode ser você"}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <ElesPassaram />

      {/* Suporte */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-display text-4xl font-bold">
          {suporte["titulo"] ?? "Precisa de ajuda?"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          {suporte["texto"] ??
            "Ao encontrar dúvidas em qualquer procedimento do site ou no material, fale diretamente com a nossa equipe pelo WhatsApp."}
        </p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {suporte["botao"] ?? "Falar no WhatsApp"}
        </a>
      </section>
    </div>
  );
}
