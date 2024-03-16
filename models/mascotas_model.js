import connection from './connection_database.js'
import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'

export class MascotasModel {
    static async getAllRazas() {
        const [rows] = await connection.execute('SELECT * FROM tipo_mascota')
        if (!rows) throw new NoDataFound()
        if (rows.length === 0) throw new NoDataFound()
        return rows
    }

    static async getAllGeneros() {
        const [rows] = await connection.execute('SELECT * FROM genero_mascota')
        if (!rows) throw new NoDataFound()
        if (rows.length === 0) throw new NoDataFound()
        return rows
    }

    static async getCliente({ documento }) {
        try {
            const [clientes] = await connection.query('SELECT * FROM clientes WHERE numero_documento_cliente = ?', [documento])

            if (!clientes) throw new NoDataFound()
            if (clientes.length === 0) throw new NoDataFound()

            return clientes
        } catch (error) {
            return (error)
        }
    }


    static async newMascota({
        nombre_mascota,
        fecha_nacimiento_mascota,
        tipo_sangre_mascota,
        color_mascota,
        raza_mascota,
        peso_mascota,
        tamanno_mascota,
        microchip_mascota,
        foto_mascota,
        estado_mascota,
        anotacion_mascota,
        id_cliente_mascota,
        id_tipo_mascota,
        id_genero_mascota,
    }) {
        try {
            const [[idUsuario]] = await connection.query(`SELECT BIN_TO_UUID(id_cliente) id_cliente FROM clientes WHERE numero_documento_cliente = ?`, [id_cliente_mascota]);
            const { id_cliente: id_new_cliente } = idUsuario
            console.log(id_new_cliente)
            const [registroMaascota] = await connection.query('INSERT INTO mascotas (nombre_mascota, fecha_nacimiento_mascota, tipo_sangre_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, microchip_mascota, foto_mascota, estado_mascota, anotacion_mascota, id_cliente_mascota, id_tipo_mascota, id_genero_mascota ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, UUID_TO_BIN(?), ?, ?)',
                [nombre_mascota, fecha_nacimiento_mascota, tipo_sangre_mascota, color_mascota, raza_mascota, peso_mascota, tamanno_mascota, foto_mascota, estado_mascota, anotacion_mascota, id_new_cliente, id_tipo_mascota, id_genero_mascota])

            return { success: true }
        } catch (error) {
            console.error("Error al registrar:", error)
            return { error: "Error interno del servidor" }
        }
    }







}