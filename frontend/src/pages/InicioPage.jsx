import { useAuth } from "../context/AuthContext";
import "../styles/inicio.css";

export default function InicioPage() {
  const { user } = useAuth();

  return (
    <div className="inicio-container">
      <h2>Bienvenido {user.nombre}</h2>
      <p>Selecciona una sección en la barra lateral para comenzar.</p>
    </div>
  );
}
