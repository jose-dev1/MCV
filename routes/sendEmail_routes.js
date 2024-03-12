import { Router } from 'express'
import { EnviodeCorreosController } from '../controllers/envioDeCorreo_controller.js'

export const envioEmailRouter = Router()

envioEmailRouter.post('/contactanos', EnviodeCorreosController.envioCorreo)
