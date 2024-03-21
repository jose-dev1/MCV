import CertificateModel from '../models/certificate_model.js'
import { NoDataFound } from '../squemas/errors_squemas.js'

export default class CertificateController {
  static async getCertificates (req, res) {
    const response = await CertificateModel.getCertificates()
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentra ningun certificado' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })

    res.json(response)
  }

  static async getInfoForCertificateByPetId (req, res) {
    const { id } = req.params
    const response = await CertificateModel.getInfoForCertificateByPetId({ id })
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentra informacion  sufucuiente para generar el certificado' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })

    res.json(response)
  }

  static async getCertificateById (req, res) {
    const { id } = req.params
    const response = await CertificateModel.getCertificatesById({ id })
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentra ningun certificado' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })

    res.json(response)
  }

  static async createCertificate (req, res) {
    const { id } = req.params
    const data = req.body
    const response = await CertificateModel.createCertificate({ id, input: data })
    if (response instanceof Error) return res.status(500).json({ message: 'Error interno del servidor ' })

    res.json({ message: 'Certificado creado exitosamente' })
  }

  static async deleteCertificate (req, res) {
    const { id } = req.params
    const data = req.body
    const response = await CertificateModel.deleteCetificate({ id, input: data })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })

    res.status(201).json({ message: 'Certificado eliminado satisfactoriamente' })
  }

  static async updateCertificate (req, res) {
    const { id } = req.params
    const data = req.body
    const response = await CertificateModel.updateCertificate({ id, input: data })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })

    res.status(201).json({ message: 'Certificado actualizado satisfactoriamente' })
  }
};
