import { NoDataFound, AccountAlreadyDisable } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'

export class GroomerServicesModel {
  static async getAllServices () {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(id_servicio_groomer) id,  fecha_servicio_groomer, contenido_servicio_groomer, estado_servicio_groomer, anotacion_servicio_groomer, servicio_finalizado_groomer, nombre_mascota, descripcion_servicio, primer_nombre_cliente, primer_apellido_cliente
      FROM servicios_groomer
      INNER JOIN mascotas ON servicios_groomer.id_mascota = mascotas.id_mascota
      INNER JOIN servicios ON servicios_groomer.id_servicio = servicios.id_servicio
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente 
      WHERE estado_servicio_groomer = 1;`)

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async getServiceById ({ id }) {
    try {
      const [[res]] = await connection.query(`SELECT BIN_TO_UUID(id_servicio_groomer) id, primer_nombre_cliente,  primer_apellido_cliente,  fecha_servicio_groomer, contenido_servicio_groomer, estado_servicio_groomer, anotacion_servicio_groomer, servicio_finalizado_groomer, nombre_mascota, descripcion_servicio, id_tipo_documento , numero_documento_cliente
      FROM servicios_groomer
      INNER JOIN mascotas ON servicios_groomer.id_mascota = mascotas.id_mascota
      INNER JOIN servicios ON servicios_groomer.id_servicio = servicios.id_servicio
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
      WHERE id_servicio_groomer = UUID_TO_BIN(?)`, [id])

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async createService ({ input }) {
    const { notaServicio, anotacionServicio, servicioFinalizado, idMascota, idServicio } = input
    try {
      // Ejecutar la consulta SQL para insertar un nuevo servicio
      const [res] = await connection.query(`
            INSERT INTO servicios_groomer (contenido_servicio_groomer, anotacion_servicio_groomer, servicio_finalizado_groomer, estado_servicio_groomer, id_mascota, id_servicio)
            VALUES (?, ?, ?, 1, UUID_TO_BIN(?), ?)
        `, [notaServicio, anotacionServicio, servicioFinalizado, idMascota, idServicio])
      if (res.affectedRows === 1) {
        return { success: true, message: 'Servicio creado exitosamente' }
      } else {
        throw new Error('No se pudo insertar el servicio')
      }
    } catch (err) {
      return err
    }
  }

  static async updateServis ({ id, input }) {
    const { notaServicio, servicioFinalizado } = input
    try {
      const [[existeServicio]] = await connection.query('SELECT estado_servicio_groomer FROM servicios_groomer  WHERE id_servicio_groomer = UUID_TO_BIN(?) AND estado_servicio_groomer = 1',
        [id])
      if (!existeServicio) throw new Error('El servicio no existe.')

      const [updateServis] = await connection.query('UPDATE servicios_groomer SET servicio_finalizado_groomer = ?, contenido_servicio_groomer = ? WHERE id_servicio_groomer = UUID_TO_BIN(?)',
        [servicioFinalizado, notaServicio, id]
      )
      return updateServis
    } catch (error) {
      return error
    }
  }

  static async descativarServi ({ id, input }) {
    try {
      const { anotacion } = input

      const [[estadoServi]] = await connection.query('SELECT estado_servicio_groomer FROM servicios_groomer WHERE id_servicio_groomer = UUID_TO_BIN(?)', [id])
      if (!estadoServi) throw new NoDataFound()
      if (estadoServi.estado_servicio_groomer !== 1) throw new AccountAlreadyDisable()

      const [res] = await connection.query('UPDATE servicios_groomer SET estado_servicio_groomer = 0, anotacion_servicio_groomer = ? WHERE id_servicio_groomer = UUID_TO_BIN(?)', [anotacion, id])

      return res
    } catch (err) {
      return (err)
    }
  }
}
