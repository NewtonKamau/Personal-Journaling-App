import { Router } from "express";
import {
  register,
  login,
  getUser,
  updateUserDetails,
  removeUser,
} from "../controllers/userController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:username", authenticateJWT, getUser);
router.put("/", authenticateJWT, updateUserDetails);
router.delete("/", authenticateJWT, removeUser);
export default router;
