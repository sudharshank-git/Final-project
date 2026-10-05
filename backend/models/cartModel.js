import { db, schema } from "../db.js";

const CART_TABLE = `${schema}.cart_items`;
const PRODUCTS_TABLE = `${schema}.products`;

export async function initializeCartTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS ${CART_TABLE} (
      user_id INTEGER NOT NULL REFERENCES ${schema}.users(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES ${PRODUCTS_TABLE}(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
      PRIMARY KEY (user_id, product_id)
    )
  `);
}

export async function getForUser(userId) {
  const result = await db.query(
    `SELECT products.*, cart_items.quantity
    FROM ${CART_TABLE} AS cart_items
    JOIN ${PRODUCTS_TABLE} AS products ON products.id = cart_items.product_id
    WHERE cart_items.user_id = $1
    ORDER BY products.id ASC`,
    [userId]
  );
  return result.rows;
}

export async function addForUser(userId, productId) {
  await db.query(
    `INSERT INTO ${CART_TABLE} (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, product_id) DO NOTHING`,
    [userId, productId]
  );
}

export async function removeForUser(userId, productId) {
  await db.query(
    `DELETE FROM ${CART_TABLE}
    WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
}
