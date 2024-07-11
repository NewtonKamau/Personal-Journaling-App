import { Router } from "express";
import { authenticateJWT } from "../middleware/auth";
import { getSummary } from "../controllers/summaryController";

const router = Router();

router.get("/summary", authenticateJWT, getSummary);

export default router;
