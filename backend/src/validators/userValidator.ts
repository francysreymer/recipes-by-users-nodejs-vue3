import Joi from "joi";

export const userSchema = Joi.object({
  nome: Joi.string().required(),
  login: Joi.string().required(),
  senha: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least one uppercase letter, and one digit.",
      "string.empty": "Password is required.",
    }),
});
