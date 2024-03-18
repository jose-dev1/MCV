import { AdminEmpleadoModel } from '../models/admin_empleado_model.js'
import { validateEmployeeDataCreate, validateEmployeeDataUpdate } from '../squemas/admin.js'
import { AccountAlreadyDisable, DuplicateInfo, InfoAlreadyExisting, NoDataFound, NotFoundUser } from '../squemas/errors_squemas.js'
import { validateHospitalizationDelete } from '../squemas/hospitalizations.js'

export class AdminEmpleadoController {
  static async getEmployee (req, res) {
    const response = await AdminEmpleadoModel.getEmployee()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'Usuario no registrado' })
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
      res.status(404).json({ message: 'Usuario no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async create (req, res) {
    const result = validateEmployeeDataCreate(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await AdminEmpleadoModel.createEmployee(result.data)
    if (response instanceof DuplicateInfo) {
      res.status(400).json({ message: 'el usuario o empleado ya esta registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Empleado creado exitosamente' })
    }
  }

  static async disableEmployee (req, res) {
    const { id } = req.params
    const result = validateHospitalizationDelete(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }

    const response = await AdminEmpleadoModel.deleteEmployee({ id, input: result.data })
    if (response instanceof AccountAlreadyDisable) {
      res.status(409).json({ message: 'El Empleado ya ha sido eliminado' })
    } else if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'Empleado no registrado' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor' })
    } else {
      res.json({ message: 'Empleado desactivado satisfactoriamente' })
    }
  }

  static async updateEmployee (req, res) {
    const { id } = req.params
    const result = validateEmployeeDataUpdate(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await AdminEmpleadoModel.updateEmployee({ id, input: result.data })
    if (response instanceof DuplicateInfo) {
      res.status(409).json({ message: 'El correo ya existe dentro del sistema' })
    } else if (response instanceof InfoAlreadyExisting) {
      res.status(404).json({ message: 'El numero de documento con el tipo de documento ya existe dentro del sistema' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json({ message: 'Actualizado con exito' })
    }
  }

  static async getUserType (req, res) {
    const response = await AdminEmpleadoModel.getUserType()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No hay Tipos de Usuarios existentes' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }

  static async getGenreTypes (req, res) {
    const response = await AdminEmpleadoModel.getGenreTypes()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No hay generos existentes' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno del servidor ' })
    } else {
      res.json(response)
    }
  }
}
