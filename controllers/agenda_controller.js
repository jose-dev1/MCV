import { AgendaModel } from '../models/agenda_model.js'

export class AgendaController {
    static async getAgenda(req, res) {
        const id_usuario = req.params.id_usuario
        const response = await AgendaModel.getAgendas(id_usuario)
        if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
        res.json(response)
    }

    static async updateAgenda(req, res) {
        const { id } = req.params
        const data = req.body
        const response = await AgendaModel.deleteCita({ id, input: data })
        if (response instanceof Error) {
            res.status(500).json({ message: 'Error interno del servidor' })
        }
        res.json({ message: 'Agenda actualizada con exito' })
    }
}