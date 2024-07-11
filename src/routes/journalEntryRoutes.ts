import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import {
  addEntry,
  getEntries,
 
} from "../controllers/JournalEntryController";
const router = Router();

router.get("/entries", authenticateJWT, getEntries);
router.post("/entries", authenticateJWT, addEntry);

export default router;