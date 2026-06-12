import { Request, Response } from "express";
import Groq from "groq-sdk";
import * as PerfilModel from "../models/profileModel";
import * as RecipeModel from "../models/recipeModel";

export async function askAboutRecipe(req: Request, res: Response) {
  const { question, recipe_id, user_id } = req.body;

  if (!question || !recipe_id || !user_id) {
    return res.status(400).json({ ok: false, message: "question, recipe_id y user_id son requeridos" });
  }

  // Inicializar Groq aquí dentro para que dotenv ya haya cargado
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const recipe = RecipeModel.getRecipeById(Number(recipe_id));
  if (!recipe) {
    return res.status(404).json({ ok: false, message: "Receta no encontrada" });
  }

  const perfil = PerfilModel.getProfileByUserId(Number(user_id));

  const systemPrompt = `Eres un asistente experto en nutricion y cocina saludable.
Tienes el siguiente contexto:

RECETA:
- Nombre: ${recipe.name}
- Descripcion: ${recipe.description}
- Objetivo: ${recipe.goal}
- Calorias: ${recipe.calories} kcal
- Proteina: ${recipe.protein_g}g
- Grasa: ${recipe.fat_g}g
- Carbohidratos: ${recipe.carbs_g}g

${perfil ? `PERFIL DEL USUARIO:
- Genero: ${perfil.gender === "male" ? "Hombre" : "Mujer"}
- Edad: ${perfil.age} años
- Peso: ${perfil.weight_kg} kg
- Objetivo: ${perfil.goal}` : ""}

Responde de forma concisa, practica y en español. Maximo 3 parrafos.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
      ],
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content;
    res.json({ ok: true, data: { answer } });

  } catch (error: any) {
    console.error("Groq error:", error.message);
    res.status(500).json({ ok: false, message: "Error al consultar la IA" });
  }
}