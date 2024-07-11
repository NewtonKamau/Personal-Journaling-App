import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import {
  addEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry,
} from "../controllers/JournalEntryController";
const router = Router();

router.post("/entries", authenticateJWT, addEntry);
router.get("/entries", authenticateJWT, getEntries);
router.get("/entries/:id", authenticateJWT, getEntry);
router.put("/entries/:id", authenticateJWT, updateEntry);
router.delete("/entries/:id",authenticateJWT,deleteEntry)

export default router;