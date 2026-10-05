import "dotenv/config";
import pg from "pg";

export const schema = process.env.DB_SCHEMA;

if (!schema || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(schema)) {
  throw new Error("DB_SCHEMA is missing or invalid in .env");
}

export const db = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

db.on("error", (err) => {
  console.error("Unexpected database error:", err.message);
});
