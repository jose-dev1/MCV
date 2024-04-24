import { Router } from 'express'
import { GetClienteController } from '../controllers/get_cliente_controller.js'

export const Clientes = Router()

Clientes.get('/:id', GetClienteController.getCliente)
Clientes.patch('/actualizar/:id', GetClienteController.updateCliente)
