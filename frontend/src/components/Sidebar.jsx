import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPlane, FaUserTie, FaUsers, FaUserCog } from "react-icons/fa";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">SkyTrack Airlines</h2>
      <nav className="sidebar-menu">
        <Link to="/inicio"><FaHome /> Inicio</Link>
        <Link to="/vuelos"><FaPlane /> Vuelos</Link>
        <Link to="/tripulacion"><FaUserTie /> Tripulación</Link>
        <Link to="/aviones"><FaPlane /> Aviones</Link>
        {user.role === "admin" && <Link to="/usuarios"><FaUserCog /> Usuarios</Link>}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-user">{user?.nombre || user?.email}</p>
        <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </aside>
  );
}
