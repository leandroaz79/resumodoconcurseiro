// Valores padrão das seções do site — usados como fallback e mesclados
// com o conteúdo vindo do banco (tabela site_content).
export type SecaoConteudo = Record<string, string>;

export const CONTEUDO_PADRAO: Record<string, SecaoConteudo> = {
  hero: {
    tagline: "Materiais RDC",
    titulo_linha1: "Você não precisa estar pronto.",
    titulo_linha2: "Só precisa começar.",
    subtitulo:
      "Resumos em PDF, direto ao ponto, para quem estuda com pouco tempo e quer ver o próprio nome na lista de aprovados.",
    cta_texto: "Comece a estudar agora",
  },
  beneficios: {
    bloco1_titulo: "Materiais atualizados",
    bloco1_texto:
      "Potencialize seus estudos com materiais revisados e sempre atualizados conforme o edital e a banca.",
    bloco2_titulo: "Download liberado",
    bloco2_texto:
      "Baixe nosso material e estude onde e quando quiser, no celular, tablet ou impresso.",
    contador_valor: "+10 mil",
    contador_label: "Membros ativos",
  },
  destaques: {
    kicker: "Material completo",
    titulo: "Seja membro dos projetos",
    link_texto: "Ver todos",
  },
  material_gratuito: {
    titulo: "Conheça nossos materiais gratuitos",
    subtitulo: "Uma amostra do padrão RDC, sem custo nenhum.",
    botao: "Material gratuito",
    url: "https://drive.google.com/drive/folders/1ghUvmwUNqHU4DAOc7zP9tNlHcXl8jc6B?usp=drive_link",
  },
  suporte: {
    titulo: "Precisa de ajuda?",
    texto:
      "Ao encontrar dúvidas em qualquer procedimento do site ou no material, fale diretamente com a nossa equipe pelo WhatsApp.",
    botao: "Falar no WhatsApp",
  },
  marquee: {
    texto: "Eles passaram · O próximo pode ser você",
  },
  rodape: {
    descricao:
      "Materiais em PDF direto ao ponto para quem estuda com pouco tempo e quer ver o nome na lista de aprovados.",
    suporte_texto: "Dúvidas sobre o site ou sobre o material? Fale com a gente pelo WhatsApp.",
  },
  links: {
    whatsapp_url: "https://api.whatsapp.com/send?phone=5581994075816",
  },
};

// Rótulos amigáveis das seções e campos, usados no painel.
export const SECOES_META: {
  id: string;
  titulo: string;
  campos: { chave: string; rotulo: string; longo?: boolean }[];
}[] = [
  {
    id: "hero",
    titulo: "Hero (topo da página inicial)",
    campos: [
      { chave: "tagline", rotulo: "Etiqueta pequena" },
      { chave: "titulo_linha1", rotulo: "Título — linha 1" },
      { chave: "titulo_linha2", rotulo: "Título — linha 2 (destacada)" },
      { chave: "subtitulo", rotulo: "Subtítulo", longo: true },
      { chave: "cta_texto", rotulo: "Texto do botão" },
    ],
  },
  {
    id: "beneficios",
    titulo: "Benefícios e contador",
    campos: [
      { chave: "bloco1_titulo", rotulo: "Benefício 1 — título" },
      { chave: "bloco1_texto", rotulo: "Benefício 1 — texto", longo: true },
      { chave: "bloco2_titulo", rotulo: "Benefício 2 — título" },
      { chave: "bloco2_texto", rotulo: "Benefício 2 — texto", longo: true },
      { chave: "contador_valor", rotulo: "Contador — valor" },
      { chave: "contador_label", rotulo: "Contador — legenda" },
    ],
  },
  {
    id: "destaques",
    titulo: "Seção de destaques",
    campos: [
      { chave: "kicker", rotulo: "Etiqueta pequena" },
      { chave: "titulo", rotulo: "Título" },
      { chave: "link_texto", rotulo: "Texto do link" },
    ],
  },
  {
    id: "material_gratuito",
    titulo: "Material gratuito",
    campos: [
      { chave: "titulo", rotulo: "Título" },
      { chave: "subtitulo", rotulo: "Subtítulo" },
      { chave: "botao", rotulo: "Texto do botão" },
      { chave: "url", rotulo: "Link do material" },
    ],
  },
  {
    id: "suporte",
    titulo: "Suporte",
    campos: [
      { chave: "titulo", rotulo: "Título" },
      { chave: "texto", rotulo: "Texto", longo: true },
      { chave: "botao", rotulo: "Texto do botão" },
    ],
  },
  {
    id: "marquee",
    titulo: "Faixa deslizante",
    campos: [{ chave: "texto", rotulo: "Texto da faixa" }],
  },
  {
    id: "rodape",
    titulo: "Rodapé",
    campos: [
      { chave: "descricao", rotulo: "Descrição", longo: true },
      { chave: "suporte_texto", rotulo: "Texto de suporte", longo: true },
    ],
  },
  {
    id: "links",
    titulo: "Contatos",
    campos: [{ chave: "whatsapp_url", rotulo: "Link do WhatsApp" }],
  },
];
