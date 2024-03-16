import { LoginModel } from '../models/login_model.js'
import { NotFoundUser, InvalidCredential } from '../squemas/errors_squemas.js'

export class LoginController {
  static async login(req, res) {
    const { userCorreo, userPassword } = req.body
    const response = await LoginModel.login({ userCorreo, userPassword })
    const clientData = await LoginModel.getClientData({ userCorreo });
    if (response instanceof NotFoundUser) {
      res.status(404).json({ menssage: 'Usuario no registrado' })
    } else if (response instanceof InvalidCredential) {
      res.status(400).json({ menssage: 'Credenciales invalidas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      const userData = response;
      res.json({
        success: true,
        role: userData.id_tipo_usuario,
        user: userData,
        client: clientData,
        message: 'Inicio de sesion exitoso'
      })
    }
  }


}
