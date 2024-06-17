import { NoDataFound } from '../squemas/errors_squemas.js'
import { MascotasModel } from '../models/mascotas_model.js'

export class GestionMascotaController {
  static async getMascotasbyId (req, res) {
    const { id } = req.params
    const response = await MascotasModel.getMascotaId({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran mascotas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async deleteMascotasbyId (req, res) {
    const { id } = req.params
    const { anotacion } = req.body
    const response = await MascotasModel.deleteMascota({ id, input: anotacion })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran mascotas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async updateMascotasbyId (req, res) {
    const { id } = req.params
    const result = req.body
    const response = await MascotasModel.updateMascota({ id, input: result })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran mascotas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }
}
