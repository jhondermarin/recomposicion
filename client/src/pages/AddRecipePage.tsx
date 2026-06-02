import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function AddRecipePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    calories: "",
    protein_g: "",
    fat_g: "",
    carbs_g: "",
    goal: "recomp",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      navigate("/register");
      return;
    }

    try {
      await api.post("/recipes", {
        name: form.name,
        description: form.description,
        calories: Number(form.calories),
        protein_g: Number(form.protein_g),
        fat_g: Number(form.fat_g),
        carbs_g: Number(form.carbs_g),
        goal: form.goal,
        user_id: Number(user_id),
      });
      navigate("/recipes");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Nueva receta</h2>
        <p className="subtitle">Añade tu propia receta con sus macros</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Tortilla de claras"
              required
            />
          </div>
          <div className="form-group">
            <label>Descripcion</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe brevemente la receta..."
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Objetivo</label>
            <select name="goal" value={form.goal} onChange={handleChange}>
              <option value="cut">Definicion</option>
              <option value="bulk">Volumen</option>
              <option value="recomp">Recomposicion</option>
            </select>
          </div>
          <div className="form-group">
            <label>Calorias (kcal)</label>
            <input
              type="number"
              name="calories"
              value={form.calories}
              onChange={handleChange}
              placeholder="Ej: 450"
              required
            />
          </div>
          <div className="form-group">
            <label>Proteina (g)</label>
            <input
              type="number"
              name="protein_g"
              value={form.protein_g}
              onChange={handleChange}
              placeholder="Ej: 40"
              required
            />
          </div>
          <div className="form-group">
            <label>Grasa (g)</label>
            <input
              type="number"
              name="fat_g"
              value={form.fat_g}
              onChange={handleChange}
              placeholder="Ej: 12"
              required
            />
          </div>
          <div className="form-group">
            <label>Carbohidratos (g)</label>
            <input
              type="number"
              name="carbs_g"
              value={form.carbs_g}
              onChange={handleChange}
              placeholder="Ej: 50"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar receta"}
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate("/recipes")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipePage;