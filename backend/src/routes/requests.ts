
// src/routes/requests.ts
import { Router, RequestHandler } from "express";
import { AppDataSource } from "../data-source";
import { Request as AccessRequest } from "../entity/Request";
import { authenticate, authorize, AuthRequest } from "../middleware/auth";

const router = Router();
const repo = AppDataSource.getRepository(AccessRequest);

const submitRequestHandler: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const request = repo.create({
      user: req.user!,
      software: { id: softwareId } as any,
      accessType,
      reason,
      status: "Pending",
    });
    await repo.save(request);
    res.json(request);
  } catch (err) {
    next(err);
  }
};

const getPendingRequestsHandler: RequestHandler = async (_req, res, next) => {
  try {
    const list = await repo.find({
      where: { status: "Pending" },
      relations: ["user", "software"],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

const updateRequestHandler: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;
    const request = await repo.findOneBy({ id });
    if (!request) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    request.status = status;
    await repo.save(request);
    res.json(request);
  } catch (err) {
    next(err);
  }
};

// Cast authenticate and authorize(...) to RequestHandler so router.post() picks the right overload
router.post(
  "/",
  authenticate as RequestHandler,
  authorize("Employee") as RequestHandler,
  submitRequestHandler
);

router.get(
  "/pending",
  authenticate as RequestHandler,
  authorize("Manager") as RequestHandler,
  getPendingRequestsHandler
);

router.patch(
  "/:id",
  authenticate as RequestHandler,
  authorize("Manager") as RequestHandler,
  updateRequestHandler
);

export default router;

