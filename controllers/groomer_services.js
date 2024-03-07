import { GroomerServicesModel } from '../models/groomer_services.js'
import { NoDataFound, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, NotFoundUser } from '../squemas/errors_squemas.js'

export class GroomerServicesController {
  static async getAllServices (req, res) {
    const response = await GroomerServicesModel.getAllServices()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No hay servicios existentes' })
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
      res.status(404).json({ message: 'No hay servicios existentes' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async create (req, res) {
    const result = req.body
    const response = await GroomerServicesModel.createService({ input: result })

    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe una cita registrada en el espacio seleccionado' })
    } else if (response instanceof InfoAlreadyExisting) {
      res.status(400).json({ message: 'Ya existe una cita agendada para le paciente' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Servicio registrado correctamente' })
    }
  }

  static async updateServis (req, res) {
    const { id } = req.params
    const data = req.body
    console.log(data)
    const response = await GroomerServicesModel.updateServis({ id, input: data })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe un servico registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error insterno del sevidor' })
    } else {
      res.status(201).json({ message: 'Actualizado con exito' })
    }
  }

  static async descativarServi (req, res) {
    const anotacion = req.body
    const { id } = req.params

    const response = await GroomerServicesModel.descativarServi({ id, input: anotacion })
    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'el servicio ya ha sido eliminado con aterioridad' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Servicio no registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Eliminado satisfactiriamente' })
    }
  }
}
