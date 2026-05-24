import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { User } from "../types";

function RegisterPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post<{ ok: boolean; data: User }>("/users/login", { username });
        localStorage.setItem("user_id", String(res.data.id));
        navigate("/results");
      } else {
        const res = await api.post<{ ok: boolean; data: User }>("/users", { username, email });
        localStorage.setItem("user_id", String(res.data.id));
        navigate("/profile");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>{isLogin ? "Bienvenido de nuevo" : "Crear cuenta"}</h2>
        <p className="subtitle">
          {isLogin
            ? "Accede para ver tus resultados"
            : "Crea tu cuenta para calcular tu recomposicion"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Tu nombre de usuario"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
          )}

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading
              ? "Cargando..."
              : isLogin ? "Entrar" : "Continuar"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--color-text-soft)" }}>
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          {" "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={{ color: "var(--color-primary)", cursor: "pointer", fontWeight: 600 }}
          >
            {isLogin ? "Registrate" : "Inicia sesion"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;