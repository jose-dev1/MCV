import connection from './connection_database.js'
import { NoDataFound, NotFoundUser, AccountAlreadyDisable } from '../squemas/errors_squemas.js'

export class VacunasModel {
  static async getMascotasVacuna () {
    try {
      const [mascotas] = await connection.query(`SELECT BIN_TO_UUID(id_mascota) id, primer_nombre_cliente, primer_apellido_cliente,nombre_mascota,tipo_mascota,peso_mascota,tamanno_mascota, id_tipo_documento, numero_documento_cliente
      FROM mascotas
      INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
      INNER JOIN tipo_mascota ON tipo_mascota.id_tipo_mascota=mascotas.id_tipo_mascota
      where  mascotas.estado_mascota=1;
      ;`)
      if (!mascotas) throw new NoDataFound()
      if (mascotas.length === 0) throw new NoDataFound()
      return mascotas
    } catch (error) {
      return (error)
    }
  }

  static async getDatosDeImpresion ({ id }) {
    try {
      const [response] = await connection.query(`
        SELECT  
          nombre_vacuna,
          laboratorio,
          lote_vacuna_aplicada,
          fecha_vacuna_aplicada,
          nombre_mascota,
          fecha_nacimiento_mascota,
          genero_mascota,
          raza_mascota,
          tipo_mascota,
          CONCAT(primer_nombre_cliente , ' ' , primer_apellido_cliente) nombre_cliente ,
          direccion_cliente,
          telefono_cliente
        FROM vacunas_aplicadas
        INNER JOIN tipo_vacuna ON vacunas_aplicadas.id_tipo_vacuna = tipo_vacuna.id_tipo_vacuna
        INNER JOIN mascotas ON vacunas_aplicadas.id_mascota = mascotas.id_mascota
        INNER JOIN tipo_mascota on mascotas.id_tipo_mascota = tipo_mascota.id_tipo_mascota
        INNER JOIN genero_mascota on mascotas.id_genero_mascota = genero_mascota.id_genero_mascota
        INNER JOIN clientes on mascotas.id_cliente_mascota = clientes.id_cliente
        WHERE vacunas_aplicadas.id_mascota = UUID_TO_BIN(?)
      `, [id])

      if (!response) throw new NoDataFound()
      if (response.length === 0) throw new NoDataFound()
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async getVacunas ({ idMascota }) {
    try {
      const [getVacunas] = await connection.query(`
      SELECT 
      BIN_TO_UUID(va.id_vacuna_aplicada) id, 
      va.fecha_vacuna_aplicada, 
      va.fecha_vencimiento_vacuna_aplicada, 
      va.laboratorio, 
      va.lote_vacuna_aplicada, 
      va.estado_vacuna_aplicada,
      tv.nombre_vacuna
      FROM vacunas_aplicadas va
        INNER JOIN tipo_vacuna tv ON va.id_tipo_vacuna = tv.id_tipo_vacuna
        WHERE estado_vacuna_aplicada = 1 AND id_mascota=UUID_TO_BIN(?);`, [idMascota])
      if (!getVacunas) throw new NoDataFound()
      if (getVacunas.length === 0) throw new NoDataFound()
      return getVacunas
    } catch (error) {
      return (error)
    }
  }

  static async getTipoVacuna ({ idMascota }) {
    try {
      const [response] = await connection.query(`
        SELECT id_tipo_vacuna as id , nombre_vacuna as value , id_tipo_mascota
        FROM tipo_vacuna
        WHERE id_tipo_mascota = (SELECT id_tipo_mascota FROM mascotas WHERE id_mascota = UUID_TO_BIN(?))`, [idMascota])
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async vacunaAplicadaId ({ id }) {
    try {
      const [[getTipoVacunas]] = await connection.query(`
      SELECT 
    BIN_TO_UUID(va.id_vacuna_aplicada) id,
    va.fecha_vacuna_aplicada,
    va.fecha_vencimiento_vacuna_aplicada,
    va.laboratorio,
    va.lote_vacuna_aplicada,
    va.estado_vacuna_aplicada,
    m.nombre_mascota,
    tm.tipo_mascota,
    tv.nombre_vacuna,
    c.id_tipo_documento,
    c.numero_documento_cliente
FROM 
    vacunas_aplicadas va
INNER JOIN 
    mascotas m ON va.id_mascota = m.id_mascota
INNER JOIN 
    tipo_mascota tm ON m.id_tipo_mascota = tm.id_tipo_mascota
INNER JOIN 
    tipo_vacuna tv ON va.id_tipo_vacuna = tv.id_tipo_vacuna
INNER JOIN 
    clientes c ON m.id_cliente_mascota = c.id_cliente
WHERE id_vacuna_aplicada = UUID_TO_BIN(?)
;
      `, [id])
      if (!getTipoVacunas) throw new NoDataFound()
      return (getTipoVacunas)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async createVacunas ({ input }) {
    const { fechaVacunaAplicada, fechaVencimiento, laboratorio, loteVacuna, idMascota, idTipoVacuna } = input
    try {
      const [response] = await connection.query(`
      INSERT INTO vacunas_aplicadas (fecha_vacuna_aplicada, fecha_vencimiento_vacuna_aplicada, laboratorio, lote_vacuna_aplicada, estado_vacuna_aplicada, id_mascota, id_tipo_vacuna)
      VALUES (?, ?, ?, ?, 1, UUID_TO_BIN(?), ?);`, [fechaVacunaAplicada, fechaVencimiento, laboratorio, loteVacuna, idMascota, idTipoVacuna])
      return response
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async updateVacuna ({ id, input }) {
    const { fechaVacunaAplicada } = input
    try {
      const response = await connection.query(`
        UPDATE vacunas_aplicadas
        SET fecha_vacuna_aplicada = ?
        WHERE  id_vacuna_aplicada =  UUID_TO_BIN(?);
      `, [fechaVacunaAplicada, id])

      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async deleteVacuna ({ id, input }) {
    try {
      const { anotacion } = input

      const [[estadoVacuna]] = await connection.query('SELECT estado_vacuna_aplicada FROM vacunas_aplicadas WHERE id_vacuna_aplicada = UUID_TO_BIN(?)', [id])

      if (!estadoVacuna) throw new NotFoundUser()
      if (estadoVacuna.estado_vacuna_aplicada !== 1) throw new AccountAlreadyDisable()
      const [res] = await connection.query('UPDATE vacunas_aplicadas SET estado_vacuna_aplicada = 0, anotacion_vacuna_aplicada = ? WHERE id_vacuna_aplicada = UUID_TO_BIN(?)', [anotacion, id])

      return res
    } catch (err) {
      return err
    }
  }
}
