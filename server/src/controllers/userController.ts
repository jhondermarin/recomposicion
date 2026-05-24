import { Request, Response } from "express";
import * as UserModel from "../models/userModel";

export function getAll(_req: Request, res: Response) {
  const users = UserModel.getAllUsers();
  res.json({ ok: true, data: users });
}

export function getOne(req: Request, res: Response) {
  const user = UserModel.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
  res.json({ ok: true, data: user });
}

export function create(req: Request, res: Response) {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ ok: false, message: "username y email son requeridos" });
  }
  try {
    const user = UserModel.createUser(username, email);
    res.status(201).json({ ok: true, data: user });
  } catch (error: any) {
    console.log("Error real:", error.message);
    res.status(409).json({ ok: false, message: "El usuario o email ya existe" });
  }
}

export function remove(req: Request, res: Response) {
  const user = UserModel.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
  UserModel.deleteUser(Number(req.params.id));
  res.json({ ok: true, message: "Usuario eliminado" });
}

export function login(req: Request, res: Response) {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ ok: false, message: "El username es requerido" });
  }
  const user = UserModel.getUserByUsername(username);
  if (!user) {
    return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
  }
  res.json({ ok: true, data: user });
}