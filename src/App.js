import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Registro from "./page/registro";
import Recuperar from "./page/recuperarpsw";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />.
        <Route path="/Recuperar" element={<Recuperar />} />.
      </Routes>
    </BrowserRouter>
  );
}
export default App;
