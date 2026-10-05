import { db, schema } from "../db.js";

const TABLE = `${schema}.products`;
const DASHBOARD_TABLE = `${schema}.dashboard`;

async function ensureUserColumn() {
  await db.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = '${schema}'
          AND table_name = 'products'
          AND column_name = 'user_id'
      ) THEN
        ALTER TABLE ${TABLE} ADD COLUMN user_id INTEGER;
        ALTER TABLE ${TABLE}
          ADD CONSTRAINT products_user_id_fkey
          FOREIGN KEY (user_id) REFERENCES ${schema}.users(id) ON DELETE CASCADE;
      END IF;
    END $$;
  `);
}

export async function initializeDashboardTable() {
  await ensureUserColumn();

  await db.query(`
        CREATE TABLE IF NOT EXISTS ${DASHBOARD_TABLE} (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES ${schema}.users(id) ON DELETE CASCADE,
            product_id INTEGER NOT NULL REFERENCES ${schema}.products(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE (user_id, product_id)
        )
    `);

  await db.query(`
        INSERT INTO ${DASHBOARD_TABLE} (user_id, product_id)
        SELECT DISTINCT p.user_id, p.id
        FROM ${TABLE} AS p
        WHERE p.user_id IS NOT NULL
        ON CONFLICT (user_id, product_id) DO NOTHING
    `);
}

async function ensureDashboardTable() {
  await initializeDashboardTable();
}

export const getAll = async () => {
  const result = await db.query(`SELECT * FROM ${TABLE} ORDER BY id ASC`);
  return result.rows;
};

export const getByUserId = async (userId) => {
  await ensureDashboardTable();
  const result = await db.query(
    `SELECT p.*
     FROM ${TABLE} AS p
     INNER JOIN ${DASHBOARD_TABLE} AS d ON d.product_id = p.id
     WHERE d.user_id = $1
     ORDER BY p.id DESC`,
    [userId],
  );
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
    values,
  );
  return result.rows;
};

export const getCategories = async () => {
  const result = await db.query(
    `SELECT DISTINCT category FROM ${TABLE} ORDER BY category`,
  );
  return result.rows.map((r) => r.category);
};

export const create = async (p) => {
  await ensureDashboardTable();

  const result = await db.query(
    `INSERT INTO ${TABLE} (name, price, stock, instock, brand, category, rating, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      p.name,
      p.price,
      p.stock,
      p.inStock,
      p.brand,
      p.category,
      p.rating,
      p.userId,
    ],
  );

  const product = result.rows[0];
  if (product) {
    await db.query(
      `INSERT INTO ${DASHBOARD_TABLE} (user_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, product_id) DO NOTHING`,
      [p.userId, product.id],
    );
  }

  return result.rows;
};

/** Full update of a row (used by both PUT and PATCH). */
export const update = async (id, userId, p) => {
  const dashboardCheck = await db.query(
    `SELECT 1 FROM ${DASHBOARD_TABLE} WHERE user_id = $1 AND product_id = $2`,
    [userId, id],
  );

  if (dashboardCheck.rows.length === 0) {
    return [];
  }

  const result = await db.query(
    `UPDATE ${TABLE}
     SET name = $1, price = $2, stock = $3, instock = $4,
         brand = $5, category = $6, rating = $7
     WHERE id = $8 AND user_id = $9
     RETURNING *`,
    [
      p.name,
      p.price,
      p.stock,
      p.inStock,
      p.brand,
      p.category,
      p.rating,
      id,
      userId,
    ],
  );
  return result.rows;
};

export const remove = async (id, userId) => {
  const dashboardCheck = await db.query(
    `SELECT 1 FROM ${DASHBOARD_TABLE} WHERE user_id = $1 AND product_id = $2`,
    [userId, id],
  );

  if (dashboardCheck.rows.length === 0) {
    return [];
  }

  const result = await db.query(
    `DELETE FROM ${TABLE} WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId],
  );

  if (result.rows.length > 0) {
    await db.query(
      `DELETE FROM ${DASHBOARD_TABLE} WHERE user_id = $1 AND product_id = $2`,
      [userId, id],
    );
  }

  return result.rows;
};

export const removeAll = async () => {
  await ensureDashboardTable();
  await db.query(
    `TRUNCATE TABLE ${DASHBOARD_TABLE}, ${TABLE} RESTART IDENTITY CASCADE`,
  );
};
