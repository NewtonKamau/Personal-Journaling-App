import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export interface JournalEntry {
  id: number;
  userId: number;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createJournalEntry = async (
  entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">
) => {
  const result = await pool.query(
    "INSERT INTO journal_entries (user_id, title, content, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [entry.userId, entry.title, entry.content, entry.category]
  );
  return result.rows[0];
};

export const getJournalEntries = async (
  userId: number
): Promise<JournalEntry[]> => {
  const result = await pool.query(
    `SELECT * FROM journal_entries WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};

export const getJournalEntryById = async (
  id: number,
  userId: number
): Promise<JournalEntry | null> => {
  const result = await pool.query(
    `SELECT * FROM journal_entries WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );
  return result.rows[0] || null;
};


