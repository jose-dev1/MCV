import { NotFoundUser, NoDataFound, DuplicateInfo, AccountAlreadyDisable, InfoAlreadyExisting } from '../squemas/errors_squemas.js'
import connection from './connection_database.js'
import bcrypt from 'bcrypt'

export class AdminEmpleadoModel {
  static async getEmployee () {
    try {
      const [res] = await connection.query(`SELECT BIN_TO_UUID(empleados.id_empleado) id, empleados.numero_documento_empleado, empleados.id_tipo_documento, empleados.primer_nombre_empleado, empleados.segundo_nombre_empleado, empleados.primer_apellido_empleado, empleados.segundo_apellido_empleado, usuarios.correo_usuario, usuarios.password_usuario, usuarios.estado_usuario, tipo_usuario.descripcion_usuario
      FROM empleados
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      INNER JOIN tipo_usuario ON usuarios.id_tipo_usuario = tipo_usuario.id_tipo_usuario
      WHERE tipo_usuario.id_tipo_usuario != 1;`)

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async getEmployeeById ({ id }) {
    try {
      const [[res]] = await connection.query(`
      SELECT BIN_TO_UUID(empleados.id_empleado) id, empleados.numero_documento_empleado AS numeroDocumentoEmpleado, empleados.id_tipo_documento AS idTipoDocumento, empleados.primer_nombre_empleado AS primerNombreEmpleado, empleados.segundo_nombre_empleado AS segundoNombreEmpleado, empleados.primer_apellido_empleado AS primerApellidoEmpleado, empleados.segundo_apellido_empleado AS segundoApellidoEmpleado, usuarios.correo_usuario AS correoUsuario, usuarios.password_usuario AS passwordUsuario, usuarios.estado_usuario AS estadoUsuario, tipo_usuario.descripcion_usuario AS descripcionUsuario, tipo_usuario.id_tipo_usuario AS idTipoUsuario, tipo_documento.descripcion_documento AS descripcionDocumento, genero.id_genero AS idGenero
      FROM empleados
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      INNER JOIN tipo_usuario ON usuarios.id_tipo_usuario = tipo_usuario.id_tipo_usuario
      INNER JOIN tipo_documento ON tipo_documento.id_tipo_documento = empleados.id_tipo_documento
      INNER JOIN genero ON genero.id_genero = usuarios.id_genero
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

      const saltRounds = 10
      const encryPassword = await bcrypt.hash(passwordUsuario, saltRounds)
      const [usuario] = await connection.query(`INSERT INTO usuarios (correo_usuario, password_usuario, estado_usuario, estado_verificacion_usuario, id_genero, id_tipo_usuario) 
      VALUES (?,?,?,?,?,?);
      `, [correoUsuario, encryPassword, estadoUsuario, estadoVerificacionUsuario, idGenero, idTipoUsuario])

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

      const [[estadoCuenta]] = await connection.query(`SELECT usuarios.estado_usuario FROM usuarios 
      INNER JOIN empleados ON usuarios.id_usuario = empleados.id_usuario
      WHERE empleados.id_empleado = UUID_TO_BIN(?);`, [id])
      if (!estadoCuenta) throw new NotFoundUser()
      if (estadoCuenta.estado_usuario !== 1) throw new AccountAlreadyDisable()

      const [res] = await connection.query(`UPDATE usuarios 
      INNER JOIN empleados ON usuarios.id_usuario = empleados.id_usuario
      SET usuarios.estado_usuario = 0, usuarios.fecha_eliminacion = CURDATE(), usuarios.anotacion_usuario = ?
      WHERE empleados.id_empleado = UUID_TO_BIN(?);`,
      [anotacion, id])

      return res
    } catch (err) {
      return err
    }
  }

  static async updateEmployee ({ id, input }) {
    try {
      const { correoUsuario, idGenero, numeroDocumentoEmpleado, idTipoDocumento, primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado } = input

      const [verifyEmail] = await connection.query(`
      SELECT BIN_TO_UUID(usuarios.id_usuario) id 
      FROM usuarios
      INNER JOIN empleados ON empleados.id_usuario = usuarios.id_usuario
      WHERE correo_usuario = ? AND id_empleado != UUID_TO_BIN(?)`, [correoUsuario, id])
      console.log(verifyEmail)
      if (verifyEmail.length > 0) throw new DuplicateInfo()

      const [verifyUser] = await connection.query(`
      SELECT BIN_TO_UUID(id_empleado) id 
      FROM empleados
      WHERE id_tipo_documento = ? AND numero_documento_Empleado = ? AND id_empleado != UUID_TO_BIN(?)`, [idTipoDocumento, numeroDocumentoEmpleado, id])

      if (verifyUser.length > 0) throw new InfoAlreadyExisting()

      const [res] = await connection.query(`
      UPDATE empleados
      INNER JOIN usuarios ON empleados.id_usuario = usuarios.id_usuario
      SET primer_nombre_empleado = ?, segundo_nombre_empleado = ?, primer_apellido_empleado = ?, segundo_apellido_empleado = ?, correo_usuario = ?, id_tipo_documento = ?, numero_documento_Empleado = ?, id_genero =?
      WHERE id_empleado = UUID_TO_BIN(?)`,
      [primerNombreEmpleado, segundoNombreEmpleado, primerApellidoEmpleado, segundoApellidoEmpleado, correoUsuario, idTipoDocumento, numeroDocumentoEmpleado, idGenero, id])

      return res
    } catch (err) {
      return err
    }
  }

  static async getUserType () {
    try {
      const [res] = await connection.query(`SELECT id_tipo_usuario as id, descripcion_usuario as value FROM tipo_usuario
      WHERE id_tipo_usuario != 1 AND id_tipo_usuario != 2`)

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (err) {
      return err
    }
  }

  static async getGenreTypes () {
    try {
      const [res] = await connection.query('SELECT id_genero AS id, genero AS value FROM genero;')
      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (error) {
      return error
    }
  }
}
