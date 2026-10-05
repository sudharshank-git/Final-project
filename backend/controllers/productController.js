import * as Model from "../models/productModel.js";
import * as Schema from "../schemas/productSchema.js";
import { HttpError } from "../utils/httpError.js";
import { validate } from "../utils/validate.js";

const validId = (params) => validate(Schema.idSchema, params).id;

export const getProducts = async (req, res) => {
  const products = await Model.getAll();
  if (!products) throw new HttpError(404, "Products Data Not found");
  res.status(200).json({
    message: "Product data fetched",
    count: products.length,
    products,
  });
};

export const getUserProducts = async (req, res) => {
  const userId = Number(req.user?.sub);
  if (!userId) {
    throw new HttpError(401, "User session missing");
  }

  const products = await Model.getByUserId(userId);
  res.status(200).json({
    message: "User product data fetched",
    count: products.length,
    products,
  });
};

export const getProductById = async (req, res) => {
  const product = await Model.getById(validId(req.params));
  if (!product) throw new HttpError(404, "Product not found");
  res.status(200).json({ message: "Product data fetched", products: product });
};

export const filterProducts = async (req, res) => {
  const filters = validate(Schema.filterSchema, req.query);
  const products = await Model.filter(filters);

  if (products.length === 0) {
    const body = { message: "No products matched your filters", products: [] };
    if (filters.category) {
      body.availableCategories = await Model.getCategories();
    }
    return res.status(404).json(body);
  }

  res.status(200).json({
    message: "Product data fetched",
    count: products.length,
    products,
  });
};

export const addProduct = async (req, res) => {
  const data = validate(Schema.productSchema, req.body);
  const userId = Number(req.user?.sub);
  if (!userId) {
    throw new HttpError(401, "User session missing");
  }

  const product = await Model.create({ ...data, userId });
  res.status(201).json({ message: "New product added", product });
};

export const replaceProduct = async (req, res) => {
  const id = validId(req.params);
  const userId = Number(req.user?.sub);
  const data = validate(Schema.productSchema, req.body);
  const product = await Model.update(id, userId, data);
  if (product.length === 0) throw new HttpError(404, "Product not found");
  res.status(200).json({ message: "Product replaced successfully", product });
};

export const updateProduct = async (req, res) => {
  const id = validId(req.params);
  const userId = Number(req.user?.sub);
  const changes = validate(Schema.patchSchema, req.body);

  const existing = await Model.getById(id);
  if (!existing) throw new HttpError(404, "Product not found");
  if (existing.user_id !== userId) {
    throw new HttpError(403, "You can only update your own products");
  }

  const merged = {
    name: changes.name ?? existing.name,
    price: changes.price ?? existing.price,
    stock: changes.stock ?? existing.stock,
    inStock: changes.inStock ?? existing.instock,
    brand: changes.brand ?? existing.brand,
    category: changes.category ?? existing.category,
    rating: changes.rating ?? existing.rating,
  };
  const product = await Model.update(id, userId, merged);
  res.status(200).json({ message: "Product updated successfully", product });
};

export const deleteProduct = async (req, res) => {
  const userId = Number(req.user?.sub);
  const deleted = await Model.remove(validId(req.params), userId);
  if (deleted.length === 0) throw new HttpError(404, "Product not found");
  res.status(200).json({ "Deleted Product": deleted });
};

export const deleteAllProducts = async (req, res) => {
  await Model.removeAll();
  res.status(204).send();
};
