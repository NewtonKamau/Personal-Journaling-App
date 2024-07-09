import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../models/Users";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  console.log("the request", req.body);
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


