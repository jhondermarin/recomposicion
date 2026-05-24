import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { CalculationResult } from "../types";

function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      navigate("/register");
      return;
    }

    api.get<{ ok: boolean; data: CalculationResult }>(`/calculation/${user_id}`)
      .then(res => setResult(res.data))
      .catch(() => setError("Error al cargar los resultados"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Calculando...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!result) return null;

  const goalLabels: Record<string, string> = {
    cut: "Definicion",
    bulk: "Volumen",
    recomp: "Recomposicion",
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Tus resultados</h2>
        <p className="subtitle">Basado en el metodo Mifflin-St Jeor</p>

        <div className="perfil-info">
          <span>Genero</span>
          <strong>{result.perfil.gender === "male" ? "Hombre" : "Mujer"}</strong>
          <span>Edad</span>
          <strong>{result.perfil.age} años</strong>
          <span>Peso</span>
          <strong>{result.perfil.weight_kg} kg</strong>
          <span>Altura</span>
          <strong>{result.perfil.height_cm} cm</strong>
          <span>Actividad</span>
          <strong>{result.perfil.activity_factor}</strong>
          <span>Objetivo</span>
          <strong>{goalLabels[result.perfil.goal]}</strong>
        </div>

        <h3 style={{ marginBottom: "1rem", color: "var(--color-text-soft)", fontSize: "1rem" }}>
          Macronutrientes diarios
        </h3>

        <div className="results-grid">
          <div className="result-card" style={{ gridColumn: "1 / -1" }}>
            <div className="value">{result.resultado.calories}</div>
            <div className="unit">kcal / día</div>
            <div className="macro-label">Calorias totales</div>
          </div>
          <div className="result-card">
            <div className="value" style={{ color: "var(--color-accent)" }}>
              {result.resultado.protein_g}g
            </div>
            <div className="unit">proteina</div>
            <div className="macro-label">Proteina</div>
          </div>
          <div className="result-card">
            <div className="value" style={{ color: "var(--color-secondary)" }}>
              {result.resultado.fat_g}g
            </div>
            <div className="unit">grasa</div>
            <div className="macro-label">Grasa</div>
          </div>
          <div className="result-card" style={{ gridColumn: "1 / -1" }}>
            <div className="value" style={{ color: "#89B4C5" }}>
              {result.resultado.carbs_g}g
            </div>
            <div className="unit">carbohidratos</div>
            <div className="macro-label">Carbohidratos</div>
          </div>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/profile")}
        >
          Actualizar perfil
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;