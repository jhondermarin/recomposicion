import { Router } from "express";
import * as ActivityFactorController from "../controllers/activityFactorController";

const router = Router();

router.get("/", ActivityFactorController.getAll);
router.get("/:id", ActivityFactorController.getOne);

export default router;