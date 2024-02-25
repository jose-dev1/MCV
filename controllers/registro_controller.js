import { registroModel } from "../models/registro_model.js";
import connection from "../models/connection_database.js";

export class RegistroController {
  static async registro(req, res) {
    const { userCorreo, userPassword, userGenero, userRol } = req.body;
    console.log(req.body);
    try {
      const response = await registroModel.registrar({
        userCorreo,
        userPassword,
        userGenero,
        userRol,
      });

      if (response.error) {
        res.status(400).json({ message: response.error });
      } else {
        res.status(201).json({ message: "Registro exitoso" });
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async genero(req, res) {
    try {
      const query = ` SELECT * FROM genero`;
      const [generos] = await connection.query(query);
      res.json(generos);
    } catch (error) {
      console.error("Error al obtener los generos:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
