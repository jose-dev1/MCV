import { Router } from 'express'
import { MascotasController } from '../controllers/mascotas_controller.js'
export const registroMascotas = Router()

registroMascotas.get('/raza', MascotasController.getAllRazas)
registroMascotas.get('/genero_mascota', MascotasController.getAllGeneros)
registroMascotas.get('/get_clientes/:documento', MascotasController.getCliente)
registroMascotas.post('/generar_1', MascotasController.registroMascota)
