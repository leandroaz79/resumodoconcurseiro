import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireExternalAuth } from "./external-auth";
import { createExternalAdminClient } from "./external-supabase";
import type { Database } from "@/integrations/supabase/types";


type ContextoSupabase = { from: (table: string) => any };

async function exigirAdmin(userId: string, supabase: ContextoSupabase) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error || !data) throw new Error("Acesso restrito a administradores.");
}

type Contexto = { supabase: any };

const produtoSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "Use apenas letras minúsculas, números e hífens"),
  nome: z.string().min(1).max(200),
  concurso: z.string().min(1).max(200),
  categoria: z.enum(["projetos", "isoladas"]),
  preco: z.number().min(0),
  precoOriginal: z.number().min(0).nullable(),
  resumo: z.string().max(1000),
  descricao: z.string().max(10000),
  materias: z.array(z.string().max(120)).max(60),
  capaUrl: z.string().max(2000),
  checkoutUrl: z.string().max(2000),
  destaque: z.boolean(),
  ordem: z.number().int().min(0).max(9999),
  publicado: z.boolean(),
});

export const salvarProduto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => produtoSchema.parse(d))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context.userId, context.supabase);
    const valores = {
      slug: data.slug,
      nome: data.nome,
      concurso: data.concurso,
      categoria: data.categoria,
      preco: data.preco,
      preco_original: data.precoOriginal,
      resumo: data.resumo,
      descricao: data.descricao,
      materias: data.materias,
      capa_url: data.capaUrl,
      checkout_url: data.checkoutUrl,
      destaque: data.destaque,
      ordem: data.ordem,
      publicado: data.publicado,
    };
    const { error } = data.id
      ? await context.supabase.from("produtos").update(valores).eq("id", data.id)
      : await context.supabase.from("produtos").insert(valores);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const excluirProduto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await exigirAdmin(context.userId, context.supabase);
    const { error } = await context.supabase.from("produtos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listarProdutosAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await exigirAdmin(context.userId, context.supabase);
    const { data, error } = await context.supabase
      .from("produtos")
      .select("*")
      .order("ordem", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const salvarConteudo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        secao: z.string().min(1).max(60),
        conteudo: z.record(z.string(), z.string().max(10000)),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await exigirAdmin(context.userId, context.supabase);
    const { error } = await (context.supabase as any)
      .from("site_content")
      .upsert({ secao: data.secao, conteudo: data.conteudo }, { onConflict: "secao" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const uploadCapa = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        filename: z.string().min(1).max(200),
        base64: z.string().max(8_000_000),
        contentType: z.string().regex(/^image\//),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await exigirAdmin(context.userId, context.supabase);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const buffer = Buffer.from(data.base64, "base64");
    if (buffer.length > 4 * 1024 * 1024) throw new Error("Imagem maior que 4MB.");
    const ext = data.filename.includes(".")
      ? data.filename.split(".").pop()!.toLowerCase().replace(/[^a-z0-9]/g, "")
      : "webp";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext || "webp"}`;
    const { error } = await supabaseAdmin.storage
      .from("capas")
      .upload(path, buffer, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    // Bucket privado: as imagens são servidas pela rota interna /api/public/capas
    return { url: `/api/public/capas/${path}` };
  });
