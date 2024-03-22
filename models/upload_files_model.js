import { storage } from './connection_firebase.js'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage' // Importar las funciones necesarias de Firebase Storage

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class UploadFilesModel {
  static async uploadExams (files) {
    try {
      const { pdf } = files
      const uploadPath = path.join(__dirname, '../temp', pdf.name)
      await pdf.mv(uploadPath)
      const storageRef = ref(storage, `pdf_examenes/${Date.now()}${pdf.name}`)
      await uploadBytes(storageRef, fs.readFileSync(uploadPath))
      const downloadURL = await getDownloadURL(storageRef)
      fs.unlinkSync(uploadPath)

      return downloadURL
    } catch (error) {
      console.log(error)
      return (error)
    }
  }
}
