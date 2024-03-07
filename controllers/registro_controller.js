import { registroModel } from "../models/registro_model.js";
import connection from "../models/connection_database.js";
import { query } from "express";

export class RegistroController {
  static async registro(req, res) {
    const { userCorreo, userPassword, userGenero, userRol } = req.body;
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

  static async registroCliente(req, res) {}

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

  static async getDocumento(req, res) {
    try {
      const documento = `SELECT * FROM tipo_documento`;
      const [doc] = await connection.query(documento);
      res.json(doc);
    } catch (error) {
      console.error("Error al obtener los generos:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  
}
