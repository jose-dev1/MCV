import connection from './connection_database.js'
import { NotFoundUser, NoDataFound, DataAlreadyChange } from '../squemas/errors_squemas.js'

export class AppointmentAssistanceModel {
  static async getAll () {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(id_cita) id, Hora_cita, asistencia_cita,descripcion_servicio,primer_nombre_cliente,primer_apellido_cliente,nombre_mascota,tipo_mascota,descripcion_usuario,primer_nombre_cliente,primer_apellido_cliente FROM cita
      INNER JOIN mascotas ON mascotas.id_mascota = cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      INNER JOIN empleados ON empleados.id_empleado = cita.id_empleado
      INNER JOIN tipo_mascota ON tipo_mascota.id_tipo_mascota = mascotas.id_tipo_mascota
      INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
      INNER JOIN usuarios ON usuarios.id_usuario = empleados.id_usuario
      INNER JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = usuarios.id_tipo_usuario
      WHERE fecha_cita = CURDATE() AND estado_cita=1`)

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      console.log(err)
      return err
    }
  }

  static async desactiveAppointment ({ id }) {
    try {
      const [[asistenciaCita]] = await connection.query(`SELECT asistencia_cita FROM cita
      WHERE id_cita = UUID_TO_BIN(?)`, [id])
      if (!asistenciaCita) throw new NotFoundUser()
      if (asistenciaCita.asistencia_cita === 0) throw new DataAlreadyChange()
      const [res] = await connection.query(`UPDATE cita SET asistencia_cita = 0
      WHERE id_cita = UUID_TO_BIN(?)`, [id])

      return res
    } catch (err) {
      console.log(err)
      return err
    }
  }

  static async activeAppointment ({ id }) {
    try {
      const [[asistenciaCita]] = await connection.query(`SELECT asistencia_cita FROM cita
      WHERE id_cita = UUID_TO_BIN(?)`, [id])
      if (!asistenciaCita) throw new NotFoundUser()
      if (asistenciaCita.asistencia_cita === 1) throw new DataAlreadyChange()

      const [res] = await connection.query(`UPDATE cita SET asistencia_cita = 1
      WHERE id_cita = UUID_TO_BIN(?)`, [id])

      return res
    } catch (err) {
      console.log(err)
      return err
    }
  }
}
