import { AgendaModel } from '../models/agenda_model.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export class AgendaController {
  static async getAgenda (req, res) {
    const { fechaCita, idEmpleado } = req.params
    const response = await AgendaModel.getAgendas({ fechaCita, idEmpleado })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran citas con la fecha seleccionada para el empleado cargado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async updateAgenda (req, res) {
    const { id } = req.params
    const data = req.body
    const response = await AgendaModel.deleteCita({ id, input: data })
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    }
    res.json({ message: 'Agenda actualizada con exito' })
  }
}
