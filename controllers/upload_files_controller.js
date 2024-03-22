import { UploadFilesModel } from '../models/upload_files_model.js'
export class UploadFilesControler {
  static async uploadExams (req, res) {
    const { files } = req
    console.log(files)
    const response = await UploadFilesModel.uploadExams(files)
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json({ link: response })
    }
  }
}
