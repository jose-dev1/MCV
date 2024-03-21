import { Router } from 'express'
import CertificateController from '../controllers/certificate_controller.js'

export const certificateRouter = Router()

certificateRouter.get('/', CertificateController.getCertificates)
certificateRouter.get('/oneById/:id', CertificateController.getCertificateById)
certificateRouter.get('/infoForCertificate/:id', CertificateController.getInfoForCertificateByPetId)
certificateRouter.post('/:id', CertificateController.createCertificate)
certificateRouter.patch('/update/:id', CertificateController.updateCertificate)
certificateRouter.patch('/delete/:id', CertificateController.deleteCertificate)
