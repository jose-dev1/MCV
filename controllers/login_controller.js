import { LoginModel } from '../models/login_model.js'
import { NotFoundUser, InvalidCredential } from '../squemas/errors_squemas.js'

export class LoginController {
  static async login(req, res) {
    const { userCorreo, userPassword } = req.body
    const response = await LoginModel.login({ userCorreo, userPassword })
    if (response instanceof NotFoundUser) return res.status(404).json({ message: 'Usuario no registrado' })
    if (response instanceof InvalidCredential) return res.status(400).json({ menssage: 'Credenciales invalidas' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error interno del servidor ' })


    const userData = response;
    if (userData.id_tipo_usuario === 2) {
      const clientData = await LoginModel.getClientData({ userCorreo });
      res.json({
        success: true,
        role: userData.id_tipo_usuario,
        user: userData,
        client: clientData,
        message: 'Inicio de sesion exitoso'
      })
    } else {
      const empleadoData = await LoginModel.getEmployeeData({ userCorreo });
      res.json({
        success: true,
        role: userData.id_tipo_usuario,
        user: userData,
        client: empleadoData,
        message: 'Inicio de sesion exitoso'
      })
    }
  }
}



