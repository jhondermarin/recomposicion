import db from "../db/database";

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

export interface CreateProfileData {
    user_id: number;
    age: number;
    gender: "male" | "female";
    weight_kg: number;
    height_cm: number;
    activity_factor_id: number;
    goal: "cut" | "bulk" | "recomp";
}

export function getProfileByUserId(user_id: number): Profile | undefined {
    return db.prepare("SELECT * FROM perfil WHERE user_id = ?").get(user_id) as Profile | undefined;
}


export function createProfile(data: CreateProfileData): Profile {
    const stmt = db.prepare(`
        INSERT INTO perfil (user_id, age, gender, weight_kg, height_cm, activity_factor_id, goal)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        data.user_id,
        data.age,
        data.gender,
        data.weight_kg,
        data.height_cm,
        data.activity_factor_id,
        data.goal
    );
    return db.prepare("SELECT * FROM perfil WHERE id = ?").get(result.lastInsertRowid) as Profile;;
}

export function updateProfile(user_id: number, data: Partial<CreateProfileData>): Profile | undefined {
    db.prepare(`
        UPDATE perfil
        SET age = ?, gender = ?, weight_kg = ?, height_cm = ?, activity_factor_id = ?, goal = ?
        WHERE user_id = ?
    `).run(
        data.age,
        data.gender,
        data.weight_kg,
        data.height_cm,
        data.activity_factor_id,
        data.goal,
        user_id
    );
    return getProfileByUserId(user_id);
}