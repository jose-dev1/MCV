import { z } from 'zod'

const examCreateSchema = z.object({
  idMascota: z.string().min(1).refine(value => value.trim() !== '', {
    message: 'Tiene que escoger alguna mascota.'
  }),
  idTipoExamen: z.number().min(1, {
    message: 'Tiene que escoger algun tipo de examen.'
  })
})

const examUpdateSchema = z.object({
  fechaRegistroResultadosExamen: z.union([z.string().nullable(), z.null()]).refine(value => {
    if (value === null) return true
    if (typeof value === 'string') {
      return /^\d{4}-\d{2}-\d{2}$/.test(value)
    }
    return value instanceof Date
  }, {
    invalid_type_error: 'falla fecha',
    message: 'La fecha del resultado del examen debe ser una cadena en formato YYYY-MM-DD o nula'
  }),

  resultadoExamen: z.string({ invalid_type_error: 'falla resultado examen' }).min(1, { message: 'El resultado del examen no puede estar vacío.' }),

  linkArchivoExamen: z.string({
    invalid_type_error: 'falla link'
  }).min(1, { message: 'El enlace al archivo del examen no puede estar vacío.' }),

  registroCompletoExamen: z.number({
    invalid_type_error: 'falla registro complesto',
    message: 'El registro completo del examen no puede estar vacío.'
  })
})

export function validateExamenCreate (input) {
  return examCreateSchema.safeParse(input)
}

export function validateExamUpdate (input) {
  return examUpdateSchema.safeParse(input)
}
