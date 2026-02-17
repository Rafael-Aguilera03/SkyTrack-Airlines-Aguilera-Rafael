import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import InicioPage from "./pages/InicioPage";
import VuelosPage from "./pages/VuelosPage";
import TripulacionPage from "./pages/TripulacionPage";
import AvionesPage from "./pages/AvionesPage";
import UsuariosPage from "./pages/UsuariosPage";
import Layout from "./components/Layout";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de login siempre disponible */}
        <Route path="/login" element={<LoginPage />} />

        {user ? (
          <Route element={<Layout />}>
            <Route path="/inicio" element={<InicioPage role={user.role} />} />
            <Route path="/vuelos" element={<VuelosPage role={user.role} />} />
            <Route path="/tripulacion" element={<TripulacionPage role={user.role} />} />
            <Route path="/aviones" element={<AvionesPage role={user.role} />} />
            
            {/* Solo admin puede acceder a Usuarios */}
            {user.role?.toLowerCase() === "admin" && (
              <Route path="/usuarios" element={<UsuariosPage role={user.role} />} />
            )}

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/inicio" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
