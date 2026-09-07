import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { criarAdmin, listarAdmins, removerAdmin } from "@/lib/admin.functions";

const inputCls =
  "w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

export function AdminsAdmin() {
  const queryClient = useQueryClient();
  const { data: admins = [], isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: () => listarAdmins(),
  });

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);
  const [salvando, setSalvando] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setMensagem(null);
    try {
      await criarAdmin({ data: { email, senha } });
      setMensagem({ tipo: "ok", texto: `Administrador ${email} cadastrado. Ele já pode entrar em /auth.` });
      setEmail("");
      setSenha("");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro instanceof Error ? erro.message : "Erro ao cadastrar." });
    } finally {
      setSalvando(false);
    }
  }

  async function remover(id: string, emailAdmin: string) {
    if (!window.confirm(`Remover o acesso de administrador de ${emailAdmin}?`)) return;
    setMensagem(null);
    try {
      await removerAdmin({ data: { userId: id } });
      setMensagem({ tipo: "ok", texto: `Acesso de ${emailAdmin} removido.` });
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    } catch (erro) {
      setMensagem({ tipo: "erro", texto: erro instanceof Error ? erro.message : "Erro ao remover." });
    }
  }

  return (
    <div className="max-w-2xl space-y-10">
      <section>
        <h2 className="text-display text-lg font-semibold">Administradores atuais</h2>
        {isLoading ? (
          <p className="mt-4 text-sm text-muted-foreground">Carregando…</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border border-border">
            {admins.map((admin) => (
              <li key={admin.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-sm">{admin.email}</span>
                <button
                  type="button"
                  onClick={() => remover(admin.id, admin.email)}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-destructive"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-display text-lg font-semibold">Cadastrar novo administrador</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A conta é criada já confirmada — a pessoa entra em /auth com o e-mail e a senha definidos aqui.
        </p>
        <form onSubmit={cadastrar} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              E-mail
            </label>
            <input
              type="email"
              required
              className={inputCls}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Senha
            </label>
            <input
              type="password"
              required
              minLength={6}
              className={inputCls}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
            />
          </div>
          {mensagem && (
            <p
              className={
                mensagem.tipo === "ok"
                  ? "border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
                  : "border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              }
            >
              {mensagem.texto}
            </p>
          )}
          <button
            type="submit"
            disabled={salvando}
            className="bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-opacity disabled:opacity-50"
          >
            {salvando ? "Cadastrando…" : "Cadastrar administrador"}
          </button>
        </form>
      </section>
    </div>
  );
}
