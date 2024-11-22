import Joi from 'joi';

export const recipeSchema = Joi.object({
  id_categorias: Joi.number().integer().positive().allow(null).optional(),
  nome: Joi.string().max(45).allow(null).optional(),
  tempo_preparo_minutos: Joi.number()
    .integer()
    .positive()
    .allow(null)
    .optional(),
  porcoes: Joi.number().integer().positive().allow(null).optional(),
  modo_preparo: Joi.string().required(),
  ingredientes: Joi.string().allow(null).optional(),
});
