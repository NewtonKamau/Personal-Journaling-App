import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import { addEntry } from "../controllers/JournalEntryController";
const router = Router();
router.post("/entries", authenticateJWT, addEntry);

export default router;