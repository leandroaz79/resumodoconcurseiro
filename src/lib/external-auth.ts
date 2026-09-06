import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  EXTERNAL_SUPABASE_URL,
  EXTERNAL_SUPABASE_ANON_KEY,
  externalSupabase,
  createSupabaseFetch,
} from "./external-supabase";

// Middleware de servidor: valida o token do projeto EXTERNO (RLS do usuário).
export const requireExternalAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getRequest();
    if (!request?.headers) throw new Error("Unauthorized: No request headers available");
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Bearer token required");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) throw new Error("Unauthorized: No token provided");

    const supabase = createClient<Database>(
      EXTERNAL_SUPABASE_URL,
      EXTERNAL_SUPABASE_ANON_KEY,
      {
        global: {
          fetch: createSupabaseFetch(EXTERNAL_SUPABASE_ANON_KEY),
          headers: { Authorization: `Bearer ${token}` },
        },
        auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      },
    );

    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims?.sub) throw new Error("Unauthorized: Invalid token");

    return next({
      context: {
        supabase,
        userId: data.claims.sub,
        claims: data.claims,
      },
    });
  },
);

// Middleware de navegador: anexa o token do projeto externo às server functions.
export const attachExternalAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { data } = await externalSupabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
