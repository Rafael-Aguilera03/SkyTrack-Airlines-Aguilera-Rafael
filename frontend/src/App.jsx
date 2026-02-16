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
            <Route path="/inicio" element={<InicioPage />} />
            <Route path="/vuelos" element={<VuelosPage />} />
            <Route path="/tripulacion" element={<TripulacionPage />} />
            <Route path="/aviones" element={<AvionesPage />} />
            {user.role === "admin" && (
              <Route path="/usuarios" element={<UsuariosPage />} />
            )}
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
