import { NoDataFound } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'

export default class CertificateModel {
  static async getCertificateByPetId ({ id }) {
    try {
      const [[desparacitacionesInternas]] = await connection.query(
        `SELECT laboratorio_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica FROM desparacitaciones
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        WHERE tipo_desparacitacion.id_tipo_desparacitacion = 'INT' AND desparacitaciones.id_mascota = mascotas.id_mascota AND mascotas.id_mascota = UUID_TO_BIN(?)`,
        [id]
      )
      if (!desparacitacionesInternas) throw new NoDataFound()
      if (desparacitacionesInternas.length === 0) throw new NoDataFound()

      const [[desparacitacionesExternas]] = await connection.query(
        `SELECT laboratorio_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica FROM desparacitaciones
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        WHERE tipo_desparacitacion.id_tipo_desparacitacion = 'EXT' AND desparacitaciones.id_mascota = mascotas.id_mascota AND mascotas.id_mascota = UUID_TO_BIN(?)`,
        [id]
      )
      if (!desparacitacionesExternas) throw new NoDataFound()
      if (desparacitacionesExternas.length === 0) throw new NoDataFound()

      const [vacunasAplicadas] = await connection.query(
        `SELECT laboratorio, nombre_vacuna, fecha_vacuna_aplicada, fecha_vencimiento_vacuna_aplicada,  lote_vacuna_aplicada 
        FROM vacunas_aplicadas
        INNER JOIN tipo_vacuna ON vacunas_aplicadas.id_tipo_vacuna = tipo_vacuna.id_tipo_vacuna
        WHERE vacunas_aplicadas.id_mascota = UUID_TO_BIN(?)`,
        [id]
      )
      if (!vacunasAplicadas) throw new NoDataFound()
      if (vacunasAplicadas.length === 0) throw new NoDataFound()

      const [[res]] = await connection.query(
        `SELECT nombre_mascota, fecha_nacimiento_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, microchip_mascota, tipo_mascota, CONCAT_WS(' ', primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente) as nombre_completo, descripcion_documento, numero_documento_cliente, lugar_expedicion_documento, telefono_cliente, direccion_cliente
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
      console.log(error)
      return error
    }
  }
};
