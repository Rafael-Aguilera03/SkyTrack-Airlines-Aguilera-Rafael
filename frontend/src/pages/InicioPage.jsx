import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlaneDeparture, FaPlane, FaPlaneArrival } from "react-icons/fa"; 
import "../styles/inicio.css";

export default function InicioPage() {
  const { user } = useAuth();
  const [programados, setProgramados] = useState([]);
  const [enVuelo, setEnVuelo] = useState([]);
  const [aterrizados, setAterrizados] = useState([]);

  useEffect(() => {
    const fetchVuelos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/vuelos", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const vuelos = res.data;

        setProgramados(vuelos.filter(v => v.estado && v.estado.toLowerCase() === "programado"));
        setEnVuelo(vuelos.filter(v => v.estado && v.estado.toLowerCase() === "en vuelo"));
        setAterrizados(vuelos.filter(v => v.estado && v.estado.toLowerCase() === "aterrizado"));
      } catch (error) {
        console.error("Error al cargar vuelos:", error);
      }
    };

    fetchVuelos();
  }, [user.token]);

  return (
    <div className="inicio-container">
      <h2>Bienvenido {user.nombre}</h2>
      <p>Resumen de operaciones actuales:</p>
      <div className="cards">
        <div className="card programados">
          <FaPlaneDeparture className="icon" />
          <h3>Programados</h3>
          {programados.length > 0 ? (
            <p>{programados.length} vuelos</p>
          ) : (
            <p>Vuelos aún no disponibles</p>
          )}
        </div>
        <div className="card en-vuelo">
          <FaPlane className="icon" />
          <h3>En vuelo</h3>
          {enVuelo.length > 0 ? (
            <p>{enVuelo.length} vuelos</p>
          ) : (
            <p>Vuelos aún no disponibles</p>
          )}
        </div>
        <div className="card aterrizados">
          <FaPlaneArrival className="icon" />
          <h3>Aterrizados</h3>
          {aterrizados.length > 0 ? (
            <p>{aterrizados.length} vuelos</p>
          ) : (
            <p>Vuelos aún no disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
