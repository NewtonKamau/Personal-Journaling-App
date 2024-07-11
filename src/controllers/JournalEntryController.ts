import { Request, Response } from "express";
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
} from "../models/JournalEntries";
import { JwtPayload } from "../types/jwtPayload";

export const addEntry = async (req: Request, res: Response) => {
  try {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const entry = await createJournalEntry({
      userId: (req.user as JwtPayload).userId,
      ...req.body,
    });
    res.status(201).json(entry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
/*
Get all entries 
GET /api/journal/entries

*/
export const getEntries = async (req: Request, res: Response) => {
  try {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const entries = await getJournalEntries((req.user as JwtPayload).userId);
    res.json(entries);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

/* 
Get a specific entry by ID
GET /api/journal/entries/:id
*/

export const getEntry = async (req: Request, res: Response) => {
  try {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const entry = await getJournalEntryById(
      parseInt(req.params.id, 10),
      (req.user as JwtPayload).userId
    );
    if (!entry) {
      return res.status(404).json({ error: "Journal entry not found" });
    }
    res.json(entry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

/*
update an entry by id
PUT /api/journal/entries/:id
*/


export const updateEntry = async (req: Request, res: Response) => {
  try {
    if (!req.user || typeof req.user === "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const updatedEntry = await updateJournalEntry(
      parseInt(req.params.id, 10),
      (req.user as JwtPayload).userId,
      req.body
    );
    if (!updatedEntry) {
      return res
        .status(404)
        .json({ error: "Journal entry not found or not authorized to update" });
    }
    res.json(updatedEntry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};
