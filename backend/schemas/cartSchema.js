import Joi from "joi";

export const cartItemSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
