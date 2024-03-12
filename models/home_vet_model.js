import connection from './connection_database.js'

export class HomeVetModel {
  static async getData () {
    try {
      const [[data1]] = await connection.query(`SELECT count(id_hospitalizacion) AS hospitalizaciones_activas FROM hospitalizaciones
      WHERE servicio_finalizado_hospitalizacion = 0 AND estado_hospitalizacion = 1;`)
      const [[data2]] = await connection.query(`SELECT count(id_cita) AS citas_dia FROM cita
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      WHERE servicios.especialista = 'VET' AND (fecha_cita >= CURDATE() OR (fecha_cita = CURDATE() AND Hora_cita > CURTIME())) AND estado_cita=1 AND asistencia_cita = 0;
      `)
      const [[data3]] = await connection.query(`SELECT count(id_examen) AS examenes_pendientes FROM examenes
      WHERE registro_completo_examen = 0;`)
      const [[data4]] = await connection.query(`SELECT count(id_mascota) cantidad_mascotas FROM mascotas 
      WHERE estado_mascota = 1;`)
      return ({ ...data1, ...data2, ...data3, ...data4 })
    } catch (error) {
      return error
    }
  }
}
