import { Router } from "express";
import * as ProfileController from "../controllers/profileController";

const router = Router();

router.get("/:user_id", ProfileController.getByUserId);
router.post("/", ProfileController.create);
router.put("/:user_id", ProfileController.update);

export default router;