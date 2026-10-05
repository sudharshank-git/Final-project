import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const productSchema = Joi.object({
  name: Joi.string().trim().min(2).required(),
  category: Joi.string().trim().min(2).required(),
  price: Joi.number().min(1).required(),
  brand: Joi.string().trim().min(2).required(),
  stock: Joi.number().integer().min(0).required().default(1),
  rating: Joi.number().min(0).max(5).required().default(1),
  inStock: Joi.boolean().required().default(false),
});

export const patchSchema = Joi.object({
  name: Joi.string().trim().min(2),
  category: Joi.string().trim().min(2),
  price: Joi.number().min(1),
  brand: Joi.string().trim().min(2),
  stock: Joi.number().integer().min(0),
  rating: Joi.number().min(0).max(5),
  inStock: Joi.boolean(),
}).min(1);

export const filterSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string(),
  brand: Joi.string(),
  price: Joi.number().integer().positive(),
  stock: Joi.number().integer().min(0),
  rating: Joi.number().min(0).max(5),
  inStock: Joi.boolean(),
});
