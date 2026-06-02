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

CREATE TABLE IF NOT EXISTS recipes (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    description     TEXT,
    calories        REAL NOT NULL,
    protein_g       REAL NOT NULL,
    fat_g           REAL NOT NULL,
    carbs_g         REAL NOT NULL,
    goal            TEXT NOT NULL CHECK (goal IN ('cut', 'bulk', 'recomp')),
    user_id         INTEGER REFERENCES users(id),
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO activity_factor (id, name, description, value) VALUES
    (1, 'Sedentario',   'Poca o ninguna actividad física',                    1.2),
    (2, 'Ligero',       'Ejercicio ligero o deportes 1-3 días a la semana',   1.375),
    (3, 'Moderado',     'Ejercicio moderado o deportes 3-5 días a la semana', 1.55),
    (4, 'Activo',       'Ejercicio intenso o deportes 6-7 días a la semana',  1.725),
    (5, 'Muy activo',   'Ejercicio muy intenso o trabajo físico diario',       1.9);

-- Recetas predeterminadas para cada objetivo (user_id NULL = visible para todos los usuarios)
INSERT OR IGNORE INTO recipes (id, name, description, calories, protein_g, fat_g, carbs_g, goal, user_id) VALUES
  (1, 'Pechuga con arroz', 'Pechuga de pollo a la plancha con arroz integral', 450, 45, 8, 52, 'recomp', NULL),
  (2, 'Tortilla de claras', 'Tortilla de 4 claras con avena y frutas', 320, 28, 6, 38, 'recomp', NULL),
  (3, 'Salmon con batata', 'Salmon al horno con batata asada', 520, 42, 18, 44, 'bulk', NULL),
  (4, 'Batido de proteina', 'Batido con whey, platano y mantequilla de cacahuete', 480, 40, 14, 48, 'bulk', NULL),
  (5, 'Ensalada de atun', 'Atun en lata con lechuga, tomate y huevo duro', 280, 35, 10, 12, 'cut', NULL),
  (6, 'Pollo con verduras', 'Pechuga de pollo con brocoli y esparragos al vapor', 310, 40, 7, 15, 'cut', NULL);