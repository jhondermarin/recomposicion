import db from "../db/database";

export interface Recipe {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  goal: "cut" | "bulk" | "recomp";
  user_id: number | null;
  created_at: string;
}

export interface CreateRecipeData {
  name: string;
  description: string;
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  goal: "cut" | "bulk" | "recomp";
  user_id: number;
}

// Obtener recetas predeterminadas + las del usuario filtradas por objetivo
export function getRecipesByGoalAndUser(goal: string, user_id: number): Recipe[] {
  return db.prepare(`
    SELECT * FROM recipes
    WHERE goal = ?
    AND (user_id IS NULL OR user_id = ?)
    ORDER BY user_id IS NULL DESC, created_at DESC
  `).all(goal, user_id) as Recipe[];
}

export function getRecipeById(id: number): Recipe | undefined {
  return db.prepare("SELECT * FROM recipes WHERE id = ?").get(id) as Recipe | undefined;
}

export function createRecipe(data: CreateRecipeData): Recipe {
  const stmt = db.prepare(`
    INSERT INTO recipes (name, description, calories, protein_g, fat_g, carbs_g, goal, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.name,
    data.description,
    data.calories,
    data.protein_g,
    data.fat_g,
    data.carbs_g,
    data.goal,
    data.user_id
  );
  return getRecipeById(result.lastInsertRowid as number)!;
}

export function deleteRecipe(id: number, user_id: number): boolean {
  const result = db.prepare(
    "DELETE FROM recipes WHERE id = ? AND user_id = ?"
  ).run(id, user_id);
  return result.changes > 0;
}