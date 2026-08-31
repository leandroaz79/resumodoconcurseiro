export type Categoria = "projetos" | "isoladas";

export type Produto = {
  slug: string;
  nome: string;
  concurso: string;
  categoria: Categoria;
  preco: number;
  precoOriginal?: number;
  capa: string;
  resumo: string;
  materias: string[];
};

export const CATEGORIAS: { id: Categoria; nome: string; descricao: string }[] = [
  {
    id: "projetos",
    nome: "Cursos completos",
    descricao: "Prepare-se para concursos de forma organizada",
  },
  {
    id: "isoladas",
    nome: "Matérias isoladas",
    descricao: "Preparação direcionada para o seu concurso",
  },
];

const MATERIAS_PADRAO = [
  "Língua Portuguesa",
  "Raciocínio Lógico",
  "Direito Constitucional",
  "Direito Administrativo",
  "Direito Penal",
  "Direitos Humanos",
  "Legislação Específica",
  "Informática",
];

export const PRODUTOS: Produto[] = [
  {
    slug: "projeto-guardamunicipaltamandare",
    nome: "Projeto Guarda Civil Municipal Tamandaré/PE",
    concurso: "GCM Tamandaré/PE",
    categoria: "projetos",
    preco: 87,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2026/08/capas-dos-produtos-1080-x-1350-px-800x800.png",
    resumo:
      "Material completo e atualizado conforme o edital da Guarda Civil Municipal de Tamandaré/PE, com todas as disciplinas em PDF direto ao ponto.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-policiapenaldepernambuco",
    nome: "Projeto Polícia Penal de Pernambuco",
    concurso: "Polícia Penal PE",
    categoria: "projetos",
    preco: 120,
    precoOriginal: 159.9,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2026/07/capas-dos-produtos-1080-x-1350-px-800x800.png",
    resumo:
      "Preparação completa para a Polícia Penal de Pernambuco: resumos revisados, esquematizados e alinhados à banca.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-pp-rn",
    nome: "Projeto PP Rio Grande do Norte",
    concurso: "Polícia Penal RN",
    categoria: "projetos",
    preco: 97,
    precoOriginal: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2026/03/capas-dos-produtos-1080-x-1350-px-3-800x800.png",
    resumo:
      "Todo o conteúdo do edital da Polícia Penal do Rio Grande do Norte em material enxuto, para quem tem pouco tempo de estudo.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-gcm-natal",
    nome: "Projeto GCM Natal",
    concurso: "GCM Natal",
    categoria: "projetos",
    preco: 97,
    precoOriginal: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2026/02/capas-dos-produtos-1080-x-1350-px-6-800x800.png",
    resumo:
      "Projeto completo para a Guarda Civil Municipal de Natal, com todas as disciplinas cobradas em edital.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-cabodesantoagostinho",
    nome: "Projeto GCM Cabo de Santo Agostinho",
    concurso: "GCM Cabo de Santo Agostinho",
    categoria: "projetos",
    preco: 97,
    precoOriginal: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2026/01/capas-dos-produtos-1080-x-1350-px-4-800x800.png",
    resumo:
      "Material direcionado ao edital da GCM do Cabo de Santo Agostinho, revisado e atualizado pela equipe RDC.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-policia-militar-de-pernambuco",
    nome: "Projeto Polícia Militar de Pernambuco",
    concurso: "PMPE",
    categoria: "projetos",
    preco: 120,
    precoOriginal: 160,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2025/11/capas-dos-produtos-1080-x-1350-px-2-800x800.png",
    resumo:
      "O projeto mais completo do RDC para a PMPE: teoria resumida, esquemas e revisão de reta final.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-guarda-civil-municipal-recife",
    nome: "Projeto Guarda Civil Municipal Recife",
    concurso: "GCM Recife",
    categoria: "projetos",
    preco: 97,
    precoOriginal: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2025/06/capas-dos-produtos-6.png",
    resumo:
      "Conteúdo completo para a Guarda Civil Municipal do Recife, com legislação municipal específica.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-policia-militar-de-alagoas",
    nome: "Projeto Polícia Militar de Alagoas | PMAL",
    concurso: "PMAL",
    categoria: "projetos",
    preco: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2025/03/capas-dos-produtos-1080-x-1350-px-800x800.png",
    resumo:
      "Preparação direcionada para a Polícia Militar de Alagoas, com material atualizado conforme a banca.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-guarda-civil-municipal-de-campina-grande",
    nome: "Projeto GCM Campina Grande (Edital 2026)",
    concurso: "GCM Campina Grande",
    categoria: "projetos",
    preco: 97,
    precoOriginal: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2025/03/capas-dos-produtos-3.png",
    resumo:
      "Material atualizado para o edital 2026 da Guarda Civil Municipal de Campina Grande.",
    materias: MATERIAS_PADRAO,
  },
  {
    slug: "projeto-policia-penal-da-paraiba",
    nome: "Projeto Polícia Penal da Paraíba | PPPB",
    concurso: "Polícia Penal PB",
    categoria: "projetos",
    preco: 97,
    precoOriginal: 120,
    capa: "https://resumodoconcurseiro.com.br/wp-content/uploads/2025/02/3.png",
    resumo:
      "Todas as disciplinas da Polícia Penal da Paraíba em resumos objetivos, prontos para revisão.",
    materias: MATERIAS_PADRAO,
  },
];

