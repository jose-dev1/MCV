import { NoDataFound, DuplicateInfo, AccountAlreadyDisable } from '../squemas/errors_squemas.js';
import connection from './connection_database.js';

export class DesparasitacionesModel {
  static async getAllDesparasitaciones() {
    try {
      const [res] = await connection.query(
        `SELECT BIN_TO_UUID(id_desparacitacion) id, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica, laboratorio_desparacitacion, estado_desparacitacion, anotacion_desparacitacion, nombre_mascota
        FROM desparacitaciones
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
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
        `SELECT BIN_TO_UUID(id_desparacitacion) id, medicamento_aplicado, fecha_aplicacion_desparacitacion, fecha_vencimiento_desparacitacion, lote_desparacitacion, registro_ica, laboratorio_desparacitacion, estado_desparacitacion, anotacion_desparacitacion, nombre_mascota
        FROM desparacitaciones
        INNER JOIN mascotas ON desparacitaciones.id_mascota = mascotas.id_mascota
        WHERE id_desparasitacion = UUID_TO_BIN(?);`,
        [id]
      );

      if (!res) throw new NoDataFound();

      return res;
    } catch (error) {
      return error;
    }
  }

  static async createDesparasitacion(input) {
    try {
      const { idMascota } = input;

      const [[existingData]] = await connection.query(
        `SELECT BIN_TO_UUID(id_desparacitacion) id FROM desparacitaciones
        WHERE estado_desparacitacion = 1`
      );

      if (existingData) throw new DuplicateInfo();

      await connection.query(
        `INSERT INTO desparacitaciones (estado_desparacitacion, id_mascota) VALUES
        (1, UUID_TO_BIN(?));`,
        [idMascota]
      );
    } catch (error) {
      return error;
    }
  }

  static async updateDesparasitacion({ id, input }) {
    try {
      const { medicamentoAplicado, fechaAplicacionDesparacitacion, fechaVencimientoDesparacitacion, loteDesparacitacion, registroIca, laboratorioDesparacitacion, estadoDesparacitacion, anotacionDesparacitacion } = input;

      const datosAntiguos = await this.getDesparasitacionById({ id });
      if (!datosAntiguos) throw new NoDataFound();

      const [res] = await connection.query(
        `UPDATE desparacitaciones
        SET medicamento_aplicado = ?, fecha_aplicacion_desparacitacion = ?, fecha_vencimiento_desparacitacion = ?, lote_desparacitacion = ?, registro_ica = ?, laboratorio_desparacitacion = ?, estado_desparacitacion = ?, anotacion_desparacitacion = ?
        WHERE id_desparacitacion = UUID_TO_BIN(?);`,
        [medicamentoAplicado, fechaAplicacionDesparacitacion, fechaVencimientoDesparacitacion, loteDesparacitacion, registroIca, laboratorioDesparacitacion, estadoDesparacitacion, anotacionDesparacitacion, id]
      );

      return res;
    } catch (error) {
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
        WHERE id_desparasitacion = UUID_TO_BIN(?);`,
        [anotacion, id]
      );

      return res;
    } catch (error) {
      return error;
    }
  }

  static async getDesparacitacionTypes(){
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

