import connection from './connection_database.js'

export class HomePerfilModel {
  static async getHome (id) {
    const [[data1]] = await connection.query(`SELECT COUNT(*) AS total_solicitudes_citas
        FROM cita c
        JOIN mascotas m ON c.id_mascota = m.id_mascota
        WHERE m.id_cliente_mascota = UUID_TO_BIN(?);        
        
        `, [id.id])
    const [[data2]] = await connection.query(`SELECT COUNT(*) AS total_mascotas
        FROM mascotas
        WHERE id_cliente_mascota = UUID_TO_BIN(?) AND estado_mascota = 1;
              
        `, [id.id])
    const [[data3]] = await connection.query(`SELECT COUNT(*) AS total_examenes_generados
        FROM examenes e
        JOIN mascotas m ON e.id_mascota = m.id_mascota
        WHERE m.id_cliente_mascota = UUID_TO_BIN(?);
            
        
        `, [id.id])
    const [[data4]] = await connection.query(`SELECT COUNT(*) AS total_certificados_generados
        FROM certificados c
        JOIN mascotas m ON c.id_mascota = m.id_mascota
        WHERE m.id_cliente_mascota = UUID_TO_BIN(?);
            
        
        `, [id.id])
    return ({ ...data1, ...data2, ...data3, ...data4 })
  }
}
