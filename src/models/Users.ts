import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

export const createUser = async (user: Omit<User, "id">) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
    [user.username, hashedPassword, user.email]
  );
  return result.rows[0];
};

export const findUserByUsername = async (username: string) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

export const updateUser = async (id: number, updates: Partial<User>) => {
  const fields = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(", ");
  const values = Object.values(updates);
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const result = await pool.query(
    `UPDATE users SET ${fields} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  return result.rows[0];
};
export const deleteUser = async (id: number) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
};

