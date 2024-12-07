import Joi from 'joi';

export const recipeByUserFilterSchema = Joi.object({
  nome: Joi.string().optional(),
  tempo_preparo_minutos: Joi.number().integer().positive().optional(),
});
