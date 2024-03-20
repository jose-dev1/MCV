import CertificateModel from '../models/certificate_model.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export default class CertificateController {
  static async getCertificateByPetId (req, res) {
    const { id } = req.params
    const response = await CertificateModel.getCertificateByPetId({ id })
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentra ningun certificado' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })

    res.json(response)
  }
};
