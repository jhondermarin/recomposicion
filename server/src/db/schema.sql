CREATE TABLE IF NOT EXISTS activity_factor (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    description     TEXT,
    value           REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    username        TEXT NOT NULL UNIQUE,
    email           TEXT NOT NULL UNIQUE,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS perfil (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id             INTEGER NOT NULL REFERENCES users(id),
    age                 INTEGER NOT NULL,
    gender              TEXT NOT NULL CHECK (gender IN ('male', 'female')),
    weight_kg           REAL NOT NULL,
    height_cm           REAL NOT NULL,
    activity_factor_id  INTEGER REFERENCES activity_factor(id),
    goal                TEXT NOT NULL CHECK (goal IN ('cut', 'bulk', 'recomp')),
    created_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO activity_factor (id, name, description, value) VALUES
    (1, 'Sedentario',   'Poca o ninguna actividad física',                    1.2),
    (2, 'Ligero',       'Ejercicio ligero o deportes 1-3 días a la semana',   1.375),
    (3, 'Moderado',     'Ejercicio moderado o deportes 3-5 días a la semana', 1.55),
    (4, 'Activo',       'Ejercicio intenso o deportes 6-7 días a la semana',  1.725),
    (5, 'Muy activo',   'Ejercicio muy intenso o trabajo físico diario',       1.9);