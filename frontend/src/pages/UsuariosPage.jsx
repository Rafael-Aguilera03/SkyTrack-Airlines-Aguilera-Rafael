import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/usuarios.css";

export default function UsuariosPage() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    email: "",
    rol: "operador",
    password: ""
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:3000/usuarios", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsuarios(res.data);
      } catch (err) {
        console.error("Error al cargar usuarios", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, [user]);

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/usuarios", nuevoUsuario, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsuarios([...usuarios, res.data]);
      setNuevoUsuario({ nombre: "", email: "", rol: "operador", password: "" });
    } catch (err) {
      console.error("Error al crear usuario", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await axios.delete(`http://localhost:3000/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsuarios(usuarios.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  const handleEdit = (usuario) => {
    setEditando(usuario._id);
    setNuevoUsuario({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      password: "" 
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/usuarios/${editando}`,
        nuevoUsuario,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUsuarios(
        usuarios.map((u) => (u._id === editando ? res.data : u))
      );
      setEditando(null);
      setNuevoUsuario({ nombre: "", email: "", rol: "operador", password: "" });
    } catch (err) {
      console.error("Error al actualizar usuario", err);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="usuarios-container">
      <h2>Gestión de Usuarios</h2>

      <form
        className="usuarios-form"
        onSubmit={editando ? handleUpdate : handleSubmit}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={handleChange}
          required
        />
        <select
          name="rol"
          value={nuevoUsuario.rol}
          onChange={handleChange}
        >
          <option value="operador">Operador</option>
          <option value="admin">Administrador</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={handleChange}
          required={!editando}
        />
        <button type="submit">
          {editando ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
        {editando && (
          <button
            type="button"
            className="btn-cancel"
            onClick={() => {
              setEditando(null);
              setNuevoUsuario({ nombre: "", email: "", rol: "operador", password: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(u)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(u._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
