import { Router } from 'express'
import { FacturasController } from '../controllers/facturas_controller.js'

export const facturasRouter = Router()

facturasRouter.get('/servicios', FacturasController.getServicios)
facturasRouter.post('/registrar_factura', FacturasController.registrarFactura)
facturasRouter.get('/', FacturasController.getFactura)
facturasRouter.get('/:id', FacturasController.getFacturaById)
