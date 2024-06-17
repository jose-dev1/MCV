/* eslint-disable camelcase */
import connection from './connection_database.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export class FacturaModel {
  static async getAllServicios () {
    try {
      const [rows] = await connection.query('SELECT * FROM servicios')
      if (!rows) throw new NoDataFound()
      if (rows.length === 0) throw new NoDataFound()
      return rows
    } catch (error) {
      return error
    }
  }

  static async postFactura (dataToSend) {
    try {
      const { cliente, servicios, numero_documento } = dataToSend

      await connection.beginTransaction()

      const [[idUsuario]] = await connection.query(
        'SELECT BIN_TO_UUID(id_cliente) id_cliente FROM clientes WHERE numero_documento_cliente = ?',
        [numero_documento]
      )
      const { id_cliente: id_new_cliente } = idUsuario

      const fechaFactura = new Date().toISOString().slice(0, 23).replace('T', ' ')

      await connection.query(
                `INSERT INTO facturas (fecha_factura, valor_factura, factura_iva, descripcion_factura, estado, anotacion_factura, id_cliente)
                VALUES (?, ?, ?, ?, ?, ?, UUID_TO_BIN(?))`,
                [
                  fechaFactura,
                  cliente.precioTotal,
                  dataToSend.precioFinal,
                  cliente.observaciones,
                  cliente.estado,
                  'Anotación adicional',
                  id_new_cliente
                ]
      )

      const [lastInsertId] = await connection.query(
        'SELECT BIN_TO_UUID(id_factura) id_factura FROM facturas WHERE estado = 1 ORDER BY fecha_factura DESC LIMIT 1'
      )

      for (const servicio of servicios) {
        await connection.query(
                    `INSERT INTO facturas_has_servicios (valor_servicio, id_factura, id_servicio)
                    VALUES (?, UUID_TO_BIN(?), ?)`,
                    [servicio.precio, lastInsertId[0].id_factura, servicio.id_servicio]
        )
      }

      await connection.commit()

      return {
        success: true
      }
    } catch (error) {
      await connection.rollback()
      return error
    }
  }

  static async getFacturas () {
    try {
      const [rows] = await connection.query(`
            SELECT BIN_TO_UUID(id_factura) id , f.valor_factura, f.fecha_factura, CONCAT(c.primer_nombre_cliente, ' ', c.primer_apellido_cliente) AS nombre_cliente, numero_documento_cliente, factura_iva
            FROM facturas f
            INNER JOIN clientes c ON f.id_cliente = c.id_cliente
            WHERE estado = 1
            `)
      if (!rows) throw new NoDataFound()
      if (rows.length === 0) throw new NoDataFound()
      return rows
    } catch (error) {
      return error
    }
  }

  static async getFacturasbyId (id) {
    try {
      const [rows] = await connection.query(`
            SELECT BIN_TO_UUID(id_factura) id , f.valor_factura, f.fecha_factura,f.factura_iva, f.descripcion_factura, CONCAT(c.primer_nombre_cliente, ' ', c.primer_apellido_cliente) AS nombre_cliente, numero_documento_cliente 
            FROM facturas f
            INNER JOIN clientes c ON f.id_cliente = c.id_cliente
            WHERE f.id_factura = UUID_TO_BIN(?) ORDER BY fecha_factura DESC LIMIT 1 
            `, [id.id])

      if (!rows) throw new NoDataFound()
      if (rows.length === 0) throw new NoDataFound()

      const [servicio] = await connection.query(`
                SELECT valor_servicio, descripcion_servicio FROM facturas_has_servicios
                INNER JOIN servicios ON facturas_has_servicios.id_servicio = servicios.id_servicio
                WHERE id_factura = UUID_TO_BIN(?) 
                `, [id.id])

      if (!servicio) throw new NoDataFound()
      if (servicio.length === 0) throw new NoDataFound()

      return { ...rows[0], servicio }
    } catch (error) {
      return error
    }
  }

  static async deleteFactura (id, data) {
    try {
      await connection.query('UPDATE facturas SET anotacion_factura = ?, estado = 0 WHERE id_factura = UUID_TO_BIN(?)', [data.anotacion, id])
      return {
        success: true
      }
    } catch (error) {
      return error
    }
  }
}
