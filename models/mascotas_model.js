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


    static async getAllMascotas({ id }) {
        try {
            const [mascotas] = await connection.query(`SELECT BIN_TO_UUID(id_mascota) id, nombre_mascota, foto_mascota , fecha_nacimiento_mascota, raza_mascota, estado_mascota , tipo_sangre_mascota
            FROM mascotas WHERE id_cliente_mascota = UUID_TO_BIN(?)`, [id])
            if (!mascotas) throw new NoDataFound()
            if (mascotas.length === 0) throw new NoDataFound()
            return (mascotas)
        } catch (error) {

        }
    }

    static async getAllHistorialMascotas({ id }) {
        try {
            const historial = await connection.query(`SELECT 
            BIN_TO_UUID(hc.id_historia_clinica) id, 
            hc.fecha_creacion, 
            BIN_TO_UUID(rhc.id_registro_historia_clinica) AS id_registro_historia_clinica, 
            rhc.registro_historia_clinica_finalizado, 
            rhc.descripcion_registro_historia_clinica, 
            rhc.anotacion_registro_historia_clinica,
            servicios.descripcion_servicio AS descripcion_servicio
        FROM 
            historias_clinicas hc
        LEFT JOIN 
            registros_historias_clinicas rhc ON hc.id_historia_clinica = rhc.id_historia_clinica
        LEFT JOIN 
            servicios ON rhc.id_servicio = servicios.id_servicio
        WHERE 
            hc.id_mascota_historia = UUID_TO_BIN(?);`, [id])
            if (!historial) throw new NoDataFound()
            if (historial.length === 0) throw new NoDataFound()
            return (historial)
        } catch (error) {
            return (error)
        }
    }

    static async getServiciosGroobyId({ id }) {
        try {
            const [servicios] = await connection.query(`SELECT 
            BIN_TO_UUID(sg.id_servicio_groomer) id,
            sg.fecha_servicio_groomer,
            sg.contenido_servicio_groomer,
            sg.estado_servicio_groomer,
            sg.anotacion_servicio_groomer,
            sg.servicio_finalizado_groomer,
            m.nombre_mascota,
            s.descripcion_servicio
        FROM 
            servicios_groomer sg
        INNER JOIN 
            mascotas m ON sg.id_mascota = m.id_mascota
        INNER JOIN 
            servicios s ON sg.id_servicio = s.id_servicio
        WHERE
            sg.id_mascota = UUID_TO_BIN(?)`, [id])
            if (!servicios) throw new NoDataFound()
            if (servicios.length === 0) throw new NoDataFound()
            return (servicios)
        } catch (error) {
            return (error)
        }
    }







}