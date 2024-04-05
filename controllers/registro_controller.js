import { registroModel } from '../models/registro_model.js'
import connection from '../models/connection_database.js'
import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'


export class RegistroController {
  static async registro(req, res) {
    const { userCorreo, userPassword, userGenero, userRol } = req.body
    try {
      const response = await registroModel.registrar({
        userCorreo,
        userPassword,
        userGenero,
        userRol
      })

      if (response.error) {
        res.status(400).json({ error: response.error })
      } else {
        res.status(201).json({ message: 'Registro exitoso' })
        registroModel.enviarCorreo({ userCorreo, secret: response.secret })
      }
    } catch (error) {
      console.error('Error al registrar:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async registroCliente(req, res) {
    const {
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
      id_usuario
    } = req.body
    try {
      const respuesta = await registroModel.registroClientes({
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
        id_usuario
      })

      if (respuesta.error) {
        res.status(400).json({ error: response.error })
      } else {
        res.status(201).json({ message: 'Registro de cliente exitoso' })
      }
    } catch (error) {
      console.error('Error al registrar:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async verificarCuenta(req, res) {
    const { codigo_verificacion } = req.body
    try {
      const response = await registroModel.verificacionCuentas({ codigo_verificacion })
      if (response instanceof Error) {
        res.status(400).json({ error: response.message })
      } else {
        res.status(200).json({ message: 'Cuenta verificada exitosamente' })
      }
    } catch (error) {
      console.error('Error al verificar:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async genero(req, res) {
    try {
      const query = ' SELECT * FROM genero'
      const [generos] = await connection.query(query)
      res.json(generos)
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getDocumento(req, res) {
    try {
      const documento = 'SELECT * FROM tipo_documento'
      const [doc] = await connection.query(documento)
      res.json(doc)
    } catch (error) {
      console.error('Error al obtener los generos:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async actualizarCliente(req, res) {
    const { id } = req.params
    const { contraseña, correo_usuario, ...data } = req.body
    try {
      const response = await registroModel.actualizarClientes({ contraseña, correo_usuario, id, ...data })
      if (response instanceof Error) {
        res.status(400).json({ error: response.message })
      } else {
        res.status(200).json({ message: 'Cliente actualizado exitosamente' })
      }
    } catch (error) {
      console.error('Error al actualizar:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getExamen(req, res) {
    const { id } = req.params
    const response = await registroModel.getExamenes({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran los examenes' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getCertificado(req, res) {
    const { id } = req.params
    const response = await registroModel.getCertificados({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran los certificados' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  // se hizo todo el metodo de registro

  static async deleteUser(req, res) {
    const { correo_u } = req.body
    const response = await registroModel.eliminarCuenta({ correo_u })
    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'El usuario ya ha sido eliminado' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Usuario no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json({ message: 'Eliminado satisfactiriamente' })
    }
  }

  static async updatePassword (req, res) {
    const { correo } = req.params
    const { contraseña } = req.body

    const response = await registroModel.updatePassword({ id: correo, input: contraseña })
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Contraseña actualizada correctamente' })
    }
  }
}
