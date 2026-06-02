import { Router } from "express";
import * as RecipeController from "../controllers/recipeController";

const router = Router();

router.get("/", RecipeController.getAll);
router.get("/:id", RecipeController.getOne);
router.post("/", RecipeController.create);
router.delete("/:id", RecipeController.remove);

export default router;