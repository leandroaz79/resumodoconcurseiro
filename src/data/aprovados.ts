const f01 = { url: "/img/aprovado-01.webp" };
const f02 = { url: "/img/aprovado-02.webp" };
const f03 = { url: "/img/aprovado-03.webp" };
const f04 = { url: "/img/aprovado-04.webp" };
const f05 = { url: "/img/aprovado-05.webp" };
const f06 = { url: "/img/aprovado-06.webp" };
const f07 = { url: "/img/aprovado-07.webp" };
const f08 = { url: "/img/aprovado-08.webp" };
const f09 = { url: "/img/aprovado-09.webp" };
const f10 = { url: "/img/aprovado-10.webp" };
const f11 = { url: "/img/aprovado-11.webp" };
const f12 = { url: "/img/aprovado-12.webp" };
const f13 = { url: "/img/aprovado-13.webp" };
const f14 = { url: "/img/aprovado-14.webp" };
const f15 = { url: "/img/aprovado-15.webp" };

export type Aprovado = {
  nome: string;
  aprovacao: string;
  foto: string;
};

export const APROVADOS: Aprovado[] = [
  { nome: "Charleston", aprovacao: "Aprovado na Polícia Militar de Pernambuco", foto: f01.url },
  { nome: "Milena Chaves", aprovacao: "Aprovada Escrivã da PCPE", foto: f02.url },
  { nome: "Alison", aprovacao: "Aprovado Polícia Militar de Pernambuco e Corpo de Bombeiro", foto: f03.url },
  { nome: "Fagundes", aprovacao: "Aprovado Polícia Militar Pernambuco", foto: f04.url },
  { nome: "Mirelly", aprovacao: "Aprovada na Polícia Militar Rio Grande do Norte", foto: f05.url },
  { nome: "Emanuel", aprovacao: "Aprovado em Bombeiro PB, PMPE e Guarda Civil Municipal Belo Jardim", foto: f06.url },
  { nome: "Danylo Doane", aprovacao: "Aprovado Guarda Municipal Camaragibe e Moreno", foto: f07.url },
  { nome: "Felipe Lins", aprovacao: "Aprovado em Agente PCPE, Escrivão PCPE, CBMPE e PMPE", foto: f08.url },
  { nome: "Ana Clara", aprovacao: "Aprovada Polícia Militar Pernambuco", foto: f09.url },
  { nome: "Luís Morais", aprovacao: "Aprovado Polícia Militar Pernambuco", foto: f10.url },
  { nome: "Genilson", aprovacao: "Aprovado na Guarda Municipal de Caruaru e Santa Cruz do Capibaribe", foto: f11.url },
  { nome: "Matheus", aprovacao: "Aprovado na Guarda Municipal de Caruaru e Santa Cruz do Capibaribe", foto: f12.url },
  { nome: "Hugo", aprovacao: "Aprovado na Guarda Municipal Caruaru, Jaboatão e Santa Cruz do Capibaribe", foto: f13.url },
  { nome: "Bruno Araujo", aprovacao: "Aprovado Santa Cruz do Capibaribe", foto: f14.url },
  { nome: "Cibelle", aprovacao: "Aprovada na PMPB, Guarda Municipal de Belo Jardim e Caruaru", foto: f15.url },
];
