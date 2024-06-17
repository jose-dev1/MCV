import { NoDataFound, NotFoundUser, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'
import { GetClienteModel } from '../models/get_cliente_model.js'

export class GetClienteController {
  static async getCliente (req, res) {
    const { id } = req.params
    try {
      const response = await GetClienteModel.getCliente(id)
      if (response instanceof NoDataFound) {
        res.status(404).json({ message: 'No se encontraron datos' })
      } else if (response instanceof NotFoundUser) {
        res.status(404).json({ message: 'Usuario no encontrado' })
      } else if (response instanceof AccountAlreadyDisable) {
        res.status(403).json({ message: 'La cuenta ya está deshabilitada' })
      } else if (response instanceof Error) {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.json(response)
      }
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async updateCliente (req, res) {
    const { id } = req.params
    const data = req.body
    try {
      const response = await GetClienteModel.updateCliente(id, data)
      if (response instanceof NoDataFound) {
        res.status(404).json({ message: 'No se encontraron datos' })
      } else if (response instanceof InfoAlreadyExisting) {
        res.status(409).json({ message: 'Ya existe un usuario con este numero de documento' })
      } else if (response instanceof Error) {
        res.status(500).json({ message: 'Error interno del servidor' })
      } else {
        res.json({
          success: true,
          client: response,
          message: 'Vinculacion exitosa'
        })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
