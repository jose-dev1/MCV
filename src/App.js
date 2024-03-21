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
import GesionarAgenda from "./page/auxiliar/GestionarAgenda.jsx";
import HomeGroomer from "./page/groomer/home.jsx";
import Mascota from "./page/cliente/mascota.jsx";
import Carnet from "./page/veterinario/carnetVacunas";
import DescargarCerficado from "./page/cliente/descargarCertificado";
import DescargarExamen from "./page/cliente/descargarExamen";
import { ProtectedRoute } from "./routes/routes.js";
import Examenes from "./page/veterinario/examenes.jsx";
import ServicioMascota from "./page/veterinario/servicioMascota.jsx";
import GestionarAsistencia from "./page/auxiliar/GestionAsistencia.jsx";
import AgendaVeterinario from "./page/veterinario/agenda.jsx";
import Servicioprestado from "./page/groomer/servicio-prestado";
import Factura from "./page/auxiliar/factura.jsx";
import AgendarCita from "./page/cliente/agendarCita.jsx";
import HistoriaClinica from "./page/veterinario/historiaClinica.jsx";
import AgendaGroomer from "./page/groomer/agendaGro";
import Desparacitacion from "./page/veterinario/desparacitacion.jsx";
import Verificacion from "./page/verifcacion_cuenta.jsx";
import GestionMascota from "./page/veterinario/gestionMascota.jsx";
import Certificado from "./page/veterinario/cerficado.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contraseña" element={<Recuperar />} />
        <Route path="/actualizar-contraseña" element={<Nuevapw />} />
        <Route path="/verificar-cuenta" element={<Verificacion />} />
        <Route
          path="/perfil-usuario"
          element={<ProtectedRoute element={<Perfil />} requiredUserRole={2} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AddEmploye />} requiredUserRole={1} />
          }
        />
        <Route
          path="/veterinario"
          element={<ProtectedRoute element={<Inicio />} requiredUserRole={4} />}
        />
        <Route
          path="/Gestionar-mascotas"
          element={<ProtectedRoute element={<GestionMascota />} requiredUserRole={4} />}
        />

        <Route
          path="/hospitalizaciones"
          element={
            <ProtectedRoute
              element={<Hospitalizaciones />}
              requiredUserRole={4}
            />
          }
        />
        <Route
          path="/examenes-medicos"
          element={
            <ProtectedRoute element={<Examenes />} requiredUserRole={4} />
          }
        />
        <Route
          path="/Servicio-Mascota"
          element={
            <ProtectedRoute element={<ServicioMascota />} requiredUserRole={4} />
          }
        />
        <Route
          path="/Carnet-vacunas"
          element={<ProtectedRoute element={<Carnet />} requiredUserRole={4} />}
        />
        <Route
          path="/agenda-veterinario"
          element={
            <ProtectedRoute
              element={<AgendaVeterinario />}
              requiredUserRole={4}
            />
          }
        />
        <Route
          path="/inicio-auxiliar"
          element={
            <ProtectedRoute element={<HomeAuxiliar />} requiredUserRole={3} />
          }
        />

        <Route
          path="/gestionar-agenda"
          element={
            <ProtectedRoute element={<GesionarAgenda />} requiredUserRole={3} />
          }
        />
        <Route
          path="/inicio-groomer"
          element={
            <ProtectedRoute element={<HomeGroomer />} requiredUserRole={5} />
          }
        />

        <Route
          path="/servicio-prestado"
          element={
            <ProtectedRoute
              element={<Servicioprestado />}
              requiredUserRole={5}
            />
          }
        />

        <Route
          path="/mascota-registrada"
          element={
            <ProtectedRoute element={<Mascota />} requiredUserRole={2} />
          }
        />

        <Route
          path="/descargar-certificado"
          element={
            <ProtectedRoute
              element={<DescargarCerficado />}
              requiredUserRole={2}
            />
          }
        />
        <Route
          path="/descargar-examen"
          element={
            <ProtectedRoute
              element={<DescargarExamen />}
              requiredUserRole={2}
            />
          }
        />
        <Route
          path="/gestionar-asistencia"
          element={
            <ProtectedRoute element={<GestionarAsistencia />} requiredUserRole={3} />
          }
        />
        <Route
          path="/agendar-cita"
          element={
            <ProtectedRoute element={<AgendarCita />} requiredUserRole={2} />
          }
        />
        <Route
          path="/factura"
          element={
            <ProtectedRoute element={<Factura />} requiredUserRole={3} />
          }
        />
        <Route
          path="/historia-clinica"
          element={
            <ProtectedRoute
              element={<HistoriaClinica />}
              requiredUserRole={3}
            />
          }
        />
        <Route
          path="/agenda-groomer"
          element={
            <ProtectedRoute element={<AgendaGroomer />} requiredUserRole={5} />
          }
        />
        <Route
          path="/desparacitacion"
          element={
            <ProtectedRoute
              element={<Desparacitacion />}
              requiredUserRole={4}
            />
          }
        />
                <Route
          path="/certificados"
          element={
            <ProtectedRoute
              element={<Certificado />}
              requiredUserRole={4}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
