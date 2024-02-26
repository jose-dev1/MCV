import connection from './connection_database.js'
import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'

export class ScheduleModel {
  static async getEspecialista ({ especialista }) {
    try {
      const [getCita] = await connection.query(`SELECT BIN_TO_UUID(id_cita) id,fecha_cita, Hora_cita,primer_nombre_empleado,primer_apellido_empleado,primer_nombre_cliente,primer_apellido_cliente,nombre_mascota,descripcion_servicio from cita
      INNER JOIN empleados ON empleados.id_empleado=cita.id_empleado
      INNER JOIN mascotas ON mascotas.id_mascota=cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      INNER JOIN clientes ON clientes.id_cliente=mascotas.id_cliente_mascota
      WHERE  servicios.especialista = ?;`, [especialista])
      if (!getCita) throw new NoDataFound()
      if (getCita.length === 0) throw new NoDataFound()
      return (getCita)
    } catch (error) {
      return (error)
    }
  }

  static async getId ({ id }) {
    try {
      const [getCita] = await connection.query(`SELECT fecha_cita, Hora_cita, BIN_TO_UUID(id_empleado) id_empleado, id_servicio, BIN_TO_UUID(id_mascota) id_mascota FROM cita
      WHERE id_cita = UUID_TO_BIN(?)`, [id])
      if (!getCita) throw new NoDataFound()
      if (getCita.length === 0) throw new NoDataFound()
      return (getCita)
    } catch (error) {
      return (error)
    }
  }

  static async getFecha ({ fechaCita, idEmpleado }) {
    try {
      const [getCita] = await connection.query(`SELECT Hora_Cita,nombre_mascota,descripcion_servicio from cita
      INNER JOIN empleados ON empleados.id_empleado=cita.id_empleado
      INNER JOIN mascotas ON mascotas.id_mascota=cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      WHERE  fecha_cita = ? AND empleados.id_empleado = UUID_TO_BIN(?);`, [fechaCita, idEmpleado])
      if (!getCita) throw new NoDataFound()
      if (getCita.length === 0) throw new NoDataFound()
      return (getCita)
    } catch (error) {
      return (error)
    }
  }

  // inicio metodos de otros modulos

  static async getMascotas ({ tipoDocumento, numeroDocumento }) {
    try {
      const [[existingData]] = await connection.query(`SELECT id_cliente FROM clientes
      WHERE numero_documento_cliente = ? AND id_tipo_documento = ?`, [numeroDocumento, tipoDocumento])

      if (!existingData) throw new NotFoundUser()
      const { id_cliente: idCliente } = existingData

      const [mascotas] = await connection.query(`SELECT BIN_TO_UUID(id_mascota) id, nombre_mascota as value FROM mascotas
      INNER JOIN clientes ON clientes.id_cliente = mascotas.Id_cliente_mascota
      WHERE id_cliente = ?`, [idCliente])
      if (!mascotas) throw new NoDataFound()
      if (mascotas.length === 0) throw new NoDataFound()
      return (mascotas)
    } catch (error) {
      return (error)
    }
  }

  static async getServicios ({ especialista }) {
    try {
      const [servicios] = await connection.query(`SELECT id_Servicio, descripcion_servicio FROM servicios
    WHERE especialista = ?`, [especialista])
      if (!servicios) throw new NoDataFound()
      if (servicios.length === 0) throw new NoDataFound()
      return (servicios)
    } catch (error) {
      return (error)
    }
  }

  static async getEspecialistas ({ idTipoUsuario }) {
    try {
      const [especialistas] = await connection.query(`SELECT BIN_TO_UUID(id_empleado) id, primer_nombre_empleado, segundo_nombre_empleado FROM empleados
      INNER JOIN usuarios ON usuarios.id_usuario = empleados.id_usuario
      WHERE id_tipo_usuario = ?`, [idTipoUsuario])
      if (!especialistas) throw new NoDataFound()
      if (especialistas.length === 0) throw new NoDataFound()
      return (especialistas)
    } catch (error) {
      return (error)
    }
  }

