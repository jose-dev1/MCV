import { HomeVetModel } from '../models/home_vet_model.js'

export class HomeVetController {
  static async getData (req, res) {
    const response = await HomeVetModel.getData()
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }
}
