import { NoDataFound } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'

export class GroomerServicesModel {
  static async getAllServices () {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(id_servicio_groomer) id,  fecha_servicio_groomer, contenido_servicio_groomer, estado_servicio_groomer, anotacion_servicio_groomer, servicio_finalizado_groomer, nombre_mascota, descripcion_servicio, primer_nombre_cliente, primer_apellido_cliente
      FROM servicios_groomer
      INNER JOIN mascotas ON servicios_groomer.id_mascota = mascotas.id_mascota
      INNER JOIN servicios ON servicios_groomer.id_servicio = servicios.id_servicio
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente;`)

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async getServiceById ({ id }) {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(id_servicio_groomer) id,  fecha_servicio_groomer, contenido_servicio_groomer, estado_servicio_groomer, anotacion_servicio_groomer, servicio_finalizado_groomer, nombre_mascota, descripcion_servicio, primer_nombre_cliente, primer_apellido_cliente
      FROM servicios_groomer
      INNER JOIN mascotas ON servicios_groomer.id_mascota = mascotas.id_mascota
      INNER JOIN servicios ON servicios_groomer.id_servicio = servicios.id_servicio
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente;
      WHERE id_servicio_groomer = UUID_TO_BIN(?)`, [id])

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async createService (input) {
    try {
      const [res] = connection.query('INSERT INTO servicios_groomer (contenido_servicio_groomer, )')
    } catch (err) {
      return err
    }
  }
}
