import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { brokeredPreviewStorage } from "@/integrations/supabase/previewAuthStorage";

// Projeto Supabase externo (do dono do site). A URL e a chave abaixo sao
// publicaveis (anon/publishable) — podem ficar no codigo.
export const EXTERNAL_SUPABASE_URL = "https://imsgwrczpzkcbfhxenix.supabase.co";
export const EXTERNAL_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltc2d3cmN6cHprY2JmaHhlbml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2NTU5ODgsImV4cCI6MjEwNDIzMTk4OH0.TIGRyi1RofHHDSSJC7RuN_VTM8grF5VE0w0S79NIAxA";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

export function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    // Chaves opacas (sb_) nao sao JWT: enviar apenas apikey, sem Bearer.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function createExternalClient() {
  return createClient<Database>(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_ANON_KEY, {
    global: { fetch: createSupabaseFetch(EXTERNAL_SUPABASE_ANON_KEY) },
    auth: {
      storage: brokeredPreviewStorage(),
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _client: ReturnType<typeof createExternalClient> | undefined;

// Cliente do navegador (login do painel; RLS se aplica).
export const externalSupabase = new Proxy({} as ReturnType<typeof createExternalClient>, {
  get(_, prop, receiver) {
    if (!_client) _client = createExternalClient();
    return Reflect.get(_client, prop, receiver);
  },
});

// Cliente com service role do projeto externo — SOMENTE dentro de handlers
// no servidor (nunca chamar de codigo de navegador).
export function createExternalAdminClient() {
  const serviceKey = process.env["EXTERNAL_SUPABASE_SERVICE_ROLE_KEY"];
  if (!serviceKey) throw new Error("Missing EXTERNAL_SUPABASE_SERVICE_ROLE_KEY");
  return createClient<Database>(EXTERNAL_SUPABASE_URL, serviceKey, {
    global: { fetch: createSupabaseFetch(serviceKey) },
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}
