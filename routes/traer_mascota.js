import { Router } from 'express'
import { MascotasController } from '../controllers/mascotas_controller.js'
import { HistoriaClinicaController } from '../controllers/historia_clinica_controller.js'
import { GestionMascotaController } from '../controllers/gestion_mascota_controller.js'
export const traerMascotas = Router()

traerMascotas.get('/', MascotasController.getAllMascotas)
traerMascotas.get('/:id', MascotasController.getAllMascotasbyId)
traerMascotas.get('/historial/:id', MascotasController.getAllHistorialMascotasbyId)
traerMascotas.get('/getServicios/:id', MascotasController.getServiciosByMascotasId)
traerMascotas.get('/serviciosGroo/:id', MascotasController.getServiciosGroobyId)

export const historiaClinica = Router()
historiaClinica.get('/get_historial', HistoriaClinicaController.getHistorias)
historiaClinica.post('/createH', HistoriaClinicaController.createHistoria)
historiaClinica.get('/:id', HistoriaClinicaController.getAllHistoria)
historiaClinica.patch('/actualizar/:id', HistoriaClinicaController.updateHistoria)
historiaClinica.patch('/delete/:id', HistoriaClinicaController.deleteHistoria)

export const gestionMascota = Router()

gestionMascota.get('/:id', GestionMascotaController.getMascotasbyId)
gestionMascota.patch('/delete/:id', GestionMascotaController.deleteMascotasbyId)
gestionMascota.patch('/actualizar/:id', GestionMascotaController.updateMascotasbyId)
