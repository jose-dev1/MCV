import { Router } from 'express'
import { LoginController } from '../controllers/login_controller.js'

// Creacion de variable router

export const loginRoutes = Router()

// Creacion endpoints

loginRoutes.post('/', LoginController.login)
