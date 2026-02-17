import { useEffect, useState } from "react";
import { getAviones, createAvion, updateAvion } from "../api/aviones";
import "../styles/aviones.css";
import { useAuth } from "../context/AuthContext";

function AvionesPage({ role }) {
  const { user } = useAuth();
  const [aviones, setAviones] = useState([]);
  const [formAvion, setFormAvion] = useState({
    modelo: "",
    capacidad: "",
    estado: "disponible"
  });
  const [editando, setEditando] = useState(null);

  // Cargar aviones desde backend
  useEffect(() => {
    getAviones(user.token)
      .then(setAviones)
      .catch(err => console.error("Error al cargar aviones:", err));
  }, [user.token]);

  const handleChange = (e) => {
    setFormAvion({ ...formAvion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editando) {
        const actualizado = await updateAvion(editando._id, formAvion, user.token);
        setAviones(aviones.map(a => a._id === actualizado._id ? actualizado : a));
        setEditando(null);
      } else {
        const nuevo = await createAvion(
          {
            modelo: formAvion.modelo,
            capacidad: Number(formAvion.capacidad),
            estado: formAvion.estado
          },
          user.token
        );
        setAviones([...aviones, nuevo]);
      }
      setFormAvion({ modelo: "", capacidad: "", estado: "disponible" });
    } catch (err) {
      console.error("Error al guardar avión:", err);
    }
  };

  const handleEdit = (avion) => {
    setEditando(avion);
    setFormAvion({
      modelo: avion.modelo,
      capacidad: avion.capacidad,
      estado: avion.estado
    });
  };

  return (
    <div className="aviones-container">
      <h2>Gestión de Aviones</h2>

      {role?.toLowerCase() === "admin" && (
        <div className="aviones-form">
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formAvion.modelo}
            onChange={handleChange}
          />
          <input
            type="number"
            name="capacidad"
            placeholder="Capacidad"
            value={formAvion.capacidad}
            onChange={handleChange}
          />
          <select
            name="estado"
            value={formAvion.estado}
            onChange={handleChange}
          >
            <option value="disponible">Disponible</option>
            <option value="en vuelo">En Vuelo</option>
            <option value="en mantenimiento">En Mantenimiento</option>
          </select>
          <button onClick={handleSubmit}>
            {editando ? "Guardar Cambios" : "Agregar Avión"}
          </button>
          {editando && (
            <button onClick={() => {
              setEditando(null);
              setFormAvion({ modelo: "", capacidad: "", estado: "disponible" });
            }}>
              Cancelar
            </button>
          )}
        </div>
      )}

      <table className="aviones-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th>Estado</th>
            {role?.toLowerCase() === "admin" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {aviones.map((avion) => (
            <tr key={avion._id}>
              <td>{avion.modelo}</td>
              <td>{avion.capacidad}</td>
              <td className={`estado-${avion.estado?.replace(" ", "-")}`}>
                {avion.estado}
              </td>
              {role?.toLowerCase() === "admin" && (
                <td>
                  <button onClick={() => handleEdit(avion)}>Editar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvionesPage;
