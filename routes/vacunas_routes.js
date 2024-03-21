import { Router } from 'express'
import { CarnetController } from '../controllers/carnet_vacuna_controller.js'

export const vacunasRouter = Router()

vacunasRouter.get('/mascotas', CarnetController.getMascotasVacuna)
vacunasRouter.get('/ver/:idMascota', CarnetController.getAll)
vacunasRouter.get('/datos-pdf/:id', CarnetController.getDatosImpresion)
vacunasRouter.get('/tipovacuna/:idMascota', CarnetController.busquedaTipoVacuna)
vacunasRouter.get('/busqueda/:id', CarnetController.busquedaVacunaId)
vacunasRouter.post('/create', CarnetController.createVacuna)
vacunasRouter.patch('/update/:id', CarnetController.updateVacuna)
vacunasRouter.patch('/delete/:id', CarnetController.deleteVacuna)
