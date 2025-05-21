// src/routes/auth.ts
import { Router, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();
const repo = AppDataSource.getRepository(User);

const signupHandler: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existing = await repo.findOneBy({ username });
    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = repo.create({
      username,
      password: hashed,
      role: "Employee",
    });
    await repo.save(user);

    res
      .status(201)
      .json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    next(err);
  }
};

const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await repo.findOneBy({ username });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};

router.post("/signup", signupHandler);
router.post("/login", loginHandler);

export default router;
