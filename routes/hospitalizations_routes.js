import { Router } from 'express'
import { HospitalizationsController } from '../controllers/hospitalizations_controller.js'

export const hospitalizacionRouter = Router()

hospitalizacionRouter.get('/', HospitalizationsController.getAll)
hospitalizacionRouter.get('/:id', HospitalizationsController.getId)
hospitalizacionRouter.get('/pet/:id', HospitalizationsController.getHospitalizationsByPetId)
hospitalizacionRouter.post('/', HospitalizationsController.create)
hospitalizacionRouter.patch('/:id', HospitalizationsController.update)
hospitalizacionRouter.patch('/delete/:id', HospitalizationsController.delete)
