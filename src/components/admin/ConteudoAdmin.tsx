import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CONTEUDO_PADRAO, SECOES_META } from "@/data/conteudo";
import { getConteudoSite } from "@/lib/site.functions";
import { salvarConteudo } from "@/lib/admin.functions";

export function ConteudoAdmin() {
  const queryClient = useQueryClient();
  const [rascunho, setRascunho] = useState<Record<string, Record<string, string>>>({});
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["conteudo"],
    queryFn: getConteudoSite,
  });

  if (isLoading) return <p className="py-16 text-center text-muted-foreground">Carregando...</p>;
  if (error)
    return (
      <p className="py-16 text-center text-red-400">
        {error instanceof Error ? error.message : "Erro ao carregar textos."}
      </p>
    );

  const conteudo = data ?? CONTEUDO_PADRAO;

  function valor(secao: string, chave: string, padrao: string): string {
    const editado = rascunho[secao]?.[chave];
    if (editado !== undefined) return editado;
    return conteudo[secao]?.[chave] ?? padrao;
  }

  function alterar(secao: string, chave: string, texto: string) {
    setRascunho((r) => ({ ...r, [secao]: { ...(r[secao] ?? {}), [chave]: texto } }));
  }

  async function salvarSecao(secao: string) {
    const campos = rascunho[secao];
    if (!campos) return;
    setSalvando(true);
    setMensagem("");
    try {
      // envia a seção completa (campos editados + atuais)
      const completos: Record<string, string> = {};
      const meta = SECOES_META.find((s) => s.id === secao);
      for (const c of meta?.campos ?? []) {
        const editado = campos[c.chave];
        const original = conteudo[secao]?.[c.chave];
        if (editado !== undefined) {
          if (editado !== original) completos[c.chave] = editado;
        } else if (original !== undefined && original !== "") {
          // campo intacto, mas faz parte da seção — reenvia o valor atual
          completos[c.chave] = original;
        }
      }
      await salvarConteudo({ data: { secao, conteudo: completos } });
      setRascunho((r) => ({ ...r, [secao]: {} }));
      await queryClient.invalidateQueries({ queryKey: ["conteudo"] });
      setMensagem("Textos salvos! O site já está atualizado.");
    } catch (err) {
      setMensagem(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="space-y-8">
      {mensagem && <p className="border border-border bg-surface p-3 text-sm">{mensagem}</p>}

      {SECOES_META.map((secao) => {
        const editada = Object.keys(rascunho[secao.id] ?? {}).length > 0;
        return (
          <section key={secao.id} className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-display text-lg font-semibold">{secao.titulo}</h2>
              {editada && (
                <span className="text-xs uppercase tracking-wider text-amber-400">
                  alterado
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-4">
              {secao.campos.map((c) => (
                <label key={c.chave} className="flex flex-col gap-1.5">
                  <span className="text-sm text-muted-foreground">{c.rotulo}</span>
                  {c.longo ? (
                    <textarea
                      rows={3}
                      className={inputCls}
                      value={valor(secao.id, c.chave, "")}
                      onChange={(e) => alterar(secao.id, c.chave, e.target.value)}
                    />
                  ) : (
                    <input
                      className={inputCls}
                      value={valor(secao.id, c.chave, "")}
                      onChange={(e) => alterar(secao.id, c.chave, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={() => salvarSecao(secao.id)}
              disabled={salvando || !editada}
              className="mt-5 bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Salvar esta seção
            </button>
          </section>
        );
      })}
    </div>
  );
}

const inputCls =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";
