import { AdminEmpleadoModel } from '../models/admin_empleado_model.js'
import { AccountAlreadyDisable, DuplicateInfo, NoDataFound, NotFoundUser } from '../squemas/errors_squemas.js'

export class AdminEmpleadoController {
  static async getEmployee (req, res) {
    const response = await AdminEmpleadoModel.getEmployee()
    if (response instanceof NoDataFound) {
      res.status(404).json({ menssage: 'Usuario no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async getEmployeeById (req, res) {
    const { id } = req.params
    const response = await AdminEmpleadoModel.getEmployeeById({ id })
    if (response instanceof NotFoundUser) {
      res.status(404).json({ menssage: 'Usuario no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async create (req, res) {
    const input = req.body
    const response = await AdminEmpleadoModel.createEmployee(input)
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'el usuario o empleado ya esta registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async disableEmployee (req, res) {
    const anotacion = req.body
    const { id } = req.params

    const response = await AdminEmpleadoModel.deleteEmployee({ id, input: anotacion })

    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'El usuario ya ha sido eliminado' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ menssage: 'Usuario no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Eliminado satisfactiriamente' })
    }
  }

  static async updateEmployee (req, res) {
    const { id } = req.params
    const data = req.body
    const response = await AdminEmpleadoModel.updateEmployee({ id, input: data })
    if (response instanceof NotFoundUser) {
      res.status(404).json({ menssage: 'Usuario no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }
}
