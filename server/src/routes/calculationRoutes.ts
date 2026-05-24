import { Router } from "express";
import * as CalculationController from "../controllers/calculationController";

const router = Router();

router.get("/:user_id", CalculationController.calculate);

export default router;