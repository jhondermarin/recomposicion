import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { ActivityFactor, Profile } from "../types";

function ProfilePage() {
  const navigate = useNavigate();
  const [factors, setFactors] = useState<ActivityFactor[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");
  const [isExisting, setIsExisting] = useState(false);

  const [form, setForm] = useState({
    age: "",
    gender: "male",
    weight_kg: "",
    height_cm: "",
    activity_factor_id: "",
    goal: "recomp",
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      navigate("/register");
      return;
    }

    // Cargar factores y perfil existente en paralelo
    Promise.all([
      api.get<{ ok: boolean; data: ActivityFactor[] }>("/activity-factors"),
      api.get<{ ok: boolean; data: Profile }>(`/profiles/${user_id}`).catch(() => null)
    ]).then(([factorsRes, profileRes]) => {
      setFactors(factorsRes.data);

      if (profileRes?.data) {
        // Precargar el formulario con los datos existentes
        const p = profileRes.data;
        setForm({
          age: String(p.age),
          gender: p.gender,
          weight_kg: String(p.weight_kg),
          height_cm: String(p.height_cm),
          activity_factor_id: String(p.activity_factor_id),
          goal: p.goal,
        });
        setIsExisting(true);
      }
    }).catch(() => setError("Error al cargar los datos"))
      .finally(() => setLoadingProfile(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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
      if (isExisting) {
        await api.put(`/profiles/${user_id}`, {
          age: Number(form.age),
          gender: form.gender,
          weight_kg: Number(form.weight_kg),
          height_cm: Number(form.height_cm),
          activity_factor_id: Number(form.activity_factor_id),
          goal: form.goal,
        });
      } else {
        await api.post("/profiles", {
          user_id: Number(user_id),
          age: Number(form.age),
          gender: form.gender,
          weight_kg: Number(form.weight_kg),
          height_cm: Number(form.height_cm),
          activity_factor_id: Number(form.activity_factor_id),
          goal: form.goal,
        });
      }
      navigate("/results");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loadingProfile) return <div className="page"><p>Cargando...</p></div>;

  return (
    <div className="page">
      <div className="card">
        <h2>Tu perfil</h2>
        <p className="subtitle">
          {isExisting ? "Modifica los campos que quieras actualizar" : "Introduce tus datos para calcular tus macros"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Edad</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Ej: 25"
              required
            />
          </div>
          <div className="form-group">
            <label>Genero</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </div>
          <div className="form-group">
            <label>Peso (kg)</label>
            <input
              type="number"
              name="weight_kg"
              value={form.weight_kg}
              onChange={handleChange}
              placeholder="Ej: 70"
              required
            />
          </div>
          <div className="form-group">
            <label>Altura (cm)</label>
            <input
              type="number"
              name="height_cm"
              value={form.height_cm}
              onChange={handleChange}
              placeholder="Ej: 175"
              required
            />
          </div>
          <div className="form-group">
            <label>Nivel de actividad</label>
            <select
              name="activity_factor_id"
              value={form.activity_factor_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona...</option>
              {factors.map(f => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.description}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Objetivo</label>
            <select name="goal" value={form.goal} onChange={handleChange}>
              <option value="cut">Definicion (deficit 10%)</option>
              <option value="bulk">Volumen (superavit 10%)</option>
              <option value="recomp">Recomposicion (deficit leve)</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : isExisting ? "Actualizar" : "Ver resultados"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;