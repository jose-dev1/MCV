import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Registro from "./page/registro";
import Recuperar from "./page/recuperarpsw";
import Nuevapw from "./page/validarContraseña";
import Perfil from "./page/cliente/perfil";
import AddEmploye from "./page/admin/homeAdmin";
import Inicio from "./page/veterinario/home.jsx";
import Hospitalizaciones from './page/veterinario/hospitalizaciones.jsx'
import HomeAuxiliar from "./page/auxiliar/home.jsx";
import HomeGroomer from "./page/groomer/home.jsx";
import Mascota from "./page/cliente/mascota.jsx";
import Carnet from "./page/veterinario/carnetVacunas.jsx";
import { ProtectedRoute } from "./routes/routes.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contraseña" element={<Recuperar />} />
        <Route path="/actualizar-contraseña" element={<Nuevapw />} />
        <Route
          path="/perfil-usuario"
          element={<ProtectedRoute element={<Perfil />} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AddEmploye />} />}
        />
        <Route
          path="/veterinario"
          element={<ProtectedRoute element={<Inicio />} />}
        />
        <Route
          path="/hospitalizaciones"
          element={<ProtectedRoute element={<Hospitalizaciones />} />}
        />
        <Route
          path="/inicio-auxiliar"
          element={<ProtectedRoute element={<HomeAuxiliar />} />}
        />
        <Route
          path="/inicio-groomer"
          element={<ProtectedRoute element={<HomeGroomer />} />}
        />
        <Route
          path="/mascota-registrada"
          element={<ProtectedRoute element={<Mascota />} />}
        />

        <Route
          path="/Carnet-vacunas"
          element={<ProtectedRoute element={<Carnet />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
