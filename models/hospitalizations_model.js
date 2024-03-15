import connection from './connection_database.js'
import { NoDataFound, NotFoundUser, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'

export class HospitalizationsModel {
  static async getAll () {
    try {
      const [getAll] = await connection.query(`SELECT BIN_TO_UUID(id_hospitalizacion) id, fecha_hospitalizacion, servicio_finalizado_hospitalizacion,nombre_mascota,tipo_mascota,primer_nombre_cliente,primer_apellido_cliente,telefono_cliente, fecha_salida_hospitalizacion FROM hospitalizaciones
      INNER JOIN mascotas ON mascotas.id_mascota = hospitalizaciones.id_mascota
      INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
      INNER JOIN tipo_mascota ON tipo_mascota.id_tipo_mascota = mascotas.id_tipo_mascota
      WHERE estado_hospitalizacion = 1`)
      if (!getAll) throw new NoDataFound()
      if (getAll.length === 0) throw new NoDataFound()
      return (getAll)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async getId ({ id }) {
    try {
      const [[getAll]] = await connection.query(`SELECT BIN_TO_UUID(id_hospitalizacion) id, fecha_hospitalizacion, servicio_finalizado_hospitalizacion,nombre_mascota,telefono_cliente, fecha_salida_hospitalizacion, contenido_hospitalizacion,descripcion_documento, numero_documento_cliente AS numeroDocumento FROM hospitalizaciones
      INNER JOIN mascotas ON mascotas.id_mascota = hospitalizaciones.id_mascota
      INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
      INNER JOIN tipo_documento ON tipo_documento.id_tipo_documento = clientes.id_tipo_documento
      INNER JOIN tipo_mascota ON tipo_mascota.id_tipo_mascota = mascotas.id_tipo_mascota
      WHERE estado_hospitalizacion = 1 AND id_hospitalizacion = UUID_TO_BIN(?)`, [id])
      if (!getAll) throw new NoDataFound()
      return (getAll)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async create ({ input }) {
    try {
      const { contenidoHospitalizacion, idMascota } = input
      const [[comprobacion]] = await connection.query(`SELECT servicio_finalizado_hospitalizacion, estado_hospitalizacion FROM hospitalizaciones
      WHERE  id_mascota = UUID_TO_BIN(?) AND servicio_finalizado_hospitalizacion = 0 AND estado_hospitalizacion= 1`, [idMascota])

      if (comprobacion) throw new InfoAlreadyExisting()

      const insert = await connection.query(`INSERT INTO hospitalizaciones (contenido_hospitalizacion,estado_hospitalizacion,servicio_finalizado_hospitalizacion,id_mascota) VALUES
      (?,1,0,UUID_TO_BIN(?))`, [contenidoHospitalizacion, idMascota])
      return (insert)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async update ({ id, input }) {
    try {
      const { fechaSalida, contenidoHospitalizacion, servicioFinializadoHospitalizacion } = input
      console.log(fechaSalida)
      const datosAntiguos = await this.getId({ id })
      if (datosAntiguos instanceof NoDataFound) throw new NoDataFound()

      const [[existencia]] = await connection.query(`SELECT estado_hospitalizacion FROM hospitalizaciones
      WHERE id_hospitalizacion = UUID_TO_BIN(?) AND estado_hospitalizacion = 0`, [id])
      if (existencia) throw new AccountAlreadyDisable()

      const update = await connection.query(`UPDATE hospitalizaciones 
      SET fecha_salida_hospitalizacion = ?,
      contenido_hospitalizacion = ?,
      servicio_finalizado_hospitalizacion = ?
      WHERE id_hospitalizacion = UUID_TO_BIN(?)
      `, [fechaSalida, contenidoHospitalizacion, servicioFinializadoHospitalizacion, id])
      return (update)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async delete ({ id, input }) {
    try {
      const { anotacion } = input
      const [[existencia]] = await connection.query(`SELECT estado_hospitalizacion FROM hospitalizaciones
      WHERE id_hospitalizacion = UUID_TO_BIN(?)`, [id])
      if (!existencia) throw new NotFoundUser()
      const { estado_hospitalizacion: estado } = existencia

      if (estado === 0) throw new AccountAlreadyDisable()
      const response = await connection.query(`UPDATE hospitalizaciones
      SET anotacion_hospitalizacion = ?,
      estado_hospitalizacion = 0
      WHERE id_hospitalizacion = UUID_TO_BIN(?)`, [anotacion, id])
      return (response)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }
}
