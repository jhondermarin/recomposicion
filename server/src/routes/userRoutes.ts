import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.post("/", UserController.create);
router.delete("/:id", UserController.remove);
router.post("/login", UserController.login);

export default router;