export const DEPOIMENTOS = [
  {
    foto: "https://resumodoconcurseiro.com.br/wp-content/uploads/2024/04/Design-sem-nome-7.png",
    texto:
      "O material conciso e bem elaborado tornou meus estudos mais produtivos, especialmente considerando que sou estudante de mestrado e meu tempo para me dedicar aos concursos é limitado.",
    autor: "Aluno RDC",
  },
  {
    foto: "https://resumodoconcurseiro.com.br/wp-content/uploads/2024/04/Design-sem-nome-8.png",
    texto:
      "Contei com ajuda do material do Resumo do Concurseiro para dar início à minha trajetória de estudos. Bruno, além de produzir excelentes materiais, sempre foi um ótimo conselheiro. Gratidão.",
    autor: "Aluno RDC",
  },
  {
    foto: "https://resumodoconcurseiro.com.br/wp-content/uploads/2024/04/Design-sem-nome-9.png",
    texto:
      "Só agradecer, irmão. Não tinha tempo para assistir às videoaulas e usei seus PDFs como forma principal para tirar dúvidas após as questões. Excelente custo-benefício.",
    autor: "Aluno RDC",
  },
  {
    foto: "https://resumodoconcurseiro.com.br/wp-content/uploads/2024/04/Design-sem-nome-10.png",
    texto:
      "Alcancei nota muito boa na PMPE. Feliz demais com meu resultado. Material direto ao ponto e muito explicado, sem vocês não conseguiria esse resultado de 82/100.",
    autor: "Aprovado PMPE",
  },
  {
    foto: "https://resumodoconcurseiro.com.br/wp-content/uploads/2024/04/Design-sem-nome-11.png",
    texto:
      "Os PDFs eram muito bem explicados e direto ao ponto, era o que eu precisava. Valeu a pena não desistir e hoje ver meu nome na lista dos aprovados.",
    autor: "Aprovado RDC",
  },
  {
    foto: "https://resumodoconcurseiro.com.br/wp-content/uploads/2024/04/Design-sem-nome-12.png",
    texto:
      "Voltei para dizer que deu certo! 48 na objetiva e 39 na redação, total 87. Digo sem medo de errar: aprendi a estudar para concurso com o teu material.",
    autor: "Aprovado RDC",
  },
];

export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5581994075816";
export const MATERIAL_GRATUITO_URL =
  "https://drive.google.com/drive/folders/1ghUvmwUNqHU4DAOc7zP9tNlHcXl8jc6B?usp=drive_link";

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function getProduto(slug: string) {
  return PRODUTOS.find((p) => p.slug === slug);
}
