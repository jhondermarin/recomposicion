interface ProfileData {
    gender: "male" | "female";
    age: number;
    weight_kg: number;
    height_cm: number;
    activity_factor: number;
    goal: "cut" | "bulk" | "recomp";
}

export interface Macros {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
}

// Calorias que quemaos en reposo
export function calculateBMR(profile: ProfileData): number {
    console.log("weight:", profile.weight_kg, "height:", profile.height_cm, "age:", profile.age);
    console.log("calc:", (10 * profile.weight_kg), (6.25 * profile.height_cm), (5 * profile.age));
    const base = (10 * profile.weight_kg) + (6.25 * profile.height_cm) - (5 * profile.age);
    return profile.gender === "male" ? base + 5 : base - 161;
}

// Calorias totales que quemamos en un día considerando actividad física
export function calculateTDEE(profile: ProfileData): number {
    return calculateBMR(profile) * profile.activity_factor;
}

// Calorias objetivo según el goal (cut, bulk, recomp)
export function calculateGoalCalories(tdee: number, goal: "cut" | "bulk" | "recomp"): number {
    switch (goal) {
        case "cut": return Math.round(tdee * 0.8); // 20% deficit
        case "bulk": return Math.round(tdee * 1.1); // 20% surplus
        case "recomp": return Math.round(tdee * 0.9); // 10% deficit
    }
}


// Distribución de macronutrientes según el goal
export function calculateMacros(profile: ProfileData): Macros {
    const tdee = calculateTDEE(profile);
    const calories = calculateGoalCalories(tdee, profile.goal);

    // Proteína: calorías = proteína_g × 4
    const proteinMultiplier = profile.goal === "bulk" ? 1.8 : 2.4;
    const protein_g = Math.round(profile.weight_kg * proteinMultiplier);
    const proteinCalories = protein_g * 4;

    // Grasa: calorías = grasa_g × 9   
    const fat_g = Math.round(profile.weight_kg * 1.1);
    const fatCalories = fat_g * 9;
    
    // Carbos: lo que queda 
    const carbs_g = Math.round((calories - proteinCalories - fatCalories) / 4);

    return { calories, protein_g, carbs_g, fat_g };
}

