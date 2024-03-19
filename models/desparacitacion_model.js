import { NoDataFound, DuplicateInfo, AccountAlreadyDisable } from '../squemas/errors_squemas.js';
import connection from './connection_database.js';

export class DesparasitacionesModel {
  static async getAllDesparasitaciones() {
    try {
      const [res] = await connection.query(
        `SELECT BIN_TO_UUID(id_desparacitacion) id, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica, laboratorio_desparacitacion, estado_desparacitacion, anotacion_desparacitacion, nombre_mascota,primer_nombre_cliente, primer_apellido_cliente, numero_documento_cliente, id_tipo_desparacitacion 
        FROM desparacitaciones
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        INNER JOIN clientes ON mascotas.id_cliente_mascota = clientes.id_cliente
        WHERE estado_desparacitacion = 1;`
      );

      if (!res || res.length === 0) throw new NoDataFound();

      return res;
    } catch (error) {
      return error;
    }
  }

  static async getDesparasitacionById({ id }) {
    try {
      const [[res]] = await connection.query(
        `SELECT BIN_TO_UUID(id_desparacitacion) id, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica, laboratorio_desparacitacion, estado_desparacitacion, anotacion_desparacitacion, nombre_mascota,numero_documento_cliente,id_tipo_documento,tipo_desparacitacion
        FROM desparacitaciones
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        INNER JOIN clientes ON clientes.id_cliente = mascotas.id_cliente_mascota
        INNER JOIN tipo_desparacitacion ON desparacitaciones.id_tipo_desparacitacion = tipo_desparacitacion.id_tipo_desparacitacion
        WHERE id_desparacitacion = UUID_TO_BIN(?);`,
        [id]
      );

      if (!res) throw new NoDataFound();

      return res;
    } catch (error) {
      return error;
    }
  }

  static async createDesparasitacion(value) {
    try {
      console.log(value.fecha_vencimiento_desparacitacion)
      console.log(value.fecha_aplicacion_desparacitacion)


      await connection.query(
        `INSERT INTO desparacitaciones 
        (id_desparacitacion, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica, laboratorio_desparacitacion, estado_desparacitacion, id_tipo_desparacitacion, id_mascota) 
        VALUES
        (UUID_TO_BIN(UUID()), ?,?, ?, ?, ?, ?, 1, ?, UUID_TO_BIN(?));`,
        [value.medicamento_aplicado,value.fecha_aplicacion_desparacitacion,value.fecha_vencimiento_desparacitacion, value.lote_desparacitacion, value.registro_ica, value.laboratorio_desparacitacion, value.idTipoDesparacitacion, value.idMascota]
      );

      return { message: 'Desparacitación registrada correctamente' };
    } catch (error) {
      console.log("no se esta insertando los datos", error);
      return error;
    }
  }

  static async updateDesparasitacion({ id, input }) {
    try {
      const {fechaAplicacionDesparacitacion } = input 
      console.log(fechaAplicacionDesparacitacion)
      
      const datosAntiguos = await this.getDesparasitacionById({ id });
      if (!datosAntiguos) throw new NoDataFound();

      const [res] = await connection.query(
        `UPDATE desparacitaciones
        SET fecha_aplicacion_desparacitacion = ? 
        WHERE id_desparacitacion = UUID_TO_BIN(?);`,
        [fechaAplicacionDesparacitacion,id]

      );

      return res;
    } catch (error) {
      console.log(error)

      return error;
    }
  }

  static async deleteDesparasitacion({ id, input }) {
    try {
      const { anotacion } = input;

      const [[existencia]] = await connection.query(
        `SELECT estado_desparacitacion FROM desparacitaciones
        WHERE id_desparacitacion = UUID_TO_BIN(?) AND estado_desparacitacion = 0;`,
        [id]
      );

      if (existencia) throw new AccountAlreadyDisable();

      const [res] = await connection.query(
        `UPDATE desparacitaciones
        SET anotacion_desparacitacion = ?, estado_desparacitacion = 0
        WHERE id_desparacitacion = UUID_TO_BIN(?);`,
        [anotacion, id]
      );

      return res;
    } catch (error) {
      console.log("no se puedo eliminar", error);
      return error;
    }
  }

  static async getDesparacitacionTypes() {
    try {
      const [res] = await connection.query('SELECT id_tipo_desparacitacion AS id, tipo_desparacitacion AS value FROM tipo_desparacitacion')

      if (!res) throw new NoDataFound()
      if (res.length === 0) throw new NoDataFound()

      return res
    } catch (error) {
      return error
    }
  }
}

