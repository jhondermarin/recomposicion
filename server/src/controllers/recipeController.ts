import { Request, Response } from "express";
import * as RecipeModel from "../models/recipeModel";
import * as PerfilModel from "../models/profileModel";

export function getAll(req: Request, res: Response) {
  const user_id = Number(req.query.user_id);
  if (!user_id) {
    return res.status(400).json({ ok: false, message: "user_id es requerido" });
  }

  // Obtener el perfil para saber el objetivo actual del usuario
  const perfil = PerfilModel.getProfileByUserId(user_id);
  if (!perfil) {
    return res.status(404).json({ ok: false, message: "Perfil no encontrado" });
  }

  const recipes = RecipeModel.getRecipesByGoalAndUser(perfil.goal, user_id);
  res.json({ ok: true, data: recipes });
}

export function getOne(req: Request, res: Response) {
  const recipe = RecipeModel.getRecipeById(Number(req.params.id));
  if (!recipe) {
    return res.status(404).json({ ok: false, message: "Receta no encontrada" });
  }
  res.json({ ok: true, data: recipe });
}

export function create(req: Request, res: Response) {
  const { name, description, calories, protein_g, fat_g, carbs_g, goal, user_id } = req.body;

  if (!name || !calories || !protein_g || !fat_g || !carbs_g || !goal || !user_id) {
    return res.status(400).json({ ok: false, message: "Todos los campos son requeridos" });
  }

  const recipe = RecipeModel.createRecipe({
    name,
    description: description ?? "",
    calories: Number(calories),
    protein_g: Number(protein_g),
    fat_g: Number(fat_g),
    carbs_g: Number(carbs_g),
    goal,
    user_id: Number(user_id),
  });

  res.status(201).json({ ok: true, data: recipe });
}

export function remove(req: Request, res: Response) {
  const user_id = Number(req.query.user_id);
  if (!user_id) {
    return res.status(400).json({ ok: false, message: "user_id es requerido" });
  }

  const deleted = RecipeModel.deleteRecipe(Number(req.params.id), user_id);
  if (!deleted) {
    return res.status(404).json({ ok: false, message: "Receta no encontrada o no tienes permiso para eliminarla" });
  }

  res.json({ ok: true, message: "Receta eliminada" });
}