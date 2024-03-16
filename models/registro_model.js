import connection from "./connection_database.js"
import "dotenv/config"
import bcrypt from "bcrypt"
import crypto from "crypto"
import Mailjet from "node-mailjet"
import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'


export class registroModel {
  static async registrar({ userCorreo, userPassword, userRol, userGenero }) {
    try {
      const secret = crypto.randomBytes(32).toString("hex")
      const [existingUser] = await connection.query(
        "SELECT * FROM usuarios WHERE correo_usuario = ?",
        [userCorreo]
      )
      if (existingUser.length > 0) {
        return { error: "El correo electrónico ya está en uso" }
      }
      const saltRounds = 10
      const encryPassword = await bcrypt.hash(userPassword, saltRounds)
      const [registro] = await connection.query(
        "INSERT INTO usuarios (correo_usuario, password_usuario, id_tipo_usuario, id_genero) VALUES (?, ?, ?, ?)",
        [userCorreo, encryPassword, userRol, userGenero]
      )
      const [validar] = await connection.query(
        "INSERT INTO verificacion_correo (fk_id_usuario , codigo_verificacion) VALUES ((SELECT id_usuario FROM usuarios WHERE correo_usuario = ?), ?) ",
        [userCorreo, secret]
      )

      return { success: true }
    } catch (err) {
      console.error("Error al registrar:", err)
      return { error: "Error interno del servidor" }
    }
  }

  static async enviarCorreo({ userCorreo }) {
    const mailjet = Mailjet.apiConnect(
      "fb70ac85f9fc0695f566f0d6fc96b94c",
      "b9fec93859032dd287fa4c1c25717223"
    )

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "jose.cm30@hotmail.com",
            Name: "Mailjet Pilot",
          },
          To: [
            {
              Email: userCorreo,
              Name: "Jose Castaño",
            },
          ],
          Subject: "Your email flight plan!",
          TextPart:
            "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    })

    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
  }
  static async registroClientes({
    numero_documento_cliente,
    id_tipo_documento,
    lugar_expedicion_documento,
    primer_nombre_cliente,
    segundo_nombre_cliente,
    primer_apellido_cliente,
    segundo_apellido_cliente,
    telefono_cliente,
    direccion_cliente,
    estado_cliente,
    id_usuario,
  }) {
    try {
      const [[idUsuario]] = await connection.query(`SELECT BIN_TO_UUID(id_usuario) id_usuario FROM usuarios WHERE correo_usuario = ?`, [id_usuario]);
      const { id_usuario: idRegistro } = idUsuario
      const [registrosCl] = await connection.query("INSERT INTO clientes (numero_documento_cliente, id_tipo_documento, lugar_expedicion_documento, primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente, telefono_cliente, direccion_cliente, estado_cliente, id_usuario) VALUES (?,?,?,?,?,?,?,?,?,?,UUID_TO_BIN(?))",
        [numero_documento_cliente, id_tipo_documento, lugar_expedicion_documento, primer_nombre_cliente, segundo_nombre_cliente, primer_apellido_cliente, segundo_apellido_cliente, telefono_cliente, direccion_cliente, estado_cliente, idRegistro]
      );
      return { success: true };
    } catch (error) {
      console.error("Error al registrar:", error);
      return { error: "Error interno del servidor" };
    }
  }

  static async getExamenes(){
    try{
      const [tipoExamenes] = await connection.query(`SELECT * FROM examenes`)
      if (!tipoExamenes) throw new NoDataFound()
      if (tipoExamenes.length === 0) throw new NoDataFound()
      return (tipoExamenes)
    }catch(error){
      return (error)
    }
  }

  static async getCertificados(){
    try{
      const [tipoCertificados] = await connection.query(`SELECT * FROM certificados`)
      if(!tipoCertificados) throw new NoDataFound()
      if(tipoCertificados.length === 0) throw new NoDataFound()
      return(tipoCertificados)
    }catch (error){
      return (error)
    }
  }
}
