import { UploadFilesModel } from '../models/upload_files_model.js'
export class UploadFilesControler {
  static async uploadExams (req, res) {
    const { files } = req
    const response = await UploadFilesModel.uploadExams(files, 'pdf_examenes')
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json({ link: response })
    }
  }

  static async uploadAvatarPet (req, res) {
    const { files } = req
    const response = await UploadFilesModel.uploadExams(files, 'avatar_mascota')
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json({ link: response })
    }
  }
}
