import z from 'zod'

const hospitalizationCreateSchema = z.object({
  idMascota: z.string({
    invalid_type_error: 'El ID de la mascota debe ser una cadena de texto',
    required_error: 'El ID de la mascota es requerido.'
  }).uuid({
    message: 'El ID de la mascota debe tener la estructura de un UUID'
  }),
  contenidoHospitalizacion: z.string({
    invalid_type_error: 'El contenido de la hospitalización debe ser una cadena de texto',
    required_error: 'El contenido de la hospitalización es requerido.'
  })
})

const hospitalizationUpdateSchema = z.object({
  fechaSalida: z.union([z.string().nullable(), z.null()]).refine(value => {
    if (value === null) return true
    if (typeof value === 'string') {
      return /^\d{4}-\d{2}-\d{2}$/.test(value)
    }
    return value instanceof Date
  }, {
    message: 'La fecha de salida debe ser una cadena en formato YYYY-MM-DD o nula'
  }),
  contenidoHospitalizacion: z.string().min(1, 'El contenido de la hospitalización no puede estar vacío'),
  servicioFinializadoHospitalizacion: z.union([z.boolean(), z.number().refine(value => value === 1 || value === 0, {
    message: 'El servicio finalizado de hospitalización solo puede ser 1 o 0'
  })]).refine(value => value === false || value === true || value === 0 || value === 1, {
    message: 'El servicio finalizado de hospitalización solo puede ser true, false, 1 o 0'
  })
})

const hospitalizationDeleteSchema = z.object({
  anotacion: z.string().min(1, 'El campo de anotación no puede estar vacío')
})

export function validatehospitalizationCreate (input) {
  return hospitalizationCreateSchema.safeParse(input)
}

export function validateHospitalizationUpdate (input) {
  return hospitalizationUpdateSchema.safeParse(input)
}

export function validateHospitalizationDelete (input) {
  return hospitalizationDeleteSchema.safeParse(input)
}
