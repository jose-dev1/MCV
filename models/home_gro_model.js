import connection from './connection_database.js'

export class HomeGroModel {
  static async getData () {
    try {
      const [[data1]] = await connection.query(`SELECT count(id_cita) AS citas_dia FROM cita
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      WHERE servicios.especialista = 'GRO' AND (fecha_cita >= CURDATE() OR (fecha_cita = CURDATE() AND Hora_cita > CURTIME())) AND estado_cita=1 AND asistencia_cita = 0;`)
      const [[data2]] = await connection.query(`SELECT count(id_cita) AS citas_restantes FROM cita
      WHERE estado_cita=1 AND fecha_cita = curdate();`)
      const [[data3]] = await connection.query(`SELECT count(id_servicio_groomer) AS servicios_pendientes FROM servicios_groomer
      WHERE servicio_finalizado_groomer = 0 AND estado_servicio_groomer = 1;`)
      const [[data4]] = await connection.query(`SELECT count(id_servicio_groomer) AS servicios_agregados FROM servicios_groomer
      WHERE estado_servicio_groomer = 1 AND DATE(fecha_servicio_groomer) = CURDATE();`)
      return ({ ...data1, ...data2, ...data3, ...data4 })
    } catch (error) {
      return error
    }
  }
}
