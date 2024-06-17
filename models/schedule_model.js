import connection from './connection_database.js'
import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'
import transporter from './coneccionEmail.js'

export class ScheduleModel {
  static async getEspecialista ({ especialista }) {
    try {
      const [getCita] = await connection.query(`SELECT BIN_TO_UUID(id_cita) id,fecha_cita, Hora_cita,primer_nombre_empleado,primer_apellido_empleado,primer_nombre_cliente,primer_apellido_cliente,nombre_mascota,descripcion_servicio from cita
      INNER JOIN empleados ON empleados.id_empleado=cita.id_empleado
      INNER JOIN mascotas ON mascotas.id_mascota=cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      INNER JOIN clientes ON clientes.id_cliente=mascotas.id_cliente_mascota
      WHERE  servicios.especialista = ? AND (fecha_cita >= CURDATE() OR (fecha_cita = CURDATE() AND Hora_cita > CURTIME())) AND estado_cita=1 AND asistencia_cita = 0;`, [especialista])
      if (!getCita) throw new NoDataFound()
      if (getCita.length === 0) throw new NoDataFound()
      return (getCita)
    } catch (error) {
      return (error)
    }
  }

  static async getId ({ id }) {
    try {
      const [[getCita]] = await connection.query(`SELECT BIN_TO_UUID(id_cita) id,fecha_cita, Hora_cita, CONCAT(primer_nombre_empleado," ",primer_apellido_empleado) as nombre_empleado,nombre_mascota,descripcion_documento, numero_documento_cliente, descripcion_servicio, especialista AS es, BIN_TO_UUID(cita.id_mascota) id_mascota, BIN_TO_UUID(cita.id_empleado) id_empleado from cita
      INNER JOIN empleados ON empleados.id_empleado=cita.id_empleado
      INNER JOIN mascotas ON mascotas.id_mascota=cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      INNER JOIN clientes ON clientes.id_cliente=mascotas.id_cliente_mascota
      INNER JOIN tipo_documento ON tipo_documento.id_tipo_documento = clientes.id_tipo_documento
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
      const [getCita] = await connection.query(`SELECT BIN_TO_UUID(id_cita) id, primer_nombre_cliente,primer_apellido_cliente, tipo_mascota, Hora_Cita, nombre_mascota,descripcion_servicio from cita
      INNER JOIN empleados ON empleados.id_empleado=cita.id_empleado
      INNER JOIN mascotas ON mascotas.id_mascota=cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
      INNER JOIN tipo_mascota ON mascotas.id_tipo_mascota = tipo_mascota.id_tipo_mascota
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      WHERE fecha_cita = ? AND estado_cita = 1 AND usuarios.id_usuario = UUID_TO_BIN(?);`, [fechaCita, idEmpleado])
      if (!getCita) throw new NoDataFound()
      if (getCita.length === 0) throw new NoDataFound()
      return (getCita)
    } catch (error) {
      return (error)
    }
  }

  static async getFechaEmpleado ({ fechaCita, idEmpleado }) {
    try {
      const [getCita] = await connection.query(`SELECT BIN_TO_UUID(id_cita) id, primer_nombre_cliente,primer_apellido_cliente, tipo_mascota, Hora_cita, nombre_mascota,descripcion_servicio from cita
      INNER JOIN empleados ON empleados.id_empleado=cita.id_empleado
      INNER JOIN mascotas ON mascotas.id_mascota=cita.id_mascota
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
      INNER JOIN tipo_mascota ON mascotas.id_tipo_mascota = tipo_mascota.id_tipo_mascota
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      WHERE fecha_cita = ? AND estado_cita = 1 AND empleados.id_empleado = UUID_TO_BIN(?);`, [fechaCita, idEmpleado])
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
      WHERE id_cliente = ? AND estado_mascota = 1`, [idCliente])
      if (!mascotas) throw new NoDataFound()
      if (mascotas.length === 0) throw new NoDataFound()
      return (mascotas)
    } catch (error) {
      return (error)
    }
  }

