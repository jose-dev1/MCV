import { HomeGroModel } from '../models/home_gro_model.js'

export class HomeGroController {
  static async getData (req, res) {
    const response = await HomeGroModel.getData()
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }
}
