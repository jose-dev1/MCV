import { enviarCorreoModelos } from '../models/contactanos_client_models.js'

export class EnviodeCorreosController {
  static async envioCorreo (req, res) {
    const result = req.body
    const response = await enviarCorreoModelos.sendEmail({ input: result })
    if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Correo enviado correctamente ' })
    }
  }
}
