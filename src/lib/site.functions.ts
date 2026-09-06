import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { CONTEUDO_PADRAO, type SecaoConteudo } from "@/data/conteudo";
import type { Produto } from "@/data/produtos";

function clientePublico() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { persistSession: false, autoRefreshToken: false, storage: undefined } },
  );
}

type ProdutoRow = Database["public"]["Tables"]["produtos"]["Row"];

export function paraProduto(row: ProdutoRow): Produto {
  return {
    slug: row.slug,
    nome: row.nome,
    concurso: row.concurso,
    categoria: row.categoria as Produto["categoria"],
    preco: Number(row.preco),
    precoOriginal: row.preco_original != null ? Number(row.preco_original) : undefined,
    capa: row.capa_url,
    resumo: row.resumo,
    descricao: row.descricao || undefined,
    materias: row.materias ?? [],
    checkoutUrl: row.checkout_url || undefined,
    destaque: row.destaque,
    ordem: row.ordem,
  };
}

const COLUNAS =
  "slug, nome, concurso, categoria, preco, preco_original, resumo, descricao, materias, capa_url, checkout_url, destaque, ordem";

export const getProdutosPublicos = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = clientePublico();
  const { data, error } = await supabase
    .from("produtos")
    .select(COLUNAS)
    .eq("publicado", true)
    .order("ordem", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => paraProduto(row as ProdutoRow));
});

export const getProdutoPublico = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const supabase = clientePublico();
    const { data: row, error } = await supabase
      .from("produtos")
      .select(
        "slug, nome, concurso, categoria, preco, preco_original, resumo, descricao, materias, capa_url, checkout_url, destaque, ordem",
      )
      .eq("slug", data.slug)
      .eq("publicado", true)
      .maybeSingle();
    if (error) throw error;
    return row ? paraProduto(row) : null;
  });

export type ConteudoSite = Record<string, SecaoConteudo>;

export const getConteudoSite = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = clientePublico();
  const { data, error } = await supabase
    .from("site_content")
    .select("secao, conteudo");
  if (error) throw error;
  const conteudo: ConteudoSite = { ...CONTEUDO_PADRAO };
  for (const row of data ?? []) {
    conteudo[row.secao] = {
      ...(CONTEUDO_PADRAO[row.secao] ?? {}),
      ...(row.conteudo as SecaoConteudo | null),
    };
  }
  return conteudo;
});
