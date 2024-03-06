import { Router } from 'express'
import { AdminEmpleadoController } from '../controllers/admin_empleado_controller.js'

export const adminRoutes = Router()

adminRoutes.get('/', AdminEmpleadoController.getEmployee)
adminRoutes.get('/:id', AdminEmpleadoController.getEmployeeById)

adminRoutes.post('/', AdminEmpleadoController.create)
adminRoutes.patch('/desabilitar/:id', AdminEmpleadoController.disableEmployee)
adminRoutes.patch('/actualizar/:id', AdminEmpleadoController.updateEmployee)

export const userTypeRouter = Router()
userTypeRouter.get('/', AdminEmpleadoController.getUserType)
