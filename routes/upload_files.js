import { Router } from 'express'
import { UploadFilesControler } from '../controllers/upload_files_controller.js'

export const uploadRouter = Router()

uploadRouter.post('/examenes', UploadFilesControler.uploadExams)
uploadRouter.post('/avatarMascota', UploadFilesControler.uploadAvatarPet)
