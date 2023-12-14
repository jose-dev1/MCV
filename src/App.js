import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Registro from "./page/registro";
import Recuperar from "./page/recuperarpsw";
import Nuevapw from "./page/validarContraseña";
import Perfil from "./page/cliente/perfil";
import AddEmploye from "./page/admin/homeAdmin";
import Inicio from "./page/veterinario/home.jsx";
import Hospitalizaciones from "./page/veterinario/hospitalizaciones.jsx";
import HomeAuxiliar from "./page/auxiliar/home.jsx";
import HomeGroomer from "./page/groomer/home.jsx";
import Mascota from "./page/cliente/mascota.jsx";
import Carnet from "./page/veterinario/carnetVacunas";
import DescargarCerficado from "./page/cliente/descargarCertificado";
import DescargarExamen from "./page/cliente/descargarExamen";
import { ProtectedRoute } from "./routes/routes.js";
import Examenes from "./page/veterinario/examenes.jsx";
import GestionarCitas from "./page/auxiliar/GestionCitas.jsx";
import AgendaVeterinario from "./page/veterinario/agenda.jsx";
import Servicioprestado from "./page/groomer/servicio-prestado";
import Factura from "./page/auxiliar/factura.jsx";
import HistoriaClinica from "./page/veterinario/historiaClinica.jsx";
import AgendaGroomer from "./page/groomer/agendaGro";

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
          path="/examenes-medicos"
          element={<ProtectedRoute element={<Examenes />} />}
        />
        <Route
          path="/Carnet-vacunas"
          element={<ProtectedRoute element={<Carnet />} />}
        />
        <Route
          path="/agenda-veterinario"
          element={<ProtectedRoute element={<AgendaVeterinario />} />}
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
          path="/servicio-prestado"
          element={<ProtectedRoute element={<Servicioprestado />} />}
        />

        <Route
          path="/mascota-registrada"
          element={<ProtectedRoute element={<Mascota />} />}
        />

        <Route
          path="/descargar-certificado"
          element={<ProtectedRoute element={<DescargarCerficado />} />}
        />
        <Route
          path="/descargar-examen"
          element={<ProtectedRoute element={<DescargarExamen />} />}
        />
        <Route
          path="/gestionar-citas"
          element={<ProtectedRoute element={<GestionarCitas />} />}
        />
        <Route
          path="/factura"
          element={<ProtectedRoute element={<Factura />} />}
        />
        <Route
          path="/historia-clinica"
          element={<ProtectedRoute element={<HistoriaClinica />} />}
        />
         <Route
          path="/agenda-groomer"
          element={<ProtectedRoute element={<AgendaGroomer />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
