import { HomePerfilModel } from '../models/home_perfil_model.js'


export class HomePerfilController {
    static async getAll(req, res) {
        const { id } = req.params
        const response = await HomePerfilModel.getHome({ id })
        if (response instanceof Error) {
            res.status(500).json({ message: 'Error en el servidor' })
        } else {
            res.json(response)
        }
    }
}