import { VacunasModel } from '../models/vacunas_carnet_model.js'
import { NoDataFound, DuplicateInfo, AccountAlreadyDisable, NotFoundUser } from '../squemas/errors_squemas.js'
import { manejoErrorVacunaCrear } from '../squemas/carnet_validacion.js'
export class CarnetController {
  static async getMascotasVacuna (req, res) {
    const response = await VacunasModel.getMascotasVacuna()
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentran vacunas registradas' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })
    res.json(response)
  }

  static async getAll (req, res) {
    const { idMascota } = req.params
    const response = await VacunasModel.getVacunas({ idMascota })
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentran vacunas registradas' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })
    res.json(response)
  }

  static async getDatosImpresion (req, res) {
    const { id } = req.params
    const response = await VacunasModel.getDatosDeImpresion({ id })
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentran vacunas registradas' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error en el servidor' })
    res.json(response)
  }

  static async busquedaVacunaId (req, res) {
    const { id } = req.params
    const response = await VacunasModel.vacunaAplicadaId({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran vacunas para este tipo de mascota' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json(response)
    }
  }

  static async busquedaTipoVacuna (req, res) {
    const { idMascota } = req.params
    const response = await VacunasModel.getTipoVacuna({ idMascota })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran vacunas para este tipo de mascota' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json(response)
    }
  }

  static async createVacuna (req, res) {
    const result = manejoErrorVacunaCrear(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await VacunasModel.createVacunas({ input: result.data })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe una vacuna registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error del servidor' })
    } else {
      res.json({ message: 'Vacuna registrada correctamente' })
    }
  }

  static async updateVacuna (req, res) {
    const { id } = req.params
    const data = req.body

    const response = await VacunasModel.updateVacuna({ id, input: data })
    if (response instanceof Error) { res.status(500).json({ message: 'Error interno del servidor' }) } else {
      res.json({ message: 'Fecha actualizada con exito' })
    }
  }

  static async deleteVacuna (req, res) {
    const anotacion = req.body
    const { id } = req.params

    const response = await VacunasModel.deleteVacuna({ id, input: anotacion })

    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'La vacuna ya ha sido eliminado con aterioridad' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Vacuna no registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Eliminado satisfactiriamente' })
    }
  }
}
