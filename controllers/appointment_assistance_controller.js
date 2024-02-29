import { AppointmentAssistanceModel } from '../models/ appointment_assistance_model.js'
import { NotFoundUser, NoDataFound, DataAlreadyChange } from '../squemas/errors_squemas.js'
export class AppointmentAssistanceController {
  static async getAll (req, res) {
    const response = await AppointmentAssistanceModel.getAll()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'Usuario no encontrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json(response)
    }
  }

  static async desactiveAppointment (req, res) {
    const { id } = req.params
    const response = await AppointmentAssistanceModel.desactiveAppointment({ id })
    if (response instanceof DataAlreadyChange) {
      res.status(409).json({ message: 'Ya ha sido confirmada la inasistencia con anterioridad' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Cita no registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Inasistencia confirmada satisfactiriamente' })
    }
  }

  static async activeAppointment (req, res) {
    const { id } = req.params
    const response = await AppointmentAssistanceModel.activeAppointment({ id })
    if (response instanceof DataAlreadyChange) {
      res.status(409).json({ message: 'Ya ha sido confirmada la asistencia con anterioridad' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Cita no registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Asistencia confirmada satisfactiriamente' })
    }
  }
}
