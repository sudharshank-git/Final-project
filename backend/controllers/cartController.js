import * as Cart from "../models/cartModel.js";
import * as Products from "../models/productModel.js";
import * as Schema from "../schemas/cartSchema.js";
import { HttpError } from "../utils/httpError.js";
import { validate } from "../utils/validate.js";

function getUserId(req) {
  const userId = Number(req.user?.sub);
  if (!Number.isSafeInteger(userId) || userId <= 0) {
    throw new HttpError(401, "Token does not identify a user");
  }
  return userId;
}

export async function getCart(req, res) {
  const items = await Cart.getForUser(getUserId(req));
  res.status(200).json({ items });
}

export async function addToCart(req, res) {
  const { productId } = validate(Schema.cartItemSchema, req.body);
  const userId = getUserId(req);
  if (!(await Products.getById(productId))) {
    throw new HttpError(404, "Product not found");
  }

  await Cart.addForUser(userId, productId);
  res.status(200).json({ items: await Cart.getForUser(userId) });
}

export async function removeFromCart(req, res) {
  const { id: productId } = validate(Schema.idSchema, { id: req.params.productId });
  const userId = getUserId(req);

  await Cart.removeForUser(userId, productId);
  res.status(200).json({ items: await Cart.getForUser(userId) });
}
