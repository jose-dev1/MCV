import ExamenesVeteriarioModel from '../models/examenes_veterinarios_models.js'
import { AccountAlreadyDisable, DuplicateInfo, NoDataFound } from '../squemas/errors_squemas.js'

export default class ExamenesVeterinariosController {
  static async getAllExams (req, res) {
    const response = await ExamenesVeteriarioModel.getAllExams()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No hay examenes para mostrar' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async getExmanById (req, res) {
    const { id } = req.params
    const response = await ExamenesVeteriarioModel.getExamById({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No hay examenes disponibles' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async createExam (req, res) {
    const data = req.body
    const response = await ExamenesVeteriarioModel.createExam(data)
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe un examen registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.status(201).json({ message: 'Examen creado con exito' })
    }
  }

  static async updateExam (req, res) {
    const { id } = req.params
    const data = req.body

    const response = await ExamenesVeteriarioModel.updateExam({ id, input: data })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra el registro a editar' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.status(201).json({ message: 'Examen actualizado correctamente' })
    }
  }

  static async deleteExam (req, res) {
    const { id } = req.params
    const data = req.body
    const response = await ExamenesVeteriarioModel.deleteExam({ id, input: data })
    if (response instanceof AccountAlreadyDisable) {
      res.status(400).json({ message: 'El examen ya ha sido desactivado con anterioridad' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.status(201).json({ message: 'Examen desactivado satisfactoriamente' })
    }
  }

  static async getExamTypes (req, res) {
    const response = await ExamenesVeteriarioModel.getExamTypes()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra el registro a editar' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.json(response)
    }
  }
};