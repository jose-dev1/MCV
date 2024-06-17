/* eslint-disable camelcase */
import connection from './connection_database.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export class MascotasModel {
  static async getAllRazas () {
    const [rows] = await connection.execute('SELECT * FROM tipo_mascota')
    if (!rows) throw new NoDataFound()
    if (rows.length === 0) throw new NoDataFound()
    return rows
  }

  static async getAllGeneros () {
    const [rows] = await connection.execute('SELECT * FROM genero_mascota')
    if (!rows) throw new NoDataFound()
    if (rows.length === 0) throw new NoDataFound()
    return rows
  }

  static async getCliente ({ documento }) {
    try {
      const [clientes] = await connection.query('SELECT * FROM clientes WHERE numero_documento_cliente = ?', [documento])

      if (!clientes) throw new NoDataFound()
      if (clientes.length === 0) throw new NoDataFound()

      return clientes
    } catch (error) {
      return (error)
    }
  }

  static async newMascota ({
    nombre_mascota,
    fecha_nacimiento_mascota,
    tipo_sangre_mascota,
    color_mascota,
    raza_mascota,
    peso_mascota,
    tamanno_mascota,
    microchip_mascota,
    foto_mascota,
    estado_mascota,
    anotacion_mascota,
    id_cliente_mascota,
    id_tipo_mascota,
    id_genero_mascota
  }) {
    try {
      const [[idUsuario]] = await connection.query('SELECT BIN_TO_UUID(id_cliente) id_cliente FROM clientes WHERE numero_documento_cliente = ?', [id_cliente_mascota])
      const { id_cliente: id_new_cliente } = idUsuario
      await connection.query('INSERT INTO mascotas (nombre_mascota, fecha_nacimiento_mascota, tipo_sangre_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, microchip_mascota, foto_mascota, estado_mascota, anotacion_mascota, id_cliente_mascota, id_tipo_mascota, id_genero_mascota ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, UUID_TO_BIN(?), ?, ?)',
        [nombre_mascota, fecha_nacimiento_mascota, tipo_sangre_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, foto_mascota, estado_mascota, anotacion_mascota, id_new_cliente, id_tipo_mascota, id_genero_mascota])

      return { success: true }
    } catch (error) {
      return { error: 'Error interno del servidor' }
    }
  }

  static async getAllMascotas ({ id }) {
    try {
      const [mascotas] = await connection.query(`SELECT BIN_TO_UUID(id_mascota) id, nombre_mascota, foto_mascota , fecha_nacimiento_mascota, raza_mascota, estado_mascota , tipo_sangre_mascota, BIN_TO_UUID(id_historia_clinica) id_historia_clinica
            FROM mascotas
            INNER JOIN historias_clinicas ON historias_clinicas.id_mascota_historia = mascotas.id_mascota
            WHERE id_cliente_mascota = UUID_TO_BIN(?) AND estado_mascota = 1`, [id])
      if (!mascotas) throw new NoDataFound()
      if (mascotas.length === 0) throw new NoDataFound()
      return (mascotas)
    } catch (error) {
      return error
    }
  }

  static async getAllHistorialMascotas ({ id }) {
    try {
      const historial = await connection.query(`SELECT 
            BIN_TO_UUID(rhc.id_registro_historia_clinica) AS id,
            rhc.fecha_registro_historia_clinica,
            rhc.registro_historia_clinica_finalizado,
            rhc.descripcion_registro_historia_clinica,
            rhc.estado_registro_historia_clinica,
            rhc.anotacion_registro_historia_clinica,
            rhc.id_historia_clinica,
            rhc.id_servicio,
            s.descripcion_servicio
        FROM 
            registros_historias_clinicas rhc
        JOIN 
            servicios s ON rhc.id_servicio = s.id_servicio
        WHERE 
            rhc.id_historia_clinica = UUID_TO_BIN(?) AND rhc.estado_registro_historia_clinica = 1;`, [id])
      if (!historial) throw new NoDataFound()
      if (historial.length === 0) throw new NoDataFound()
      return (historial)
    } catch (error) {
      return (error)
    }
  }

  static async getServiciosByMascotasId ({ id }) {
    try {
      const query = `
            SELECT 
            BIN_TO_UUID(rhc.id_registro_historia_clinica) AS id,
            rhc.fecha_registro_historia_clinica,
            rhc.registro_historia_clinica_finalizado,
            rhc.descripcion_registro_historia_clinica,
            rhc.estado_registro_historia_clinica,
            rhc.anotacion_registro_historia_clinica,
            rhc.id_historia_clinica,
            rhc.id_servicio,
            s.descripcion_servicio
        FROM 
            registros_historias_clinicas rhc
        JOIN 
            servicios s ON rhc.id_servicio = s.id_servicio
        WHERE 
            rhc.id_registro_historia_clinica = UUID_TO_BIN(?) AND rhc.estado_registro_historia_clinica = 1;
            `
      const [historialServicio] = await connection.query(query, [id])
      return (historialServicio)
    } catch (error) {
      return error
    }
  }

  static async getServiciosGroobyId ({ id }) {
    try {
      const [servicios] = await connection.query(`SELECT 
            BIN_TO_UUID(sg.id_servicio_groomer) id,
            sg.fecha_servicio_groomer,
            sg.contenido_servicio_groomer,
            sg.estado_servicio_groomer,
            sg.anotacion_servicio_groomer,
            sg.servicio_finalizado_groomer,
            m.nombre_mascota,
            s.descripcion_servicio
        FROM 
            servicios_groomer sg
        INNER JOIN 
            mascotas m ON sg.id_mascota = m.id_mascota
        INNER JOIN 
            servicios s ON sg.id_servicio = s.id_servicio
        WHERE
            sg.id_mascota = UUID_TO_BIN(?)`, [id])
      if (!servicios) throw new NoDataFound()
      if (servicios.length === 0) throw new NoDataFound()
      return (servicios)
    } catch (error) {
      return (error)
    }
  }

  static async getAllMascota () {
    try {
      const [mascota] = await connection.query(`SELECT 
            BIN_TO_UUID(m.id_mascota) id,
            m.nombre_mascota,
            m.fecha_nacimiento_mascota,
            m.tipo_sangre_mascota,
            m.color_mascota,
            m.raza_mascota,
            m.peso_mascota,
            m.tamanno_mascota,
            m.microchip_mascota,
            m.foto_mascota,
            m.estado_mascota,
            m.anotacion_mascota,
            BIN_TO_UUID(m.id_cliente_mascota) AS id_cliente_mascota_uuid,
            c.primer_nombre_cliente,
            c.primer_apellido_cliente
        FROM 
            mascotas m
        JOIN 
            clientes c ON m.id_cliente_mascota = c.id_cliente
            
        WHERE m.estado_mascota = 1;`)
      if (!mascota) throw new NoDataFound()
      if (mascota.length === 0) throw new NoDataFound()
      return (mascota)
    } catch (error) {
      return error
    }
  }

  static async getMascotaId ({ id }) {
    try {
      const [[mascota]] = await connection.query(`SELECT 
            BIN_TO_UUID(m.id_mascota) AS id,
            m.nombre_mascota,
            m.fecha_nacimiento_mascota,
            m.tipo_sangre_mascota,
            m.color_mascota,
            m.raza_mascota,
            m.peso_mascota,
            m.tamanno_mascota,
            m.microchip_mascota,
            m.foto_mascota,
            m.estado_mascota,
            m.anotacion_mascota,
            BIN_TO_UUID(m.id_cliente_mascota) AS id_cliente_mascota_uuid,
            c.primer_nombre_cliente,
            c.primer_apellido_cliente,
            tm.tipo_mascota, 
            gm.genero_mascota 
        FROM 
            mascotas m
        JOIN 
            clientes c ON m.id_cliente_mascota = c.id_cliente
        JOIN 
            tipo_mascota tm ON m.id_tipo_mascota = tm.id_tipo_mascota 
        JOIN 
            genero_mascota gm ON m.id_genero_mascota = gm.id_genero_mascota 
        WHERE 
            m.id_mascota = UUID_TO_BIN(?);
        `, [id])
      if (!mascota) throw new NoDataFound()
      if (mascota.length === 0) throw new NoDataFound()
      return (mascota)
    } catch (error) {
      return error
    }
  }

  static async deleteMascota ({ id, input }) {
    const { anotacion } = input
    try {
      const [[updateMascota]] = await connection.query('UPDATE mascotas SET estado_mascota = 0, anotacion_mascota = ? WHERE id_mascota = UUID_TO_BIN(?)', [anotacion, id])
      if (!updateMascota) throw new NoDataFound()
      return (updateMascota)
    } catch (error) {
      return error
    }
  }

  static async updateMascota ({ id, input }) {
    try {
      const query = `
                UPDATE mascotas
                SET 
                    nombre_mascota = ?,
                    fecha_nacimiento_mascota = ?,
                    color_mascota = ?,
                    raza_mascota = ?,
                    peso_mascota = ?,
                    tamanno_mascota = ?,
                    microchip_mascota = ?,
                    foto_mascota = ?
                WHERE 
                    id_mascota = UUID_TO_BIN(?)
            `

      await connection.query(query, [
        input.nombre_mascota,
        input.fecha_nacimiento_mascota,
        input.color_mascota,
        input.raza_mascota,
        input.peso_mascota,
        input.tamanno_mascota,
        input.microchip_mascota,
        input.foto_mascota,
        id
      ])

      return { success: true, message: 'Mascota actualizada exitosamente.' }
    } catch (error) {
      return { success: false, message: 'Error al actualizar la mascota.' }
    }
  }
}
