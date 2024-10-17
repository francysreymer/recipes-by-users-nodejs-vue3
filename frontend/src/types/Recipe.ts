import { Category } from "@/types/Category";

export type Recipe = {
  id: number;
  nome: string;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
  criado_em: Date;
  alterado_em: Date;
  id_categorias: Category;
};
