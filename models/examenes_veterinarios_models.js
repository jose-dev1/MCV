import { AccountAlreadyDisable, DuplicateInfo, NoDataFound } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'

export default class ExamenesVeteriarioModel {
  static async getAllExams () {
    try {
      const [res] = await connection.query(
        `SELECT BIN_TO_UUID(id_examen) id, fecha_registro_resultados_examen, fecha_toma_muestra_examen, resultado_examen, link_archivo_examen, estado_examen, anotacion_examen, nombre_mascota, tipo_examen
        FROM examenes
        INNER JOIN mascotas ON examenes.id_mascota = mascotas.id_mascota
        INNER JOIN tipo_examen ON examenes.id_tipo_examen = tipo_examen.id_tipo_examen;`
      )

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (error) {
      return error
    }
  }

  static async getExamById ({ id }) {
    try {
      const [res] = await connection.query(
        `SELECT BIN_TO_UUID(id_examen) id, fecha_registro_resultados_examen, fecha_toma_muestra_examen, resultado_examen, link_archivo_examen, estado_examen, anotacion_examen, nombre_mascota, tipo_examen
        FROM examenes
        INNER JOIN mascotas ON examenes.id_mascota = mascotas.id_mascota
        INNER JOIN tipo_examen ON examenes.id_tipo_examen = tipo_examen.id_tipo_examen
        WHERE id_examen = UUID_TO_BIN(?);`, [id]
      )

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (error) {
      return error
    }
  }

  static async createExam (input) {
    try {
      const { idMascota, idTipoExamen } = input

      const [[existingData]] = await connection.query(
      `SELECT BIN_TO_UUID(id_examen) id FROM examenes
      WHERE registro_completo_examen != 0 AND estado_examen = 1`)
      console.log(existingData)

      if (existingData) throw new DuplicateInfo()

      await connection.query(
      `INSERT INTO examenes (estado_examen, id_mascota, id_tipo_examen) VALUES
      (1,UUID_TO_BIN(?),?)`, [idMascota, idTipoExamen])
    } catch (error) {
      return error
    }
  }

  static async updateExam ({ id, input }) {
    try {
      const { fechaRegistroResultadosExamen, resultadoExamen, linkArchivoExamen } = input

      const datosAntiguos = await this.getExamById({ id })
      if (datosAntiguos instanceof NoDataFound) throw new NoDataFound()

      const [res] = await connection.query(
      `UPDATE examenes
      SET fecha_registro_resultados_examen = ?, resultado_examen = ?, link_archivo_examen = ?
      WHERE id_examen = UUID_TO_BIN(?)`,
      [fechaRegistroResultadosExamen, resultadoExamen, linkArchivoExamen, id]
      )

      return res
    } catch (error) {
      return error
    }
  }

  static async deleteExam ({ id, input }) {
    try {
      const { anotacion } = input
      const [[existencia]] = await connection.query(
        `SELECT estado_examen FROM examenes
        WHERE id_examen = UUID_TO_BIN(?) AND estado_examen = 0`,
        [id]
      )

      if (existencia) throw new AccountAlreadyDisable()

      const [res] = await connection.query(
        `UPDATE examenes
        SET anotacion_examen = ?, estado_examen = 0
        WHERE id_examen = UUID_TO_BIN(?)`,
        [anotacion, id]
      )

      return res
    } catch (error) {
      console.log(error)
      return error
    }
  }
};
