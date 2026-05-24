import { Request, Response } from "express";
import * as ActivityFactorModel from "../models/activityFactorModel";

export function getAll(_req: Request, res: Response) {
  const factors = ActivityFactorModel.getAllActivityFactors();
  res.json({ ok: true, data: factors });
}

export function getOne(req: Request, res: Response) {
  const factor = ActivityFactorModel.getActivityFactorById(Number(req.params.id));
  if (!factor) return res.status(404).json({ ok: false, message: "Factor no encontrado" });
  res.json({ ok: true, data: factor });
}