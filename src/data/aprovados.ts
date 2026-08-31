import f01 from "@/assets/aprovados/aprovado-01.webp.asset.json";
import f02 from "@/assets/aprovados/aprovado-02.webp.asset.json";
import f03 from "@/assets/aprovados/aprovado-03.webp.asset.json";
import f04 from "@/assets/aprovados/aprovado-04.webp.asset.json";
import f05 from "@/assets/aprovados/aprovado-05.webp.asset.json";
import f06 from "@/assets/aprovados/aprovado-06.webp.asset.json";
import f07 from "@/assets/aprovados/aprovado-07.webp.asset.json";
import f08 from "@/assets/aprovados/aprovado-08.webp.asset.json";
import f09 from "@/assets/aprovados/aprovado-09.webp.asset.json";
import f10 from "@/assets/aprovados/aprovado-10.webp.asset.json";
import f11 from "@/assets/aprovados/aprovado-11.webp.asset.json";
import f12 from "@/assets/aprovados/aprovado-12.webp.asset.json";
import f13 from "@/assets/aprovados/aprovado-13.webp.asset.json";
import f14 from "@/assets/aprovados/aprovado-14.webp.asset.json";
import f15 from "@/assets/aprovados/aprovado-15.webp.asset.json";

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
