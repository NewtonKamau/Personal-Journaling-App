import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import {
  addEntry,
  getEntries,
  getEntry,
} from "../controllers/JournalEntryController";
const router = Router();

router.post("/entries", authenticateJWT, addEntry);
router.get("/entries", authenticateJWT, getEntries);
router.get("/entries/:id", authenticateJWT, getEntry);

export default router;