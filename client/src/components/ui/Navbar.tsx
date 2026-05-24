import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("user_id");
    navigate("/register");
  }

  // No mostrar navbar en la página de registro
  if (location.pathname === "/register") return null;

  return (
    <nav className="navbar">
      <span className="navbar-brand">Recomposicion App</span>
      <div className="navbar-links">
        <button
          className={`nav-btn ${location.pathname === "/profile" ? "active" : ""}`}
          onClick={() => navigate("/profile")}
        >
          Perfil
        </button>
        <button
          className={`nav-btn ${location.pathname === "/results" ? "active" : ""}`}
          onClick={() => navigate("/results")}
        >
          Resultados
        </button>
        <button className="nav-btn logout" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;