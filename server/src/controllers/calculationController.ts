import { Request, Response } from "express";
import * as PerfilModel from "../models/profileModel";
import * as ActivityFactorModel from "../models/activityFactorModel";
import { calculateBMR, calculateMacros, calculateTDEE } from "../utils/mifflin";

export function calculate(req: Request, res: Response) {
  const user_id = Number(req.params.user_id);
  console.log("user_id:", user_id); // temporal

  // Buscar perfil del usuario
  const perfil = PerfilModel.getProfileByUserId(user_id);
  console.log("perfil:", perfil); // temporal
  if (!perfil) {
    return res.status(404).json({ ok: false, message: "Perfil no encontrado" });
  }

  // Buscar el factor de actividad
  const factor = ActivityFactorModel.getActivityFactorById(perfil.activity_factor_id);
  if (!factor) {
    return res.status(404).json({ ok: false, message: "Factor de actividad no encontrado" });
  }

  // justo antes del calculateMacros
  const dataParaCalculo = {
    gender: perfil.gender,
    age: perfil.age,
    weight_kg: perfil.weight_kg,
    height_cm: perfil.height_cm,
    activity_factor: factor.value,
    goal: perfil.goal
  };

  console.log("BMR:", calculateBMR(dataParaCalculo));
  console.log("TDEE:", calculateTDEE(dataParaCalculo));
  

  // Calcular
  const result = calculateMacros({
    gender: perfil.gender,
    age: perfil.age,
    weight_kg: perfil.weight_kg,
    height_cm: perfil.height_cm,
    activity_factor: factor.value,
    goal: perfil.goal
  });

  res.json({
    ok: true,
    data: {
      perfil: {
        gender: perfil.gender,
        age: perfil.age,
        weight_kg: perfil.weight_kg,
        height_cm: perfil.height_cm,
        goal: perfil.goal,
        activity_factor: factor.name
      },
      resultado: result
    }
  });
}