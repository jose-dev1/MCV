/* eslint-disable camelcase */
import connection from './connection_database.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export class HistoriaClinicaModel {
  static async getAllHistoria ({ id }) {
    try {
      const [[historia]] = await connection.query(`SELECT 
            BIN_TO_UUID(rhc.id_registro_historia_clinica) id,
            rhc.fecha_registro_historia_clinica,
            rhc.registro_historia_clinica_finalizado,
            rhc.descripcion_registro_historia_clinica,
            rhc.estado_registro_historia_clinica,
            rhc.anotacion_registro_historia_clinica,
            BIN_TO_UUID(rhc.id_historia_clinica) AS id_historia_clinica,
            hc.fecha_creacion AS fecha_creacion_historia_clinica,
            BIN_TO_UUID(hc.id_mascota_historia) AS id_mascota_historia,
            s.descripcion_servicio AS descripcion_servicio
        FROM 
            registros_historias_clinicas rhc
        JOIN
            historias_clinicas hc ON rhc.id_historia_clinica = hc.id_historia_clinica
        JOIN
            servicios s ON rhc.id_servicio = s.id_servicio
        WHERE 
            rhc.id_registro_historia_clinica = UUID_TO_BIN(?)
        `, [id])
      if (!historia) throw new NoDataFound()
      if (historia.length === 0) throw new NoDataFound()
      return (historia)
    } catch (error) {
      return (error)
    }
  }

  static async getHistoria () {
    try {
      const [registroMascota] = await connection.query(`SELECT BIN_TO_UUID(id_historia_clinica) id, numero_documento_cliente, descripcion_documento, nombre_mascota, fecha_creacion, primer_nombre_cliente, primer_apellido_cliente
            FROM historias_clinicas
            INNER JOIN mascotas ON historias_clinicas.id_mascota_historia = mascotas.id_mascota
            INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
            INNER JOIN tipo_documento ON clientes.id_tipo_documento = tipo_documento.id_tipo_documento
            WHERE estado_mascota = "1"`)
      if (!registroMascota) throw new NoDataFound()
      if (registroMascota.length === 0) throw new NoDataFound()
      return (registroMascota)
    } catch (error) {
      return (error)
    }
  }

  static async createHistoria ({ input }) {
    const { registro_historia_clinica_finalizado, id_servicio, id_historia_clinica, notaServicio, estado_registro_historia_clinica } = input
    try {
      const [historia] = await connection.query('INSERT INTO registros_historias_clinicas (registro_historia_clinica_finalizado, id_servicio, id_historia_clinica, descripcion_registro_historia_clinica, estado_registro_historia_clinica) VALUES (?, ?, UUID_TO_BIN(?), ?, ?)',
        [registro_historia_clinica_finalizado, id_servicio, id_historia_clinica, notaServicio, estado_registro_historia_clinica])
      if (historia.affectedRows === 1) {
        return { success: true, message: 'Historia Clinica Creada Exitosamente' }
      } else {
        throw new Error('No se pudo insertar la Historia Clinica')
      }
    } catch (error) {
      return error
    }
  }

  static async updateHistoria ({ id, input }) {
    const { registro_historia_clinica_finalizado, notaServicio } = input
    try {
      const [historia] = await connection.query('UPDATE registros_historias_clinicas SET registro_historia_clinica_finalizado = ?, descripcion_registro_historia_clinica = ? WHERE id_registro_historia_clinica = UUID_TO_BIN(?)',
        [registro_historia_clinica_finalizado, notaServicio, id])
      if (historia.affectedRows === 1) {
        return { success: true, message: 'Historia Clinica Actualizada Exitosamente' }
      } else {
        throw new Error('No se pudo actualizar la Historia Clinica')
      }
    } catch (error) {
      return error
    }
  }

  static async deleteHistoria ({ id, input }) {
    const { anotacion } = input
    try {
      const [historia] = await connection.query(`UPDATE registros_historias_clinicas 
            SET anotacion_registro_historia_clinica = ?, estado_registro_historia_clinica = 0 
            WHERE id_registro_historia_clinica = UUID_TO_BIN(?)
            `, [anotacion, id])
      if (historia.affectedRows === 1) {
        return { success: true, message: 'Historia Clinica Eliminada Exitosamente' }
      } else {
        throw new Error('No se pudo eliminar la Historia Clinica')
      }
    } catch (error) {
      return error
    }
  }
}
