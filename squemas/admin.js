import { z } from 'zod'

const adminCreateSchema = z.object({

  correoUsuario: z.string().min(1, { message: 'El correo del usuario no puede estar vacío.' }),
  passwordUsuario: z.string().min(1, { message: 'La contraseña del usuario no puede estar vacía.' }),
  estadoUsuario: z.boolean().optional(),
  estadoVerificacionUsuario: z.boolean().optional(),
  idGenero: z.string().min(1, { message: 'El ID del género no puede estar vacío.' }),
  idTipoUsuario: z.number().int().min(1).max(5, { message: 'El ID del tipo de usuario debe estar entre 1 y 5.' }),
  numeroDocumentoEmpleado: z.string().min(1, { message: 'El número de documento del empleado no puede estar vacío.' }),
  idTipoDocumento: z.number().int().min(1, { message: 'El ID del tipo de documento debe ser un número entero positivo.' }),
  primerNombreEmpleado: z.string().min(1, { message: 'El primer nombre del empleado no puede estar vacío.' }),
  segundoNombreEmpleado: z.string().min(1, { message: 'El segundo nombre del empleado no puede estar vacío.' }),
  primerApellidoEmpleado: z.string().min(1, { message: 'El primer apellido del empleado no puede estar vacío.' }),
  segundoApellidoEmpleado: z.string().min(1, { message: 'El segundo apellido del empleado no puede estar vacío.' })
}).strict()

export function validateEmployeeDataCreate (input) {
  return adminCreateSchema.safeParse(input)
}
