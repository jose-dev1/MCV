import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/home'
import Login from './page/login'
import Registro from './page/registro'
import Recuperar from './page/recuperarpsw'
import Nuevapw from './page/validarContraseña'
import Perfil from './page/cliente/perfil'
import AddEmploye from './page/admin/homeAdmin'
import Inicio from './page/veterinario/home.jsx'
import HomeAuxiliar from './page/auxiliar/home.jsx'
import HomeGroomer from './page/groomer/home.jsx'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/recuperar-contraseña' element={<Recuperar />} />
        <Route path='/actualizar-contraseña' element={<Nuevapw />} />
        <Route path='/perfil-usuario' element={<Perfil />} />
        <Route path='/admin' element={<AddEmploye />} />
        <Route path='/veterinario' element={<Inicio />} />
        <Route path='/inicio-auxiliar' element={<HomeAuxiliar />} />
        <Route path='/inicio-groomer' element={<HomeGroomer />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
