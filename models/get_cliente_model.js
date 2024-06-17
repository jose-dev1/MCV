import connection from './connection_database.js'
import { NotFoundUser } from '../squemas/errors_squemas.js'

export class GetClienteModel {
  static async getCliente (id) {
    try {
      const [rows] = await connection.query(`
                SELECT 
                    BIN_TO_UUID(id_cliente) AS id,
                    numero_documento_cliente,
                    id_tipo_documento,
                    lugar_expedicion_documento,
                    primer_nombre_cliente,
                    segundo_nombre_cliente,
                    primer_apellido_cliente,
                    segundo_apellido_cliente,
                    telefono_cliente,
                    direccion_cliente,
                    estado_cliente,
                    anotacion_cliente,
                    BIN_TO_UUID(id_usuario) AS id_usuario
                FROM clientes
                WHERE numero_documento_cliente = ?
            `, [id])
      if (rows.length === 0) {
        throw new NotFoundUser()
      }
      return rows[0]
    } catch (error) {
      return error
    }
  }

  static async updateCliente (id, data) {
    try {
      const [rows] = await connection.query(`
                UPDATE clientes
                SET id_usuario = UUID_TO_BIN(?)
                WHERE numero_documento_cliente = ?
            `, [data.data, id])

      if (rows.affectedRows === 0) {
        throw new NotFoundUser()
      }

      const [updatedRows] = await connection.query(`
            SELECT 
            BIN_TO_UUID(id_cliente) AS id,
            numero_documento_cliente,
            id_tipo_documento,
            lugar_expedicion_documento,
            primer_nombre_cliente,
            segundo_nombre_cliente,
            primer_apellido_cliente,
            segundo_apellido_cliente,
            telefono_cliente,
            direccion_cliente,
            estado_cliente,
            anotacion_cliente,
            BIN_TO_UUID(id_usuario) AS id_usuario
        FROM clientes
        WHERE numero_documento_cliente = ?
            `, [id])

      if (updatedRows.length === 0) {
        throw new NotFoundUser()
      }
      return updatedRows[0]
    } catch (error) {
      return error
    }
  }
}
