import db from "../db/database";

export interface User {
    id: number;
    username: string;
    email: string;
}


export function getAllUsers(): User[] {
    return db.prepare("SELECT * FROM users").all() as User[];
}

export function getUserById(id: number): User | undefined {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User | undefined;
}

export function createUser(username: string, email: string): User {
    const stmt = db.prepare("INSERT INTO users (username, email) VALUES (?, ?)");
    const result = stmt.run(username, email);
    return getUserById(result.lastInsertRowid as number)!;
}

export function deleteUser(id: number): void {
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
}

export function getUserByUsername(username: string): User | undefined {
    return db.prepare("SELECT * FROM users WHERE username = ?").get(username) as User | undefined;
}