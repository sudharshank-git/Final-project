import { db, schema } from "../db.js";

export const createUser = async ({ username, email, passwordHash }) => {
  const result = await db.query(
    `INSERT INTO ${schema}.users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email`,
    [username, email, passwordHash]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await db.query(
    `SELECT * FROM ${schema}.users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};
