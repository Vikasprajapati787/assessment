import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ id: payload.userId });
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize =
  (...roles: ("Employee" | "Manager" | "Admin")[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
