import connection from "./connection_database.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export class registroModel {
  static async registrar({ userCorreo, userPassword, userRol, userGenero }) {
    try {
      const secret = crypto.randomBytes(32).toString("hex");
      const [existingUser] = await connection.query(
        "SELECT * FROM usuarios WHERE correo_usuario = ?",
        [userCorreo]
      );
      if (existingUser.length > 0) {
        return { error: "El correo electrónico ya está en uso" };
      }

      if (!userPassword) {
        throw new Error("La contraseña es requerida");
      }

      const saltRounds = 10;
      const encryPassword = await bcrypt.hash(userPassword, saltRounds);
      const [registro] = await connection.query(
        "INSERT INTO usuarios (correo_usuario, password_usuario, id_tipo_usuario, id_genero) VALUES (?, ?, ?, ?)",
        [userCorreo, encryPassword, userRol, userGenero]
      );
      const insertId = registro.insertId;
      const [validar] = await connection.query(
        "INSERT INTO verificacion_correo (fk_id_usuario , codigo_verificacion) VALUES (?, ?) ",
        [insertId, secret]
      );
    } catch (err) {
      console.error("Error al registrar:", err);
      return { error: "Error interno del servidor" };
    }
  }
  static async registroCliente({}) {}
}
