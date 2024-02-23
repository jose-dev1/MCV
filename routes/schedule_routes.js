import { Router } from 'express'
import { ScheduleController } from '../controllers/schedule_controller.js'

export const scheduleRouters = Router()

scheduleRouters.get('/especialista/:especialista', ScheduleController.getEspecialista)
scheduleRouters.get('/citas/:id', ScheduleController.getId)
scheduleRouters.get('/:fechaCita/:idEmpleado', ScheduleController.getFecha)
scheduleRouters.post('/', ScheduleController.create)
scheduleRouters.patch('/:id', ScheduleController.updateCita)
scheduleRouters.patch('/desabilitar/:id', ScheduleController.desactivarCita)

// constante de prueba
export const rutamascota = Router()
export const rutaservicios = Router()
export const rutastipousuario = Router()
// endpoints de otras rutas
rutamascota.get('/:tipoDocumento/:numeroDocumento', ScheduleController.getMascotas)
rutaservicios.get('/:especialista', ScheduleController.getServicios)
rutastipousuario.get('/:idTipoUsuario', ScheduleController.getEspecialistas)
