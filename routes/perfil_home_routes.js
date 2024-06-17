import { Router } from 'express'
import { HomePerfilController } from '../controllers/home_perfil_controller.js'
export const HomePerfilRoutes = Router()

HomePerfilRoutes.get('/:id', HomePerfilController.getAll)
