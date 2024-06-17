import { NoDataFound, MissingInternaldeworming, MissingExternalDeworming, MissingVaccines } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'

export default class CertificateModel {
  static async getCertificates () {
    try {
      const [res] = await connection.query(
        `SELECT BIN_TO_UUID(id_certificado) id, fecha_certificado,  nombre_mascota, CONCAT_WS(' ', primer_nombre_cliente, primer_apellido_cliente) AS nombre_completo, CONCAT_WS(' ', id_tipo_documento, numero_documento_cliente) AS documento_cliente FROM certificados
        INNER JOIN mascotas ON certificados.id_mascota = mascotas.id_mascota
        INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
        WHERE estado_certificado = 1`
      )

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()
      return (res)
    } catch (error) {
      return error
    }
  }

  static async getCertificatesById ({ id }) {
    try {
      const [[desparacitacionesInternas]] = await connection.query(
        `SELECT BIN_TO_UUID(certificados_has_desparacitaciones.id_desparacitacion) id_desparacitacion, laboratorio_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica FROM desparacitaciones
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        INNER JOIN certificados_has_desparacitaciones ON desparacitaciones.id_desparacitacion = certificados_has_desparacitaciones.id_desparacitacion
        WHERE tipo_desparacitacion.id_tipo_desparacitacion = 'INT' AND certificados_has_desparacitaciones.id_certificado = UUID_TO_BIN(?)
        ORDER BY fecha_aplicacion_desparacitacion DESC LIMIT 1;`,
        [id]
      )
      if (!desparacitacionesInternas) throw new NoDataFound()
      if (desparacitacionesInternas.length === 0) throw new NoDataFound()

      const [[desparacitacionesExternas]] = await connection.query(
        `SELECT BIN_TO_UUID(certificados_has_desparacitaciones.id_desparacitacion) id_desparacitacion, laboratorio_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica FROM desparacitaciones
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        INNER JOIN certificados_has_desparacitaciones ON desparacitaciones.id_desparacitacion = certificados_has_desparacitaciones.id_desparacitacion
        WHERE tipo_desparacitacion.id_tipo_desparacitacion = 'EXT' AND certificados_has_desparacitaciones.id_certificado = UUID_TO_BIN(?)
        ORDER BY fecha_aplicacion_desparacitacion DESC LIMIT 1;`,
        [id]
      )
      if (!desparacitacionesExternas) throw new NoDataFound()
      if (desparacitacionesExternas.length === 0) throw new NoDataFound()

      const [vacunasAplicadas] = await connection.query(
        `SELECT BIN_TO_UUID(certificados_has_vacunas.id_vacuna_aplicada) id_vacuna_aplicada, laboratorio, nombre_vacuna, fecha_vacuna_aplicada, fecha_vencimiento_vacuna_aplicada,  lote_vacuna_aplicada 
        FROM vacunas_aplicadas
        INNER JOIN tipo_vacuna ON vacunas_aplicadas.id_tipo_vacuna = tipo_vacuna.id_tipo_vacuna
        INNER JOIN certificados_has_vacunas ON vacunas_aplicadas.id_vacuna_aplicada = certificados_has_vacunas.id_vacuna_aplicada
        WHERE certificados_has_vacunas.id_certificado = UUID_TO_BIN(?)`,
        [id]
      )
      if (!vacunasAplicadas) throw new NoDataFound()
      if (vacunasAplicadas.length === 0) throw new NoDataFound()

      const [[res]] = await connection.query(
        `SELECT nombre_mascota, fecha_nacimiento_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, microchip_mascota, tipo_mascota, CONCAT_WS(' ', primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente) as nombre_completo, descripcion_documento, numero_documento_cliente, lugar_expedicion_documento, telefono_cliente, direccion_cliente, numero_documento_cliente, id_genero_mascota, informacion_sanitaria_certificado AS informacionSanitaria, informacion_adicional_certificado AS informacionAdicional
        FROM mascotas
        INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
        INNER JOIN tipo_mascota ON mascotas.id_tipo_mascota = tipo_mascota.id_tipo_mascota
        INNER JOIN tipo_documento ON clientes.id_tipo_documento = tipo_documento.id_tipo_documento
        INNER JOIN certificados ON mascotas.id_mascota = certificados.id_mascota 
        WHERE certificados.id_certificado = UUID_TO_BIN(?);`,
        [id]
      )

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return { ...res, vacunasAplicadas, desparacitacionesExternas, desparacitacionesInternas }
    } catch (error) {
      return error
    }
  }

