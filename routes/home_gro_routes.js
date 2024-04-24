import { Router } from 'express'
import { HomeGroController } from '../controllers/home_gro_controller.js'

export const homeGroRoutes = Router()

homeGroRoutes.get('/:idUsuario', HomeGroController.getData)
