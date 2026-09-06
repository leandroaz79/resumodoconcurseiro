import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import logoRdc from "@/assets/logo-rdc.png.asset.json";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) throw redirect({ to: "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Entrar no painel | Resumo do Concurseiro" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setAviso("");
    setCarregando(true);
    try {
      if (modo === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        window.location.href = "/admin";
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password: senha });
        if (error) throw error;
        if (data.session) {
          window.location.href = "/admin";
        } else {
          setAviso(
            "Conta criada! Confirme o acesso pelo e-mail que enviamos e depois entre aqui.",
          );
        }
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível continuar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm border border-border bg-surface p-8">
        <img src={logoRdc.url} alt="Resumo do Concurseiro" className="h-10 w-auto" />
        <h1 className="mt-6 text-display text-2xl font-bold">
          {modo === "entrar" ? "Painel de administração" : "Criar acesso"}
        </h1>

        <form onSubmit={enviar} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-muted-foreground">Senha</span>
            <input
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>

          {erro && <p className="text-sm text-red-400">{erro}</p>}
          {aviso && <p className="text-sm text-green-400">{aviso}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {carregando ? "Aguarde..." : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setModo(modo === "entrar" ? "criar" : "entrar");
            setErro("");
            setAviso("");
          }}
          className="mt-6 text-xs text-muted-foreground underline hover:text-foreground"
        >
          {modo === "entrar" ? "Não tem acesso? Criar conta" : "Já tem conta? Entrar"}
        </button>
      </div>
    </div>
  );
}
