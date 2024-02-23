import { NoDataFound, NotFoundUser, DuplicateInfo, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'
import { ScheduleModel } from '../models/schedule_model.js'
export class ScheduleController {
  static async getEspecialista (req, res) {
    const { especialista } = req.params
    const response = await ScheduleModel.getEspecialista({ especialista })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No se encuentran citas para el especialista seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getId (req, res) {
    const { id } = req.params
    const response = await ScheduleModel.getId({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No se encuentran citas con el id seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getFecha (req, res) {
    const { fechaCita, idEmpleado } = req.params
    const response = await ScheduleModel.getFecha({ fechaCita, idEmpleado })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No se encuentran citas con la fecha seleccionada para el empleado cargado' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  // inicio metodos de otros controladores
  static async getMascotas (req, res) {
    const { tipoDocumento, numeroDocumento } = req.params
    const response = await ScheduleModel.getMascotas({ tipoDocumento, numeroDocumento })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No se encuentran mascotas para el cliente seleccionado' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ menssage: 'No se encuentra al cliente seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getServicios (req, res) {
    const { especialista } = req.params
    const response = await ScheduleModel.getServicios({ especialista })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No se encuentra al cliente seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  static async getEspecialistas (req, res) {
    const { idTipoUsuario } = req.params
    const response = await ScheduleModel.getEspecialistas({ idTipoUsuario })
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'No se encuentra especialistas para la solicitud' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.json(response)
    }
  }

  // fin metodos de otros controladores

  static async create (req, res) {
    const result = req.body
    const response = await ScheduleModel.create({ input: result })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ menssage: 'Ya existe una cita registrada en el espacio seleccionado' })
    } else if (response instanceof InfoAlreadyExisting) {
      res.status(400).json({ message: 'Ya existe una cita agendada para le paciente' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Cita registrada correctamente' })
    }
  }

  static async updateCita (req, res) {
    const result = req.body
    const { id } = req.params
    const response = await ScheduleModel.updateCita({ id, input: result })
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ menssage: 'Ya existe una cita registrada en el espacio seleccionado' })
    } else if (response instanceof Error) {
      res.status(500).json({ menssage: 'Error interno del servidor' })
    } else {
      res.status(201).json({ message: 'Cita actualizada correctamente' })
    }
  }

  static async desactivarCita (req, res) {
    const anotacion = req.body
    const { id } = req.params

    const response = await ScheduleModel.desactivarCita({ id, input: anotacion })

    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'La cita ya ha sido eliminado con aterioridad' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ menssage: 'Cita no registrada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Eliminado satisfactiriamente' })
    }
  }
}
