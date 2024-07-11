import { Request, Response } from "express";
import { Pool } from "pg";
import { JwtPayload } from "../types/jwtPayload";


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});


export const getSummary = async (req: Request, res: Response) => {
  try {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = (req.user as JwtPayload).userId;
    const { period } = req.query;

    let dateQuery;
    switch (period) {
      case "daily":
        dateQuery = "date_trunc('day', created_at)";
        break;
      case "weekly":
        dateQuery = "date_trunc('week', created_at)";
        break;
      case "monthly":
        dateQuery = "date_trunc('month', created_at)";
        break;
      default:
        return res.status(400).json({ error: "Invalid period specified" });
    }

    const result = await pool.query(
      `SELECT ${dateQuery} AS period, COUNT(*) AS count 
       FROM journal_entries 
       WHERE user_id = $1 
       GROUP BY period 
       ORDER BY period DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