  static async getInfoForCertificateByPetId ({ id }) {
    try {
      const [[desparacitacionesInternas]] = await connection.query(
        `SELECT BIN_TO_UUID(id_desparacitacion) id_desparacitacion, laboratorio_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica FROM desparacitaciones
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        WHERE tipo_desparacitacion.id_tipo_desparacitacion = 'INT' AND desparacitaciones.id_mascota = mascotas.id_mascota AND mascotas.id_mascota = UUID_TO_BIN(?) AND estado_desparacitacion=1
        ORDER BY fecha_aplicacion_desparacitacion DESC LIMIT 1;`,
        [id]
      )
      if (!desparacitacionesInternas) throw new MissingInternaldeworming()
      if (desparacitacionesInternas.length === 0) throw new MissingInternaldeworming()

      const [[desparacitacionesExternas]] = await connection.query(
        `SELECT BIN_TO_UUID(id_desparacitacion) id_desparacitacion, laboratorio_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica FROM desparacitaciones
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        WHERE tipo_desparacitacion.id_tipo_desparacitacion = 'EXT' AND desparacitaciones.id_mascota = mascotas.id_mascota AND mascotas.id_mascota = UUID_TO_BIN(?) AND estado_desparacitacion=1
        ORDER BY fecha_aplicacion_desparacitacion DESC LIMIT 1;`,
        [id]
      )
      if (!desparacitacionesExternas) throw new MissingExternalDeworming()
      if (desparacitacionesExternas.length === 0) throw new MissingExternalDeworming()

      const [vacunasAplicadas] = await connection.query(
        `SELECT BIN_TO_UUID(id_vacuna_aplicada) id_vacuna_aplicada, laboratorio, nombre_vacuna, fecha_vacuna_aplicada, fecha_vencimiento_vacuna_aplicada,  lote_vacuna_aplicada 
        FROM vacunas_aplicadas
        INNER JOIN tipo_vacuna ON vacunas_aplicadas.id_tipo_vacuna = tipo_vacuna.id_tipo_vacuna
        WHERE vacunas_aplicadas.id_mascota = UUID_TO_BIN(?) AND estado_vacuna_aplicada=1`,
        [id]
      )
      if (!vacunasAplicadas) throw new MissingVaccines()
      if (vacunasAplicadas.length === 0) throw new MissingVaccines()

      const [[res]] = await connection.query(
        `SELECT nombre_mascota, fecha_nacimiento_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, microchip_mascota, tipo_mascota, CONCAT_WS(' ', primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente) as nombre_completo, descripcion_documento, numero_documento_cliente, lugar_expedicion_documento, telefono_cliente, direccion_cliente, id_genero_mascota
        FROM mascotas
        INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
        INNER JOIN tipo_mascota ON mascotas.id_tipo_mascota = tipo_mascota.id_tipo_mascota
        INNER JOIN tipo_documento ON clientes.id_tipo_documento = tipo_documento.id_tipo_documento
        WHERE mascotas.id_mascota = UUID_TO_BIN(?)`,
        [id]
      )

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return { ...res, vacunasAplicadas, desparacitacionesExternas, desparacitacionesInternas }
    } catch (error) {
      return error
    }
  }

  static async createCertificate ({ id, input }) {
    try {
      const { informacionSanitariaCertificado, informacionAdicionalCertificado, vacunas, desparacitaciones } = input

      await connection.beginTransaction()

      await connection.query(
        `INSERT INTO certificados (informacion_sanitaria_certificado, informacion_adicional_certificado, estado_certificado, id_mascota) VALUES
        (?,?,1, UUID_TO_BIN(?))`,
        [informacionSanitariaCertificado, informacionAdicionalCertificado, id]
      )

      const [[lastInsertId]] = await connection.query(
        'SELECT BIN_TO_UUID(id_certificado) id_certificado FROM certificados WHERE estado_certificado = 1 ORDER BY fecha_certificado DESC LIMIT 1'
      )

      for (const vacuna of vacunas) {
        await connection.query(
            `INSERT INTO certificados_has_vacunas (id_certificado, id_vacuna_aplicada)
            VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));`,
            [lastInsertId.id_certificado, vacuna.id_vacuna_aplicada]
        )
      }

      for (const desparacitacion of desparacitaciones) {
        await connection.query(
            `INSERT INTO certificados_has_desparacitaciones (id_certificado, id_desparacitacion)
            VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?));`,
            [lastInsertId.id_certificado, desparacitacion.id_desparacitacion]
        )
      }

      await connection.commit()
    } catch (error) {
      await connection.rollback()
      return error
    }
  }

  static async deleteCetificate ({ id, input }) {
    try {
      const { anotacion } = input
      const [res] = await connection.query(
        `UPDATE certificados
        SET anotacion_certificado = ?, estado_certificado = 0
        WHERE id_certificado = UUID_TO_BIN(?)`,
        [anotacion, id]
      )
      return res
    } catch (error) {
      return error
    }
  }

  static async updateCertificate ({ id, input }) {
    try {
      const { informacionSanitariaCertificado, informacionAdicionalCertificado } = input
      const [res] = await connection.query(
        `UPDATE certificados
        SET informacion_sanitaria_certificado = ?, informacion_adicional_certificado = ?
        WHERE id_certificado = UUID_TO_BIN(?)`,
        [informacionSanitariaCertificado, informacionAdicionalCertificado, id]
      )
      return res
    } catch (error) {
      return error
    }
  }
};
