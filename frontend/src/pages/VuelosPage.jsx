import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getVuelos, updateEstadoVuelo } from "../api/vuelos";
import axios from "axios";
import "../styles/vuelos.css";

export default function VuelosPage() {
  const { user } = useAuth();
  const [vuelos, setVuelos] = useState([]);
  const [aviones, setAviones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [vueloForm, setVueloForm] = useState({
    origen: "",
    destino: "",
    estado: "programado",
    avion: ""
  });
  const [error, setError] = useState("");

  // Filtros
  const [filtroOrigen, setFiltroOrigen] = useState("");
  const [filtroDestino, setFiltroDestino] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
    useEffect(() => {
    const fetchData = async () => {
      try {
        const vuelosData = await getVuelos(user.token);
        setVuelos(vuelosData);

        const avionesRes = await axios.get("http://localhost:3000/aviones", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setAviones(avionesRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);
    const handleFormChange = (e) => {
    setVueloForm({ ...vueloForm, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/vuelos`,
        vueloForm,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setVuelos([...vuelos, res.data]);
      setVueloForm({ origen: "", destino: "", estado: "programado", avion: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear vuelo");
    }
  };

  const handleEdit = (vuelo) => {
    setEditando(vuelo._id);
    setVueloForm({
      origen: vuelo.origen,
      destino: vuelo.destino,
      estado: vuelo.estado,
      avion: vuelo.avion?._id || vuelo.avion || "" // <-- ajuste aquí
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/vuelos/${editando}`,
        vueloForm,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setVuelos(vuelos.map((v) => (v._id === editando ? res.data : v)));
      setEditando(null);
      setVueloForm({ origen: "", destino: "", estado: "programado", avion: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar vuelo");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres dar de baja lógica este vuelo?")) return;
    try {
      await axios.delete(
        `http://localhost:3000/vuelos/${id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setVuelos(vuelos.filter((v) => v._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error al dar baja lógica");
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      const actualizado = await updateEstadoVuelo(id, nuevoEstado, user.token);
      setVuelos((prev) =>
        prev.map((vuelo) => (vuelo._id === id ? actualizado : vuelo))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar estado");
    }
  };
    if (loading) return <p>Cargando vuelos...</p>;

  const vuelosFiltrados = vuelos.filter((vuelo) => {
    const coincideOrigen = filtroOrigen
      ? vuelo.origen.toLowerCase().includes(filtroOrigen.toLowerCase())
      : true;
    const coincideDestino = filtroDestino
      ? vuelo.destino.toLowerCase().includes(filtroDestino.toLowerCase())
      : true;
    const coincideEstado = filtroEstado ? vuelo.estado === filtroEstado : true;
    return coincideOrigen && coincideDestino && coincideEstado && vuelo.activo !== false;
  });

  return (
    <div className="vuelos-container">
      <h2>Panel de Vuelos</h2>
      {error && <p className="error-message">{error}</p>}

      {/* Filtros */}
      <div className="filtros-container">
        <input
          type="text"
          placeholder="Filtrar por origen"
          value={filtroOrigen}
          onChange={(e) => setFiltroOrigen(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por destino"
          value={filtroDestino}
          onChange={(e) => setFiltroDestino(e.target.value)}
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="programado">Programado</option>
          <option value="embarcando">Embarcando</option>
          <option value="en vuelo">En vuelo</option>
          <option value="aterrizado">Aterrizado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Formulario */}
      {user.role === "admin" && (
        <form
          className="vuelos-form"
          onSubmit={editando ? handleUpdate : handleCreate}
        >
          <input
            type="text"
            name="origen"
            placeholder="Origen"
            value={vueloForm.origen}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="destino"
            placeholder="Destino"
            value={vueloForm.destino}
            onChange={handleFormChange}
            required
          />
          <select
            name="estado"
            value={vueloForm.estado}
            onChange={handleFormChange}
          >
            <option value="programado">Programado</option>
            <option value="embarcando">Embarcando</option>
            <option value="en vuelo">En vuelo</option>
            <option value="aterrizado">Aterrizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          <select
            name="avion"
            value={vueloForm.avion}
            onChange={handleFormChange}
            required
          >
            <option value="">Seleccionar avión</option>
            {aviones
              .filter((a) => a.estado === "disponible") // <-- solo aviones disponibles
              .map((a) => (
                <option key={a._id} value={a._id}>
                  {a.modelo}
                </option>
              ))}
          </select>
          <button type="submit" className="btn-edit">
            {editando ? "Guardar cambios" : "Crear vuelo"}
          </button>
          {editando && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setEditando(null)}
            >
              Cancelar
            </button>
          )}
        </form>
      )}
            {/* Tabla */}
      <table className="vuelos-table">
        <thead>
          <tr>
            <th>Origen</th>
            <th>Destino</th>
            <th>Estado</th>
            <th>Avión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vuelosFiltrados.map((vuelo) => (
            <tr key={vuelo._id}>
              <td data-label="Origen">{vuelo.origen}</td>
              <td data-label="Destino">{vuelo.destino}</td>
              <td
                data-label="Estado"
                className={`estado-${vuelo.estado.replace(" ", "-")}`}
              >
                {vuelo.estado}
              </td>
              <td data-label="Avión">
                {vuelo.avion && typeof vuelo.avion === "object"
                  ? vuelo.avion.modelo
                  : "Sin asignar"}
              </td>
              <td data-label="Acciones">
                {user.role === "operador" && (
                  <>
                    {vuelo.estado === "programado" && (
                      <button
                        className="btn-iniciar"
                        onClick={() => cambiarEstado(vuelo._id, "en vuelo")}
                      >
                        Iniciar vuelo
                      </button>
                    )}
                    {vuelo.estado === "en vuelo" && (
                      <button
                        className="btn-aterrizar"
                        onClick={() => cambiarEstado(vuelo._id, "aterrizado")}
                      >
                        Aterrizar
                      </button>
                    )}
                  </>
                )}

                {user.role === "admin" && (
                  <>
                    {vuelo.estado === "programado" && (
                      <button
                        className="btn-iniciar"
                        onClick={() => cambiarEstado(vuelo._id, "en vuelo")}
                      >
                        Iniciar vuelo
                      </button>
                    )}
                    {vuelo.estado === "en vuelo" && (
                      <button
                        className="btn-aterrizar"
                        onClick={() => cambiarEstado(vuelo._id, "aterrizado")}
                      >
                        Aterrizar
                      </button>
                    )}
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(vuelo)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(vuelo._id)}
                    >
                      Baja lógica
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
