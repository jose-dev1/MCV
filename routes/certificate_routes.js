import { Router } from 'express'
import CertificateController from '../controllers/certificate_controller.js'

export const certificateRouter = Router()

certificateRouter.get('/:id', CertificateController.getCertificateByPetId)
