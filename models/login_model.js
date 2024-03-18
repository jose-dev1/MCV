import connection from './connection_database.js'
import bcrypt from 'bcrypt'
import { NotFoundUser, InvalidCredential } from '../squemas/errors_squemas.js'

export class LoginModel {
  static async login({ userCorreo, userPassword }) {
    try {
      const [usuario] = await connection.query(
        'SELECT BIN_TO_UUID(id_usuario) id_usuario, correo_usuario, password_usuario, link_foto_usuario, fecha_creacion_usuario, fecha_eliminacion, estado_usuario, anotacion_usuario, estado_verificacion_usuario, id_genero, id_tipo_usuario FROM usuarios WHERE correo_usuario = ?',
        [userCorreo]
      )

      if (!usuario) throw new NotFoundUser()
      if (usuario.length === 0) throw new NotFoundUser()

      const validacion = await bcrypt.compare(
        userPassword,
        usuario[0].password_usuario
      )
      if (!validacion) throw new InvalidCredential()

      return usuario[0]
    } catch (err) {
      console.log(err)
      return err
    }
  }
  static async getClientData({ userCorreo }) {
    try {
      console.log('Correo del usuario:', userCorreo)

      const [[userId]] = await connection.query(
        'SELECT BIN_TO_UUID(id_usuario) id_usuario FROM usuarios WHERE correo_usuario = ?',
        [userCorreo]
      )

      if (!userId) {
        throw new NotFoundUser('Usuario no encontrado')
      }

      const { id_usuario } = userId
      console.log('ID de usuario:', id_usuario)

      const [cliente] = await connection.query(
        'SELECT BIN_TO_UUID(id_cliente) id, numero_documento_cliente, id_tipo_documento, lugar_expedicion_documento, primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente, telefono_cliente, direccion_cliente, estado_cliente, anotacion_cliente, BIN_TO_UUID(id_usuario) id_usuario FROM clientes WHERE id_usuario = UUID_TO_BIN(?)',
        [id_usuario]
      )
      console.log('Cliente:', cliente)

      return cliente[0]
    } catch (err) {
      console.error('Error en getClientData:', err)
      throw err
    }
  }

}
