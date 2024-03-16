import { Router } from 'express'
import { HomeVetController } from '../controllers/home_vet_controller.js'

export const homeVetRoutes = Router()

homeVetRoutes.get('/', HomeVetController.getData)
