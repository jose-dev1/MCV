import { Router } from 'express'
import { AppointmentAssistanceController } from '../controllers/appointment_assistance_controller.js'

export const appointmentAssistanceRouter = Router()

appointmentAssistanceRouter.get('/', AppointmentAssistanceController.getAll)
appointmentAssistanceRouter.patch('/desactivar/:id', AppointmentAssistanceController.desactiveAppointment)
appointmentAssistanceRouter.patch('/activar/:id', AppointmentAssistanceController.activeAppointment)
