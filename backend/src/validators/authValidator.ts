import Joi from 'joi';

export const authSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});
