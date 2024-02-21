import connection from './connection_database.js'
import bcrypt from 'bcrypt'
import { NotFoundUser, InvalidCredential } from '../squemas/errors_squemas.js'

export class LoginModel {
  static async login ({ userCorreo, userPassword }) {
    try {
      const [usuario] = await connection.query('SELECT * FROM Usuarios WHERE u_correo = ?', [userCorreo])

      if (!usuario) throw new NotFoundUser()
      if (usuario.length === 0) throw new NotFoundUser()

      const validacion = await bcrypt.compare(userPassword, usuario[0].u_password)
      if (!validacion) throw new InvalidCredential()

      return usuario[0]
    } catch (err) {
      return (err)
    }
  }
}
