import connection from './connection_database.js'
import { NotFoundUser } from "../squemas/errors_squemas.js";


export class HomeAuxilModel {
    static async getData (req, res){
        const [[data1]] = await connection.query(`SELECT COUNT(*) AS total_facturas
        FROM facturas;
        `)
        const [[data2]] = await connection.query(`SELECT estado_hospitalizacion, COUNT(*) AS total_hospitalizaciones
        FROM hospitalizaciones
        GROUP BY estado_hospitalizacion;
        `)
        const [[data3]] = await connection.query(`SELECT COUNT(*) AS total_desparacitaciones
        FROM desparacitaciones;
        `)
        const [[data4]] = await connection.query(`SELECT asistencia_cita, COUNT(*) AS total_citas
        FROM cita
        GROUP BY asistencia_cita;
        `)
        return ({ ...data1, ...data2, ...data3, ...data4  })
    }
}