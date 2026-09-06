import capa1 from "@/assets/capas/capa-projeto-guardamunicipaltamandare.webp.asset.json";
import capa2 from "@/assets/capas/capa-projeto-policiapenaldepernambuco.webp.asset.json";
import capa3 from "@/assets/capas/capa-projeto-pp-rn.webp.asset.json";
import capa4 from "@/assets/capas/capa-projeto-gcm-natal.webp.asset.json";
import capa5 from "@/assets/capas/capa-projeto-cabodesantoagostinho.webp.asset.json";
import capa6 from "@/assets/capas/capa-projeto-policia-militar-de-pernambuco.webp.asset.json";
import capa7 from "@/assets/capas/capa-projeto-guarda-civil-municipal-recife.webp.asset.json";
import capa8 from "@/assets/capas/capa-projeto-policia-militar-de-alagoas.webp.asset.json";
import capa9 from "@/assets/capas/capa-projeto-guarda-civil-municipal-de-campina-grande.webp.asset.json";
import capa10 from "@/assets/capas/capa-projeto-policia-penal-da-paraiba.webp.asset.json";
import dep1 from "@/assets/depoimentos/depoimento-01.webp.asset.json";
import dep2 from "@/assets/depoimentos/depoimento-02.webp.asset.json";
import dep3 from "@/assets/depoimentos/depoimento-03.webp.asset.json";
import dep4 from "@/assets/depoimentos/depoimento-04.webp.asset.json";
import dep5 from "@/assets/depoimentos/depoimento-05.webp.asset.json";
import dep6 from "@/assets/depoimentos/depoimento-06.webp.asset.json";

export type Categoria = "projetos" | "isoladas";

export type Produto = {
  slug: string;
  nome: string;
  concurso: string;
  categoria: Categoria;
  preco: number;
  precoOriginal?: number | undefined;
  capa: string;
  resumo: string;
  descricao?: string | undefined;
  materias: string[];
  checkoutUrl?: string | undefined;
  destaque?: boolean | undefined;
  ordem?: number | undefined;
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
    capa: capa1.url,
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
    capa: capa2.url,
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
    capa: capa3.url,
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
    capa: capa4.url,
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
    capa: capa5.url,
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
    capa: capa6.url,
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
    capa: capa7.url,
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
    capa: capa8.url,
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
    capa: capa9.url,
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
    capa: capa10.url,
    resumo:
      "Todas as disciplinas da Polícia Penal da Paraíba em resumos objetivos, prontos para revisão.",
    materias: MATERIAS_PADRAO,
  },
];

export const DEPOIMENTOS = [
  {
    foto: dep1.url,
    texto:
      "O material conciso e bem elaborado tornou meus estudos mais produtivos, especialmente considerando que sou estudante de mestrado e meu tempo para me dedicar aos concursos é limitado.",
    autor: "Aluno RDC",
  },
  {
    foto: dep2.url,
    texto:
      "Contei com ajuda do material do Resumo do Concurseiro para dar início à minha trajetória de estudos. Bruno, além de produzir excelentes materiais, sempre foi um ótimo conselheiro. Gratidão.",
    autor: "Aluno RDC",
  },
  {
    foto: dep3.url,
    texto:
      "Só agradecer, irmão. Não tinha tempo para assistir às videoaulas e usei seus PDFs como forma principal para tirar dúvidas após as questões. Excelente custo-benefício.",
    autor: "Aluno RDC",
  },
  {
    foto: dep4.url,
    texto:
      "Alcancei nota muito boa na PMPE. Feliz demais com meu resultado. Material direto ao ponto e muito explicado, sem vocês não conseguiria esse resultado de 82/100.",
    autor: "Aprovado PMPE",
  },
  {
    foto: dep5.url,
    texto:
      "Os PDFs eram muito bem explicados e direto ao ponto, era o que eu precisava. Valeu a pena não desistir e hoje ver meu nome na lista dos aprovados.",
    autor: "Aprovado RDC",
  },
  {
    foto: dep6.url,
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
