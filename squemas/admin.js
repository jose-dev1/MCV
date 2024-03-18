import { z } from 'zod'

const adminCreateSchema = z.object({

  primerNombreEmpleado: z.string().min(1, { message: 'El primer nombre del empleado no puede estar vacío.' }),
  primerApellidoEmpleado: z.string().min(1, { message: 'El primer apellido del empleado no puede estar vacío.' }),
  numeroDocumentoEmpleado: z.string().min(1, { message: 'El número de documento del empleado no puede estar vacío.' }),
  idTipoDocumento: z.string().min(1, { message: 'Tiene que escoger el tipo de documento para el empleado' }),
  passwordUsuario: z.string().min(1, { message: 'La contraseña del usuario no puede estar vacía.' }),
  correoUsuario: z.string().min(1, { message: 'El correo del usuario no puede estar vacío.' }),
  idGenero: z.string().min(1, { message: 'El ID del género no puede estar vacío.' }),
  idTipoUsuario: z.number().int().min(1).max(5, { message: 'Tienen que escoger el tipo de empleado crear' })
}).strict()

const adminUpdateSchema = z.object({
  primerNombreEmpleado: z.string().min(1, { message: 'El primer nombre del empleado no puede estar vacío.' }),
  primerApellidoEmpleado: z.string().min(1, { message: 'El primer apellido del empleado no puede estar vacío.' }),
  idGenero: z.string().min(1, { message: 'Tiene que escoger un genero para el empleado' }),
  numeroDocumentoEmpleado: z.string().min(1, { message: 'El número de documento del empleado no puede estar vacío.' }),
  idTipoDocumento: z.number().min(1, { message: 'Tiene que escoger el tipo de documento para el empleado' })
})

export function validateEmployeeDataCreate (input) {
  return adminCreateSchema.safeParse(input)
}

export function validateEmployeeDataUpdate (input) {
  return adminUpdateSchema.safeParse(input)
}
