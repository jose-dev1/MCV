import { GroomerServicesModel } from '../models/groomer_services.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export class GroomerServicesController {
  static async getAllServices (req, res) {
    const response = await GroomerServicesModel.getAllServices()
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No hay servicios existentes' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async getServiceById (req, res) {
    const { id } = req.params
    const response = await GroomerServicesModel.getServiceById({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No hay servicios existentes' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  
}
