import { Router } from "express";
import * as ChatController from "../controllers/chatController";

const router = Router();

router.post("/recipe", ChatController.askAboutRecipe);

export default router;