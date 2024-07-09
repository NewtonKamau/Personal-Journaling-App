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