  static async getDocumentos () {
    try {
      const [tiposDocumento] = await connection.query('SELECT id_tipo_documento as id, descripcion_documento as value FROM tipo_documento')
      if (!tiposDocumento) throw new NoDataFound()
      if (tiposDocumento.length === 0) throw new NoDataFound()
      return (tiposDocumento)
    } catch (error) {
      return (error)
    }
  }

  // fin metodos de otros modulos

  static async create ({ input }) {
    const { fechaCita, horaCita, estadoCita, idEmpleado, idServicio, idMascota, especialista } = input
    try {
      const [[existenciaCita]] = await connection.query(`SELECT estado_cita FROM cita
      WHERE fecha_cita= ? AND hora_cita= ? AND estado_cita = 1 AND id_empleado = UUID_TO_BIN(?)`, [fechaCita, horaCita, idEmpleado])
      if (existenciaCita) throw new DuplicateInfo()

      const [[pacienteYaCita]] = await connection.query(`SELECT estado_cita FROM cita
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      WHERE id_mascota = UUID_TO_BIN(?) AND asistencia_cita = 0 AND estado_cita = 1 AND fecha_cita> CURDATE() AND especialista = ?`, [idMascota, especialista])

      if (pacienteYaCita) throw new InfoAlreadyExisting()

      const [[pacienteCitaHora]] = await connection.query(`SELECT estado_cita FROM cita
      WHERE id_mascota = UUID_TO_BIN(?) AND fecha_cita= ? AND hora_cita= ? AND estado_cita = 1`, [idMascota, fechaCita, horaCita])

      if (pacienteCitaHora) throw new InfoAlreadyExisting()

      const insertCita = await connection.query(`INSERT INTO cita (fecha_cita,Hora_cita,estado_cita,
        id_empleado,id_servicio,id_mascota) VALUES (?,?,?,UUID_TO_BIN(?),?,UUID_TO_BIN(?));`, [fechaCita, horaCita, estadoCita, idEmpleado, idServicio, idMascota])
      return (insertCita)
    } catch (error) {
      return (error)
    }
  }

  static async updateCita ({ id, input }) {
    const { fechaCita: fechaValidar, horaCita: horaValidar, idEmpleado, idMascota } = input
    try {
      const [[existenciaCita]] = await connection.query(`SELECT estado_cita FROM cita
      WHERE fecha_cita= ? AND hora_cita= ? AND estado_cita = 1 AND id_empleado = UUID_TO_BIN(?)`, [fechaValidar, horaValidar, idEmpleado])
      if (existenciaCita) throw new DuplicateInfo()

      const [[pacienteCitaHora]] = await connection.query(`SELECT estado_cita FROM cita
      WHERE id_mascota = UUID_TO_BIN(?) AND fecha_cita= ? AND hora_cita= ? AND estado_cita = 1`, [idMascota, fechaValidar, horaValidar])
      if (pacienteCitaHora) throw new InfoAlreadyExisting()

      const [datosAntiguos] = await this.getId({ id })
      const datosActualizar = {
        ...datosAntiguos,
        ...input
      }
      const { fechaCita, horaCita } = datosActualizar
      const [updateCita] = await connection.query(`UPDATE cita
      SET fecha_cita = ?,
          Hora_cita = ?
      WHERE id_cita = UUID_TO_BIN(?)`, [fechaCita, horaCita, id])
      return (updateCita)
    } catch (error) {
      return (error)
    }
  }

  static async desactivarCita ({ id, input }) {
    try {
      const { anotacion } = input

      const [[estadoCita]] = await connection.query('SELECT estado_cita FROM cita WHERE id_cita = UUID_TO_BIN(?)', [id])
      if (!estadoCita) throw new NotFoundUser()
      if (estadoCita.estado_cita !== 1) throw new AccountAlreadyDisable()

      const [res] = await connection.query('UPDATE cita SET estado_cita = 0, anotacion_cita = ? WHERE id_cita = UUID_TO_BIN(?)', [anotacion, id])

      return res
    } catch (err) {
      return err
    }
  }
}
