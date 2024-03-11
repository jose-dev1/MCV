import { Router } from 'express'
import ExamenesVeterinariosController from '../controllers/examenes_veterinarios_controllers.js'

export const examenesVeteriarioRouter = Router()

examenesVeteriarioRouter.get('/', ExamenesVeterinariosController.getAllExams)
examenesVeteriarioRouter.get('/:id', ExamenesVeterinariosController.getExmanById)
examenesVeteriarioRouter.post('/', ExamenesVeterinariosController.createExam)
examenesVeteriarioRouter.patch('/update/:id', ExamenesVeterinariosController.updateExam)
examenesVeteriarioRouter.patch('/delete/:id', ExamenesVeterinariosController.deleteExam)
