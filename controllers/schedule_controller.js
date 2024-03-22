import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable, OccupiedSpace } from '../squemas/errors_squemas.js'
import { ScheduleModel } from '../models/schedule_model.js'
import { validateScheduleCreate, validateScheduleUPdate } from '../squemas/schedule.js'
import { validateHospitalizationDelete } from '../squemas/hospitalizations.js'
import { validateDocument } from '../squemas/document.js'
export class ScheduleController {
  static async getEspecialista (req, res) {
    const { especialista } = req.params
    const response = await ScheduleModel.getEspecialista({ especialista })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran citas para el especialista seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getId (req, res) {
    const { id } = req.params
    const response = await ScheduleModel.getId({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran citas con el id seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getFecha (req, res) {
    const { fechaCita, idEmpleado } = req.params
    const response = await ScheduleModel.getFecha({ fechaCita, idEmpleado })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran citas con la fecha seleccionada para el empleado cargado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getFechaEmpleado (req, res) {
    const { fechaCita, idEmpleado } = req.params
    const response = await ScheduleModel.getFechaEmpleado({ fechaCita, idEmpleado })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran citas con la fecha seleccionada para el empleado cargado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  // inicio metodos de otros controladores
  static async getMascotas (req, res) {
    const result = validateDocument(req.params)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await ScheduleModel.getMascotas({ tipoDocumento: result.data.tipoDocumento, numeroDocumento: result.data.numeroDocumento })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran mascotas para el cliente seleccionado' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'No se encuentra al cliente seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getServicios (req, res) {
    const { especialista } = req.params
    const response = await ScheduleModel.getServicios({ especialista })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra al cliente seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getEspecialistas (req, res) {
    const { idTipoUsuario } = req.params
    const response = await ScheduleModel.getEspecialistas({ idTipoUsuario })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra especialistas para la solicitud' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servido' })
    } else {
      res.json(response)
    }
  }

  static async getDocumentos (req, res) {
    const response = await ScheduleModel.getDocumentos()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran documentos' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  // fin metodos de otros controladores

  static async create (req, res) {
    const result = validateScheduleCreate(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await ScheduleModel.create({ input: result.data })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe una cita registrada en el espacio seleccionado' })
    } else if (response instanceof InfoAlreadyExisting) {
      res.status(400).json({ message: 'Ya existe una cita registrada para la mascota con este tipo de especialista' })
    } else if (response instanceof OccupiedSpace) {
      res.status(400).json({ message: 'La mascota ya tiene una cita registrada en el espacio seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Cita registrada correctamente' })
    }
  }

  static async updateCita (req, res) {
    const { id } = req.params
    const result = validateScheduleUPdate(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await ScheduleModel.updateCita({ id, input: result.data })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'Ya existe una cita registrada en el espacio seleccionado' })
    } else if (response instanceof InfoAlreadyExisting) {
      res.status(400).json({ message: 'Ya existe una cita registrada para la mascota en el espacio seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Cita actualizada correctamente' })
    }
  }

  static async desactivarCita (req, res) {
    const { id } = req.params
    const result = validateHospitalizationDelete(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await ScheduleModel.desactivarCita({ id, input: result.data })

    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'La cita ya ha sido eliminado con aterioridad' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Cita no registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Eliminado satisfactiriamente' })
    }
  }
}
