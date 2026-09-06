import { createFileRoute } from "@tanstack/react-router";
import { createExternalAdminClient } from "@/lib/external-supabase";

// Serve imagens do bucket privado "capas" pela rota /api/public/capas/<arquivo>.
export const Route = createFileRoute("/api/public/capas/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const caminho = params["_splat"] ?? "";
        if (!caminho || caminho.includes("..") || caminho.startsWith("/")) {
          return new Response("Caminho inválido", { status: 400 });
        }
        const supabaseAdmin = createExternalAdminClient();
        const { data, error } = await supabaseAdmin.storage.from("capas").download(caminho);
        if (error || !data) {
          return new Response("Imagem não encontrada", { status: 404 });
        }
        const ext = caminho.split(".").pop()?.toLowerCase() ?? "";
        const tipos: Record<string, string> = {
          webp: "image/webp",
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          gif: "image/gif",
        };
        return new Response(data, {
          headers: {
            "Content-Type": tipos[ext] ?? "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
