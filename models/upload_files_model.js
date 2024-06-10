import { storage } from './connection_firebase.js'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage' // Importar las funciones necesarias de Firebase Storage

export class UploadFilesModel {
  static async uploadExams (files, dir) {
    try {
      const { archivo } = files
      const storageRef = ref(storage, `${dir}/${Date.now()}${archivo.name}`)
      await uploadBytes(storageRef, archivo.data)
      const downloadURL = await getDownloadURL(storageRef)
      return downloadURL
    } catch (error) {
      console.log(error)
      return (error)
    }
  }
}
