import db from "../db/database";

export interface ActivityFactor {
    id: number;
    name: string;
    description: string;
    value: number;
}

export function getAllActivityFactors(): ActivityFactor[] {
    return db.prepare("SELECT * FROM activity_factor").all() as ActivityFactor[];
}

export function getActivityFactorById(id: number): ActivityFactor | undefined {
    return db.prepare("SELECT * FROM activity_factor WHERE id = ?").get(id) as ActivityFactor | undefined;
}