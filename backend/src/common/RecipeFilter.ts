type RecipeFilter = {
  nome?: string;
  tempo_preparo_minutos?: number;
  id_usuarios?: { id: number };
};

export default RecipeFilter;
