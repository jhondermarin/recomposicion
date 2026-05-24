import { Request, Response } from "express";
import * as ProfileModel from "../models/profileModel";
import * as ActivityFactorModel from "../models/activityFactorModel";

export function getByUserId(req: Request, res: Response) {
  const profile = ProfileModel.getProfileByUserId(Number(req.params.user_id));
  if (!profile) return res.status(404).json({ ok: false, message: "Perfil no encontrado" });
  res.json({ ok: true, data: profile });
}

export function create(req: Request, res: Response) {
  const { user_id, age, gender, weight_kg, height_cm, activity_factor_id, goal } = req.body;

  // Validación básica
  if (!user_id || !age || !gender || !weight_kg || !height_cm || !activity_factor_id || !goal) {
    return res.status(400).json({ ok: false, message: "Todos los campos son requeridos" });
  }

  // Verificar que el factor de actividad existe
  const factor = ActivityFactorModel.getActivityFactorById(Number(activity_factor_id));
  if (!factor) {
    return res.status(404).json({ ok: false, message: "Factor de actividad no encontrado" });
  }

  const profile = ProfileModel.createProfile({ user_id, age, gender, weight_kg, height_cm, activity_factor_id, goal });
  res.status(201).json({ ok: true, data: profile });
}

export function update(req: Request, res: Response) {
  const user_id = Number(req.params.user_id);
  const profile = ProfileModel.getProfileByUserId(user_id);
  if (!profile) return res.status(404).json({ ok: false, message: "Perfil no encontrado" });

  const updated = ProfileModel.updateProfile(user_id, req.body);
  res.json({ ok: true, data: updated });
}