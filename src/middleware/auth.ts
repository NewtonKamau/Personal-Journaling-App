import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as
      | string
      | JwtPayload;
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};
