import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { excluirProduto, listarProdutosAdmin, salvarProduto, uploadCapa } from "@/lib/admin.functions";
import { formatarPreco } from "@/data/produtos";

type ProdutoAdmin = {
  id: string;
  slug: string;
  nome: string;
  concurso: string;
  categoria: string;
  preco: number;
  preco_original: number | null;
  resumo: string;
  descricao: string;
  materias: string[];
  capa_url: string;
  checkout_url: string;
  destaque: boolean;
  ordem: number;
  publicado: boolean;
};

const vazio = (): Omit<ProdutoAdmin, "id"> => ({
  slug: "",
  nome: "",
  concurso: "",
  categoria: "projetos",
  preco: 0,
  preco_original: null,
  resumo: "",
  descricao: "",
  materias: [],
  capa_url: "",
  checkout_url: "",
  destaque: false,
  ordem: 0,
  publicado: true,
});

export function CursosAdmin() {
  const queryClient = useQueryClient();
  const [selecionado, setSelecionado] = useState<ProdutoAdmin | null>(null);
  const [novo, setNovo] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-produtos"],
    queryFn: listarProdutosAdmin,
  });

  const form = novo || !!selecionado;
  const atual = selecionado;

  function fecharForm() {
    setSelecionado(null);
    setNovo(false);
    setMensagem("");
  }

  function campo<K extends keyof ProdutoAdmin>(chave: K, valor: ProdutoAdmin[K]) {
    if (selecionado) {
      setSelecionado({ ...selecionado, [chave]: valor });
    }
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!selecionado) return;
    setSalvando(true);
    setMensagem("");
    try {
      await salvarProduto({
        data: {
          id: selecionado.id || undefined,
          slug: selecionado.slug,
          nome: selecionado.nome,
          concurso: selecionado.concurso,
          categoria: selecionado.categoria === "isoladas" ? "isoladas" : "projetos",
          preco: Number(selecionado.preco) || 0,
          precoOriginal:
            selecionado.preco_original != null && Number(selecionado.preco_original) > 0
              ? Number(selecionado.preco_original)
              : null,
          resumo: selecionado.resumo,
          descricao: selecionado.descricao,
          materias: selecionado.materias,
          capaUrl: selecionado.capa_url,
          checkoutUrl: selecionado.checkout_url,
          destaque: selecionado.destaque,
          ordem: Number(selecionado.ordem) || 0,
          publicado: selecionado.publicado,
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-produtos"] });
      await queryClient.invalidateQueries({ queryKey: ["produtos"] });
      setMensagem("Curso salvo com sucesso!");
    } catch (err) {
      setMensagem(err instanceof Error ? err.message : "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluir(p: ProdutoAdmin) {
    if (!window.confirm(`Excluir "${p.nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await excluirProduto({ data: { id: p.id } });
      await queryClient.invalidateQueries({ queryKey: ["admin-produtos"] });
      await queryClient.invalidateQueries({ queryKey: ["produtos"] });
      if (selecionado?.id === p.id) fecharForm();
 } catch (err) {
      setMensagem(err instanceof Error ? err.message : "Erro ao excluir.");
    }
  }

  async function carregarImagem(file: File) {
    if (!selecionado) return;
    if (file.size > 4 * 1024 * 1024) {
      setMensagem("Imagem maior que 4MB. Envie um arquivo menor.");
      return;
    }
    setSalvando(true);
    setMensagem("");
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const { url } = await uploadCapa({
        data: {
          filename: file.name,
          base64,
          contentType: file.type || "image/webp",
        },
      });
      setSelecionado({ ...selecionado, capa_url: url });
      setMensagem("Imagem carregada. Clique em Salvar para confirmar.");
    } catch (err) {
      setMensagem(err instanceof Error ? err.message : "Erro ao enviar imagem.");
    } finally {
      setSalvando(false);
    }
  }

  if (isLoading) return <p className="py-16 text-center text-muted-foreground">Carregando...</p>;
  if (error)
    return (
      <p className="py-16 text-center text-red-400">
        {error instanceof Error ? error.message : "Erro ao carregar cursos."}
      </p>
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data?.length ?? 0} cursos cadastrados</p>
        <button
          type="button"
          onClick={() => {
            fecharForm();
            setNovo(true);
          }}
          className="bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + Novo curso
        </button>
      </div>

      {mensagem && <p className="mt-4 border border-border bg-surface p-3 text-sm">{mensagem}</p>}

      {/* Lista */}
      <div className="mt-6 divide-y divide-border border border-border bg-surface">
        {(data ?? []).map((p: ProdutoAdmin) => (
          <div key={p.id} className="flex flex-wrap items-center gap-4 p-4">
            <img src={p.capa_url} alt="" className="size-12 shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.nome}</p>
              <p className="text-xs text-muted-foreground">
                {p.concurso} · {formatarPreco(Number(p.preco))} · ordem {p.ordem}
              </p>
            </div>
            {!p.publicado && (
              <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                Oculto
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                fecharForm();
                setSelecionado(p);
              }}
              className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => excluir(p)}
              className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-red-500 hover:text-red-400"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      {/* Formulário */}
      {form && atual && (
        <form onSubmit={enviar} className="mt-8 border border-border bg-surface p-6">
          <h2 className="text-display text-xl font-semibold">
            {novo ? "Novo curso" : "Editar curso"}
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Campo rotulo="Nome do curso">
              <input className={inputCls} required value={atual.nome}
                onChange={(e) => campo("nome", e.target.value)} />
            </Campo>
            <Campo rotulo="Concurso (etiqueta curta)">
              <input className={inputCls} required value={atual.concurso}
                onChange={(e) => campo("concurso", e.target.value)} />
            </Campo>
            <Campo rotulo="Endereço (slug) — letras minúsculas e hífens">
              <input className={inputCls} required pattern="[a-z0-9-]+" value={atual.slug}
                onChange={(e) => campo("slug", e.target.value)} />
            </Campo>
            <Campo rotulo="Categoria">
              <select className={inputCls} value={atual.categoria}
                onChange={(e) => campo("categoria", e.target.value)}>
                <option value="projetos">Cursos completos</option>
                <option value="isoladas">Matérias isoladas</option>
              </select>
            </Campo>
            <Campo rotulo="Preço (R$)">
              <input type="number" step="0.01" min="0" className={inputCls} required
                value={atual.preco} onChange={(e) => campo("preco", Number(e.target.value))} />
            </Campo>
            <Campo rotulo="Preço antigo (opcional, para mostrar desconto)">
              <input type="number" step="0.01" min="0" className={inputCls}
                value={atual.preco_original ?? ""}
                onChange={(e) =>
                  campo("preco_original", e.target.value === "" ? null : Number(e.target.value))
                } />
            </Campo>
            <Campo rotulo="Ordem de exibição (menor primeiro)">
              <input type="number" min="0" className={inputCls} value={atual.ordem}
                onChange={(e) => campo("ordem", Number(e.target.value))} />
            </Campo>
            <Campo rotulo="Link do checkout (deixe vazio por enquanto)">
              <input className={inputCls} value={atual.checkout_url}
                onChange={(e) => campo("checkout_url", e.target.value)} />
            </Campo>
          </div>

          <div className="mt-5 grid gap-5">
            <Campo rotulo="Resumo (aparece nos cards e na página do curso)">
              <textarea rows={2} className={inputCls} value={atual.resumo}
                onChange={(e) => campo("resumo", e.target.value)} />
            </Campo>
            <Campo rotulo="Descrição completa (aparece na página do curso)">
              <textarea rows={5} className={inputCls} value={atual.descricao}
                onChange={(e) => campo("descricao", e.target.value)} />
            </Campo>
            <Campo rotulo="Matérias incluídas (uma por linha)">
              <textarea
                rows={6}
                className={inputCls}
                value={atual.materias.join("\n")}
                onChange={(e) => campo("materias", e.target.value.split("\n").filter(Boolean))}
              />
            </Campo>

            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Capa do curso</p>
                <div className="mt-2 flex items-center gap-4">
                  {atual.capa_url && (
                    <img src={atual.capa_url} alt="" className="size-20 border border-border object-cover" />
                  )}
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) carregarImagem(f);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary"
                    >
                      Enviar imagem
                    </button>
                    <input
                      type="text"
                      placeholder="ou cole um endereço de imagem"
                      className={inputCls + " mt-2 w-64"}
                      value={atual.capa_url}
                      onChange={(e) => campo("capa_url", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={atual.publicado}
                  onChange={(e) => campo("publicado", e.target.checked)} />
                Publicado no site
              </label>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="submit"
              disabled={salvando}
              className="bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={fecharForm}
              className="border border-border px-6 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

function Campo({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-muted-foreground">{rotulo}</span>
      {children}
    </label>
  );
}
