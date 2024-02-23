/* eslint-disable camelcase */
import { NotFoundUser, NoDataFound, DuplicateInfo, AccountAlreadyDisable } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'

export class AdminEmpleadoModel {
  static async getEmployee () {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(empleados.id_empleado) id, empleados.numero_documento_empleado, empleados.id_tipo_documento, empleados.primer_nombre_empleado, empleados.segundo_nombre_empleado, empleados.primer_apellido_empleado, empleados.segundo_apellido_empleado, usuarios.correo_usuario, usuarios.password_usuario, usuarios.estado_usuario, tipo_usuario.descripcion_usuario
      FROM empleados
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      INNER JOIN tipo_usuario ON usuarios.id_tipo_usuario = tipo_usuario.id_tipo_usuario;`)

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async getEmployeeById ({ id }) {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(empleados.id_empleado) id, empleados.numero_documento_empleado, empleados.id_tipo_documento, empleados.primer_nombre_empleado, empleados.segundo_nombre_empleado, empleados.primer_apellido_empleado, empleados.segundo_apellido_empleado, usuarios.correo_usuario, usuarios.password_usuario, usuarios.estado_usuario, tipo_usuario.descripcion_usuario
      FROM empleados
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      INNER JOIN tipo_usuario ON usuarios.id_tipo_usuario = tipo_usuario.id_tipo_usuario  
      WHERE id_empleado = UUID_TO_BIN(?);`, [id])

      if (!res) throw new NotFoundUser()
      if (res.length === 0) throw new NotFoundUser()

      return res
    } catch (err) {
      return err
    }
  }

  static async createEmployee (input) {
    try {
      const { correoUsuario, passwordUsuario, estadoUsuario, estadoVerificacionUsuario, idGenero, idTipoUsuario, numeroDocumentoEmpleado, idTipoDocumento, primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado } = input

      const [[existingData]] = await connection.query(`
        SELECT u.id_usuario, e.numero_documento_empleado, e.id_tipo_documento
        FROM usuarios u
        LEFT JOIN empleados e ON u.id_usuario = e.id_usuario
        WHERE u.correo_usuario = ? OR (e.numero_documento_empleado = ? AND e.id_tipo_documento = ?)
    `, [correoUsuario, numeroDocumentoEmpleado, idTipoDocumento])

      if (existingData) throw new DuplicateInfo()

      await connection.beginTransaction()

      const [usuario] = await connection.query(`INSERT INTO usuarios (correo_usuario, password_usuario, estado_usuario, estado_verificacion_usuario, id_genero, id_tipo_usuario) 
      VALUES (?,?,?,?,?,?);
      `, [correoUsuario, passwordUsuario, estadoUsuario, estadoVerificacionUsuario, idGenero, idTipoUsuario])

      await connection.query(`INSERT INTO empleados (numero_documento_empleado, id_tipo_documento, primer_nombre_empleado, segundo_nombre_empleado, primer_apellido_empleado, segundo_apellido_empleado, id_usuario)
      VALUES (?,?,?,?,?,?,(SELECT id_usuario FROM usuarios WHERE correo_usuario = ?));`, [numeroDocumentoEmpleado, idTipoDocumento, primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado, correoUsuario])

      await connection.commit()

      return usuario
    } catch (err) {
      await connection.rollback()
      return err
    }
  }

  static async deleteEmployee ({ id, input }) {
    try {
      const { anotacion } = input

      const [[estadoCuenta]] = await connection.query('SELECT estado_usuario FROM usuarios WHERE id_usuario = UUID_TO_BIN(?)', [id])
      if (!estadoCuenta) throw new NotFoundUser()
      if (estadoCuenta.estado_usuario !== 1) throw new AccountAlreadyDisable()

      const [res] = await connection.query('UPDATE usuarios SET estado_usuario = 0, fecha_eliminacion = CURDATE(), anotacion_usuario = ? WHERE id_usuario = UUID_TO_BIN(?)', [anotacion, id])

      return res
    } catch (err) {
      return err
    }
  }

  static async updateEmployee ({ id, input }) {
    try {
      const datosAntiguos = await this.getEmployeeById({ id })

      const datosActualizar = {
        ...datosAntiguos[0],
        ...input
      }
      const { primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado } = datosActualizar

      const [res] = await connection.query('UPDATE empleados SET primer_nombre_empleado = ?, segundo_nombre_empleado = ?, primer_apellido_empleado = ?, segundo_apellido_empleado = ?', [primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado])

      return res
    } catch (err) {
      return err
    }
  }
}
