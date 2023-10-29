import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Registro from "./page/registro";
import Recuperar from "./page/recuperarpsw";
import Nuevapw from "./page/validarContraseña";
import Perfil from "./page/cliente/perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Recuperar" element={<Recuperar />} />
        <Route path="/actualizarPw" element={<Nuevapw />} />
        <Route path="/perfilUsuario" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
