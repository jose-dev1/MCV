import { Router } from 'express'
import { AuxiliarInicioController } from '../controllers/Auxil_inicio_controller.js'
export const AuxilInicioRouter = Router()

AuxilInicioRouter.get('/', AuxiliarInicioController.getAuxiliarGroo)
