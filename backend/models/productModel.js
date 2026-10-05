import { db, schema } from "../db.js";

const TABLE = `${schema}.products`;

export const getAll = async () => {
  const result = await db.query(`SELECT * FROM ${TABLE} ORDER BY id ASC`);
  return result.rows;
};

export const getById = async (id) => {
  const result = await db.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [id]);
  return result.rows[0];
};

// Maps each supported filter to its SQL condition. "?" is replaced by $n.
const FILTERS = {
  category: { sql: "category = ?" },
  brand: { sql: "brand = ?" },
  name: { sql: "name ILIKE ?", transform: (v) => `%${v}%` },
  price: { sql: "price <= ?" },
  stock: { sql: "stock >= ?" },
  rating: { sql: "rating >= ?" },
  inStock: { sql: "instock = ?" },
};

export const filter = async (filters) => {
  const conditions = [];
  const values = [];

  for (const [key, { sql, transform }] of Object.entries(FILTERS)) {
    if (filters[key] === undefined) continue;
    values.push(transform ? transform(filters[key]) : filters[key]);
    conditions.push(sql.replace("?", `$${values.length}`));
  }

  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const result = await db.query(
    `SELECT * FROM ${TABLE}${where} ORDER BY id`,
    values
  );
  return result.rows;
};

export const getCategories = async () => {
  const result = await db.query(
    `SELECT DISTINCT category FROM ${TABLE} ORDER BY category`
  );
  return result.rows.map((r) => r.category);
};

export const create = async (p) => {
  const result = await db.query(
    `INSERT INTO ${TABLE} (name, price, stock, instock, brand, category, rating)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [p.name, p.price, p.stock, p.inStock, p.brand, p.category, p.rating]
  );
  return result.rows;
};

/** Full update of a row (used by both PUT and PATCH). */
export const update = async (id, p) => {
  const result = await db.query(
    `UPDATE ${TABLE}
     SET name = $1, price = $2, stock = $3, instock = $4,
         brand = $5, category = $6, rating = $7
     WHERE id = $8
     RETURNING *`,
    [p.name, p.price, p.stock, p.inStock, p.brand, p.category, p.rating, id]
  );
  return result.rows;
};

export const remove = async (id) => {
  const result = await db.query(
    `DELETE FROM ${TABLE} WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows;
};

export const removeAll = async () => {
  await db.query(`TRUNCATE TABLE ${TABLE} RESTART IDENTITY`);
};
