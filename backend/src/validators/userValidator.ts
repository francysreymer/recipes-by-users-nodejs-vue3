import Joi from 'joi';

export const userSchema = Joi.object({
  nome: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});
