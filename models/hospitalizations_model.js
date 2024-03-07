import connection from './connection_database.js'
import { NoDataFound, NotFoundUser, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'

export class HospitalizationsModel {
  static async getAll () {
    try {
      const [getAll] = await connection.query(`SELECT BIN_TO_UUID(id_hospitalizacion) id, fecha_hospitalizacion, servicio_finalizado_hospitalizacion,nombre_mascota,tipo_mascota,primer_nombre_cliente,primer_apellido_cliente,telefono_cliente, fecha_salida_hospitalizaciones FROM hospiptalizaciones
      INNER JOIN mascotas ON mascotas.id_mascotas = hospitalizaciones.id_mascotas
      INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
      INNER JOIN tipo_mascota ON tipo_mascota.id_tipo_mascota = masctoa.id_tipo_mascota
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
      const [getAll] = await connection.query(`SELECT BIN_TO_UUID(id_hospitalizacion) id, fecha_hospitalizacion, servicio_finalizado_hospitalizacion,nombre_mascota,tipo_mascota,primer_nombre_cliente,primer_apellido_cliente,telefono_cliente, fecha_salida_hospitalizaciones FROM hospiptalizaciones
      INNER JOIN mascotas ON mascotas.id_mascotas = hospitalizaciones.id_mascotas
      INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
      INNER JOIN tipo_mascota ON tipo_mascota.id_tipo_mascota = masctoa.id_tipo_mascota
      WHERE estado_hospitalizacion = 1 AND UUID_TO_BIN(?)`, [id])
      if (!getAll) throw new NoDataFound()
      if (getAll.length === 0) throw new NoDataFound()
      return (getAll)
    } catch (error) {
      console.log(error)
      return (error)
    }
  }

  static async create ({ input }) {
    try {
      const { fechaHospitalizacion, contenidoHospitalizacion, idMascota } = input
      const [[comprobacion]] = await connection.query(`SELECT servicio_finalizado_hospitalizacion, estado_hospitalizacion FROM hoispitalizaciones
      WHERE  id_mascota = UUID_TO_BIN(?)`, [idMascota])

      const { servicio_finalizado_hospitalizacion: servicioFinializadoHospitalizacion, estado_hospitalizacion: estadoHospitaliazcion } = comprobacion

      if (servicioFinializadoHospitalizacion === 0 && estadoHospitaliazcion === 1) throw new InfoAlreadyExisting()

      const insert = await connection.query(`INSERT INTO hospitalizaciones (fecha_hospitalizacion,contenido_hospitalizacion,estado_hospitaliazcion,servicio_finalizado_hospitalizacion,id_mascota) VALUES
      (?,?,1,0,UUID_TO_BIN(?))`, [fechaHospitalizacion, contenidoHospitalizacion, idMascota])
      return (insert)
    } catch (error) {
      return (error)
    }
  }

  static async update ({ id, input }) {
    try {
      const { fechaSalida, contenidoHospitalizacion, servicioFinializadoHospitalizacion } = input
      const [[existencia]] = await connection.query(`SELECT estado_hospitalizacion FROM hospitalizaciones
      WHERE id_hospitalizacion = UUID_TO_BIN(?)`, [id])

      const { estado_hospitalizacion: estadoHospitaliazcion } = existencia

      if (estadoHospitaliazcion === 0) throw new AccountAlreadyDisable()
      const datosAntiguos = await this.getId({ id })
      if (datosAntiguos instanceof NoDataFound) throw new NoDataFound()
      const update = await connection.query(`UPDATE hospitalizaciones 
      SET fecha_salida = ?,
      contenido_hospitalizacion = ?,
      servicio_finalizado_hospitalizacion = ?
      WHERE id_hospitalizaciones = UUID_TO_BIN(?)
      `, [fechaSalida, contenidoHospitalizacion, servicioFinializadoHospitalizacion])
      return (update)
    } catch (error) {
      return (error)
    }
  }

  static async delete ({ id, input }) {
    try {
      const { anotacionHospitalizacion, estadoHospitalizacion } = input
      const [[existencia]] = await connection.query(`SELECT estado_hospitalizacion FROM hospitalizaciones
      WHERE id_hospitalizacion = UUID_TO_BIN(?)`, [id])
      if (!existencia) throw new NotFoundUser()
      const { estado_hospitalizacion: estado } = existencia

      if (estado === 0) throw new AccountAlreadyDisable()
      const response = await connection.query(`UPDATE hospitalizaciones
      SET anotacion_hospitalizacion = ?,
      estado_hospitalizacion = ?
      WHERE id_hospitalizacion = UUID_TO_BIN(?)`, [anotacionHospitalizacion, estadoHospitalizacion, id])
      return (response)
    } catch (error) {
      return (error)
    }
  }
}
