export interface ActivityFactor {
  id: number;
  name: string;
  description: string;
  value: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: number;
  user_id: number;
  age: number;
  gender: "male" | "female";
  weight_kg: number;
  height_cm: number;
  activity_factor_id: number;
  goal: "cut" | "bulk" | "recomp";
  created_at: string;
}

export interface Macros {
  calories: number;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
}

export interface CalculationResult {
  perfil: {
    gender: string;
    age: number;
    weight_kg: number;
    height_cm: number;
    goal: string;
    activity_factor: string;
  };
  resultado: Macros;
}