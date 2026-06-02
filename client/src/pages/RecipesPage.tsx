import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Recipe } from "../types";

function RecipesPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      navigate("/register");
      return;
    }

    api.get<{ ok: boolean; data: Recipe[] }>(`/recipes?user_id=${user_id}`)
      .then(res => setRecipes(res.data))
      .catch(() => setError("Error al cargar las recetas"))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id: number) {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;

    api.delete(`/recipes/${id}?user_id=${user_id}`)
      .then(() => setRecipes(recipes.filter(r => r.id !== id)))
      .catch(() => setError("Error al eliminar la receta"));
  }

  if (loading) return <div className="page"><p>Cargando recetas...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <div className="recipes-container">
        <div className="recipes-header">
          <h2>Recetas</h2>
          <button
            className="btn btn-primary"
            style={{ width: "auto", padding: "0.5rem 1.2rem" }}
            onClick={() => navigate("/recipes/add")}
          >
            + Añadir receta
          </button>
        </div>

        {recipes.length === 0 && (
          <p style={{ color: "var(--color-text-soft)" }}>
            No hay recetas para tu objetivo actual.
          </p>
        )}

        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card-header">
                <h3>{recipe.name}</h3>
                {recipe.user_id !== null && (
                  <button
                    className="recipe-delete-btn"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    ✕
                  </button>
                )}
              </div>
              {recipe.description && (
                <p className="recipe-description">{recipe.description}</p>
              )}
              <div className="recipe-macros">
                <div className="recipe-macro">
                  <span className="recipe-macro-value">{recipe.calories}</span>
                  <span className="recipe-macro-label">kcal</span>
                </div>
                <div className="recipe-macro">
                  <span className="recipe-macro-value" style={{ color: "var(--color-accent)" }}>
                    {recipe.protein_g}g
                  </span>
                  <span className="recipe-macro-label">proteina</span>
                </div>
                <div className="recipe-macro">
                  <span className="recipe-macro-value" style={{ color: "var(--color-secondary)" }}>
                    {recipe.fat_g}g
                  </span>
                  <span className="recipe-macro-label">grasa</span>
                </div>
                <div className="recipe-macro">
                  <span className="recipe-macro-value" style={{ color: "#89B4C5" }}>
                    {recipe.carbs_g}g
                  </span>
                  <span className="recipe-macro-label">carbos</span>
                </div>
              </div>
              {recipe.user_id === null && (
                <span className="recipe-badge">Predeterminada</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipesPage;