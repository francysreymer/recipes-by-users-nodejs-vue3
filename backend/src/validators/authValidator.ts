import Joi from 'joi';

export const authSchema = Joi.object({
  login: Joi.string().required(),
  senha: Joi.string().required(),
});
