import { Router } from 'express'
import { GroomerServicesController } from '../controllers/groomer_services.js'

export const groomerRoutes = Router()

groomerRoutes.get('/', GroomerServicesController.getAllServices)
groomerRoutes.get('/:id', GroomerServicesController.getServiceById)
groomerRoutes.post('/create', GroomerServicesController.create)
groomerRoutes.patch('/servis/update/:id', GroomerServicesController.updateServis)
groomerRoutes.patch('/delete/:id', GroomerServicesController.descativarServi)
