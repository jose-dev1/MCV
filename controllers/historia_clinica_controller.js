import { HistoriaClinicaModel } from '../models/historia_clinica_model.js'
import { NoDataFound, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'

export class HistoriaClinicaController {
  static async getAllHistoria (req, res) {
    const { id } = req.params
    const response = await HistoriaClinicaModel.getAllHistoria({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran historial de mascotas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getHistorias (req, res) {
    const response = await HistoriaClinicaModel.getHistoria()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran historial de mascotas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async createHistoria (req, res) {
    const result = (req.body)
    const response = await HistoriaClinicaModel.createHistoria({ input: result })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe una cita registrada en el espacio seleccionado' })
    } else if (response instanceof InfoAlreadyExisting) {
      res.status(400).json({ message: 'Ya existe una cita agendada para le paciente' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Servicio registrado correctamente' })
    }
  }

  static async updateHistoria (req, res) {
    const { id } = req.params
    const result = (req.body)
    const response = await HistoriaClinicaModel.updateHistoria({ id, input: result })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'No se puede actualizar la historia clinica' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Cita actualizada correctamente' })
    }
  }

  static async deleteHistoria (req, res) {
    const { id } = req.params
    const anotacion = (req.body)
    const response = await HistoriaClinicaModel.deleteHistoria({ id, input: anotacion })
    if (response instanceof AccountAlreadyDisable) {
      res.status(400).json({ message: 'la historia clinica ya fue eliminada con anterioridad' })
    } else if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra el registro a editar' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.status(201).json({ message: 'Historia clinica eliminada correctamente' })
    }
  }
}