  static async getServicios ({ especialista }) {
    try {
      const [servicios] = await connection.query(`SELECT id_Servicio as id, descripcion_servicio as value FROM servicios
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
      const [especialistas] = await connection.query(`SELECT BIN_TO_UUID(id_empleado) id, CONCAT(primer_nombre_empleado, ' ', primer_apellido_empleado) AS value FROM empleados
      INNER JOIN usuarios ON usuarios.id_usuario = empleados.id_usuario
      WHERE id_tipo_usuario = ? AND estado_usuario = 1`, [idTipoUsuario])
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
      WHERE fecha_cita = ? AND hora_cita = ? AND estado_cita = 1 AND id_empleado = UUID_TO_BIN(?)`, [fechaCita, horaCita, idEmpleado])
      if (existenciaCita) throw new DuplicateInfo()

      const [[pacienteYaCita]] = await connection.query(`SELECT estado_cita FROM cita
      INNER JOIN servicios ON servicios.id_servicio = cita.id_servicio
      WHERE id_mascota = UUID_TO_BIN(?) AND asistencia_cita = 0 AND estado_cita = 1 AND (fecha_cita >= CURDATE() OR (fecha_cita = CURDATE() AND hora_cita > CURTIME())) AND especialista = ?`, [idMascota, especialista])

      if (pacienteYaCita) throw new InfoAlreadyExisting()

      const [[pacienteCitaHora]] = await connection.query(`SELECT estado_cita FROM cita
      WHERE id_mascota = UUID_TO_BIN(?) AND fecha_cita = ? AND hora_cita = ? AND estado_cita = 1`, [idMascota, fechaCita, horaCita])

      if (pacienteCitaHora) throw new OccupiedSpace()

      const insertCita = await connection.query(`INSERT INTO cita (fecha_cita, Hora_cita, estado_cita,
        id_empleado, id_servicio, id_mascota) VALUES (?, ?, ?, UUID_TO_BIN(?), ?, UUID_TO_BIN(?));`, [fechaCita, horaCita, estadoCita, idEmpleado, idServicio, idMascota])

      if (insertCita) {
        try {
          const [[datsoEmail]] = await connection.query(`
              SELECT nombre_mascota, primer_nombre_cliente, primer_apellido_cliente, correo_usuario
              FROM mascotas
              INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
              INNER JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
              WHERE mascotas.id_mascota = UUID_TO_BIN(?);
            `, [idMascota])

          if (datsoEmail) {
            const { nombre_mascota: mascota, primer_nombre_cliente: pNombre, primer_apellido_cliente: pApellido, correo_usuario: correo } = datsoEmail

            const mailOptions = {
              from: 'samivazqueles@gmail.com',
              to: `${correo}`,
              subject: 'Cita Agendada',
              html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif; background-color: #F3F4F6; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative;">
                  <i class="fas fa-dog" style="color: #4CAF50; font-size: 48px; position: absolute; top: -25px; left: 20px;"></i>
                  <h2 style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Hemos agendado cita:</h2>
                  <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Hola</strong> ${pNombre} ${pApellido}, confirmamos tu cita para ${mascota}</p>
                  <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Fecha cita:</strong> ${fechaCita}</p>
                  <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Hora cita:</strong> ${horaCita}</p>
                  <h2 style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Confirmamos la cita</h2>
                </div>
              `
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.error(error)
              }
            })
          }
        } catch (error) {
          return error
        }
      }

      return insertCita
    } catch (error) {
      return error
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

      const datosAntiguos = await this.getId({ id })
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

      const [[datosUsuarios]] = await connection.query(`SELECT correo_usuario, CONCAT(primer_nombre_cliente, ' ' , primer_apellido_cliente) nombre_cliente, nombre_mascota, fecha_cita, Hora_cita, descripcion_servicio, CONCAT(primer_nombre_empleado, ' ' , primer_apellido_empleado) nombre_empleado
      FROM cita
      INNER JOIN mascotas ON cita.id_mascota = mascotas.id_mascota
      INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
      INNER JOIN usuarios ON clientes.id_usuario = usuarios.id_usuario
      INNER JOIN servicios ON cita.id_servicio = servicios.id_servicio
      INNER JOIN empleados ON cita.id_empleado = empleados.id_empleado
      WHERE id_cita = UUID_TO_BIN(?);`, [id])

      if (datosUsuarios) {
        const { correo_usuario: correo, nombre_cliente: cliente, nombre_mascota: mascota, fecha_cita: fecha, Hora_cita: hora, descripcion_servicio: servicio, nombre_empleado: empleado } = datosUsuarios
        const mailOptions = {
          from: 'samivazqueles@gmail.com',
          to: `${correo}`,
          subject: 'Cancelacion cita',
          html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif; background-color: #F3F4F6; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: relative;">
              <i class="fas fa-dog" style="color: #4CAF50; font-size: 48px; position: absolute; top: -25px; left: 20px;"></i>
              <h2 style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Hemos cancelado la cita agendada para la sigueinte mascota:</h2>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Nombre del cliente:</strong> ${cliente}</p>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Nombre mascota:</strong> ${mascota}</p>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Fecha cita:</strong> ${`${fecha}`.split('T')[0]}</p>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Hora cita:</strong> ${hora}</p>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Servicio:</strong> ${servicio}</p>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Nombre especialista:</strong> ${empleado}</p>
              <p style="color: #333; font-size: 18px; margin-bottom: 10px;"><strong>Motivo:</strong> ${anotacion}</p>
              <h2 style="color: #4CAF50; font-size: 28px; font-weight: bold; margin-bottom: 20px;">Por favor vuelve a contactar con nosotros si deseas reagendar el servicio</h2>
            </div>
          `
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          }
        })
      }

      return res
    } catch (err) {
      return err
    }
  }
}
