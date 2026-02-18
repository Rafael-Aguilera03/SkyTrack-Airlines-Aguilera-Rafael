// src/pages/TripulacionPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  assignTripulanteToVuelo,
  removeTripulanteFromVuelo,
  getTripulacion
} from "../api/tripulacion";
import "../styles/tripulacion.css";

export default function TripulacionPage() {
  const { user } = useAuth();
  const [tripulacion, setTripulacion] = useState([]);
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoTripulante, setNuevoTripulante] = useState({
    nombre: "",
    rol: "piloto",
    activo: true
  });
  const [editando, setEditando] = useState(null);
    // Cargar tripulación y vuelos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTrip = await getTripulacion(user.token);
        setTripulacion(resTrip.filter((t) => t.activo));

        const resVuelos = await axios.get("http://localhost:3000/vuelos", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setVuelos(resVuelos.data);
      } catch (err) {
        console.error("Error al cargar datos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // CRUD solo admin
  const handleChange = (e) => {
    setNuevoTripulante({ ...nuevoTripulante, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/tripulacion", nuevoTripulante, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTripulacion([...tripulacion, res.data]);
      setNuevoTripulante({ nombre: "", rol: "piloto", activo: true });
    } catch (err) {
      console.error("Error al crear tripulante", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres dar de baja este tripulante?")) return;
    try {
      await axios.delete(`http://localhost:3000/tripulacion/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTripulacion(tripulacion.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error al eliminar tripulante", err);
    }
  };

  const handleEdit = (trip) => {
    setEditando(trip._id);
    setNuevoTripulante({
      nombre: trip.nombre,
      rol: trip.rol,
      activo: trip.activo
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/tripulacion/${editando}`,
        nuevoTripulante,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTripulacion(
        tripulacion.map((t) => (t._id === editando ? res.data : t))
      );
      setEditando(null);
      setNuevoTripulante({ nombre: "", rol: "piloto", activo: true });
    } catch (err) {
      console.error("Error al actualizar tripulante", err);
    }
  };
    // Asignar/quitar tripulantes en vuelos (admin y operador)
  const handleAsignar = async (vueloId, tripulanteId) => {
    try {
      await assignTripulanteToVuelo(vueloId, tripulanteId, user.token);
      const resVuelos = await axios.get("http://localhost:3000/vuelos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVuelos(resVuelos.data);
    } catch (err) {
      alert("Error al asignar tripulante: " + err.response?.data?.message);
    }
  };

  const handleRemover = async (vueloId, tripulanteId) => {
    try {
      await removeTripulanteFromVuelo(vueloId, tripulanteId, user.token);
      const resVuelos = await axios.get("http://localhost:3000/vuelos", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVuelos(resVuelos.data);
    } catch (err) {
      alert("Error al remover tripulante: " + err.response?.data?.message);
    }
  };

  if (loading) return <p>Cargando datos...</p>;
    return (
    <div className="tripulacion-container">
      
      {/* Sección exclusiva para admin */}
      {user.role === "admin" && (
        <>
          <h2>Gestión de Tripulación</h2>
          <form
            className="tripulacion-form"
            onSubmit={editando ? handleUpdate : handleSubmit}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={nuevoTripulante.nombre}
              onChange={handleChange}
              required
            />
            <select
              name="rol"
              value={nuevoTripulante.rol}
              onChange={handleChange}
            >
              <option value="piloto">Piloto</option>
              <option value="copiloto">Copiloto</option>
              <option value="tripulante de cabina">Tripulante de cabina</option>
            </select>
            <button type="submit">
              {editando ? "Actualizar Tripulante" : "Agregar Tripulante"}
            </button>
            {editando && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setEditando(null);
                  setNuevoTripulante({ nombre: "", rol: "piloto", activo: true });
                }}
              >
                Cancelar
              </button>
            )}
          </form>

          <table className="tripulacion-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tripulacion.map((t) => (
                <tr key={t._id}>
                  <td>{t.nombre}</td>
                  <td>{t.rol}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(t)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(t._id)}>Baja lógica</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Sección de asignación visible para operador y admin */}
      {(user.role === "operador" || user.role === "admin") && (
        <>
          <h2 className={`asignacion-title ${user.role === "admin" ? "espaciado" : ""}`}>
            Asignación de Tripulación a Vuelos
          </h2>

          <table className="vuelos-table" aria-label="Asignación de Tripulación">
            <thead>
              <tr>
                <th>Origen</th>
                <th>Destino</th>
                <th>Avión</th>
                <th>Tripulación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vuelos.map((vuelo) => (
                <tr key={vuelo._id}>
                  <td>{vuelo.origen}</td>
                  <td>{vuelo.destino}</td>
                  <td>{vuelo.avion?.modelo}</td>
                  <td>
                    {vuelo.tripulacion?.map((t) => (
                      <span key={t._id} className="trip-item">
                        {t.nombre} ({t.rol})
                        {(user.role === "operador" || user.role === "admin") && (
                          <button
                            className="btn-remove"
                            onClick={() => handleRemover(vuelo._id, t._id)}
                          >
                            X
                          </button>
                        )}
                      </span>
                    ))}
                  </td>

                  <td>
                    {(user.role === "operador" || user.role === "admin") && (
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAsignar(vuelo._id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      >
                        <option value="">Asignar tripulante...</option>
                        {tripulacion
                          .filter(
                            (t) =>
                              !vuelos.some((v) =>
                                v.tripulacion?.some(
                                  (asignado) => asignado._id === t._id
                                )
                              )
                          )
                          .map((t) => (
                            <option key={t._id} value={t._id}>
                              {t.nombre} - {t.rol}
                            </option>
                          ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}