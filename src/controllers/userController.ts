import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../models/Users";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
 
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  res.json({ userName: user.username, token, success: "You are logged in." });
};
