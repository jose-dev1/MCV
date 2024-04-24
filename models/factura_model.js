import connection from './connection_database.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export class FacturaModel {
    static async getAllServicios() {
        try {
            const [rows] = await connection.query('SELECT * FROM servicios')
            if (!rows) throw new NoDataFound()
            if (rows.length === 0) throw new NoDataFound()
            return rows
        } catch (error) {
            return error
        }
    }

    static async postFactura(dataToSend) {
        try {
            console.log(dataToSend)
            const { cliente, servicios, numero_documento } = dataToSend;

            const [[idUsuario]] = await connection.query(`SELECT BIN_TO_UUID(id_cliente) id_cliente FROM clientes WHERE numero_documento_cliente = ?`, [numero_documento]);
            const { id_cliente: id_new_cliente } = idUsuario
            console.log(
                id_new_cliente
            )
            const [insertFacturaResult] = await connection.query(`INSERT INTO facturas (fecha_factura, valor_factura,factura_iva, descripcion_factura, estado, anotacion_factura, id_cliente) VALUES (?, ?, ?, ?, ?,?, UUID_TO_BIN(?))`, [
                cliente.fechaFacturacion,
                cliente.precioTotal,
                dataToSend.precioFinal,
                cliente.observaciones,
                cliente.estado,
                'Anotación adicional',
                id_new_cliente
            ]);
            return {
                success: true
            };

        } catch (error) {
            return error;
        }
    }

    static async postHasFactura(dataToSend) {
        try {

            const { servicios, numero_documento } = dataToSend

            const [[id_cliente]] = await connection.query(`SELECT BIN_TO_UUID(id_cliente) id_cliente FROM clientes WHERE numero_documento_cliente = ?`, [numero_documento]);
            const { id_cliente: id_new_cliente } = id_cliente

            const [[idFactura]] = await connection.query(`SELECT BIN_TO_UUID(id_factura) id_factura FROM facturas WHERE id_cliente = UUID_TO_BIN(?)`, [id_new_cliente]);
            const { id_factura: id_new_factura } = idFactura



            for (const servicio of servicios) {
                await connection.query(`INSERT INTO facturas_has_servicios (valor_servicio, id_factura, id_servicio) VALUES (?, UUID_TO_BIN(?), ?)`, [
                    servicio.precio,
                    id_new_factura,
                    servicio.id_servicio
                ]);
            }

        } catch (error) {
            return error
        }
    }

    static async getFacturas() {
        try {
            const [rows] = await connection.query(`
            SELECT BIN_TO_UUID(id_factura) id , f.valor_factura, f.fecha_factura, CONCAT(c.primer_nombre_cliente, ' ', c.primer_apellido_cliente) AS nombre_cliente, numero_documento_cliente, factura_iva
            FROM facturas f
            INNER JOIN clientes c ON f.id_cliente = c.id_cliente
            `);
            if (!rows) throw new NoDataFound();
            if (rows.length === 0) throw new NoDataFound();
            return rows;
        } catch (error) {
            return error;
        }
    }


    static async getFacturasbyId(id) {
        try {
            const [rows] = await connection.query(`
            SELECT BIN_TO_UUID(id_factura) id , f.valor_factura, f.fecha_factura,f.factura_iva, f.descripcion_factura, CONCAT(c.primer_nombre_cliente, ' ', c.primer_apellido_cliente) AS nombre_cliente, numero_documento_cliente 
            FROM facturas f
            INNER JOIN clientes c ON f.id_cliente = c.id_cliente
            WHERE f.id_factura = UUID_TO_BIN(?)
            `, [id.id]);


            if (!rows) throw new NoDataFound();
            if (rows.length === 0) throw new NoDataFound();

            const [servicio] = await connection.query(`
                SELECT valor_servicio, descripcion_servicio FROM facturas_has_servicios
                INNER JOIN servicios ON facturas_has_servicios.id_servicio = servicios.id_servicio
                WHERE id_factura = UUID_TO_BIN(?)
                `, [id.id]);

            if (!servicio) throw new NoDataFound();
            if (servicio.length === 0) throw new NoDataFound();

            return { ...rows[0], servicio: servicio };
        } catch (error) {
            return error;
        }
    }



}