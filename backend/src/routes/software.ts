
// src/routes/software.ts
import { Router, RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { Software } from "../entity/Software";
import { authenticate, authorize, AuthRequest } from "../middleware/auth";

const router = Router();
const repo = AppDataSource.getRepository(Software);

// Handler to create software (Admin only)
const createSoftwareHandler: RequestHandler = async (
  req: AuthRequest,
  res,
  next
) => {
  try {
    const { name, description, accessLevels } = req.body;
    const software = repo.create({ name, description, accessLevels });
    await repo.save(software);
    res.json(software);
  } catch (err) {
    next(err);
  }
};

// Handler to list all software (Authenticated)
const listSoftwareHandler: RequestHandler = async (_req, res, next) => {
  try {
    const list = await repo.find();
    res.json(list);
  } catch (err) {
    next(err);
  }
};

// Register routes, casting middleware so TS picks the correct overload
router.post(
  "/",
  authenticate as RequestHandler,
  authorize("Admin") as RequestHandler,
  createSoftwareHandler
);

router.get(
  "/",
  authenticate as RequestHandler,
  listSoftwareHandler
);

export default router;
