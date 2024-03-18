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
  fechaRegistroResultadosExamen: z.date().refine(value => !isNaN(value.getTime()), {
    message: 'La fecha de registro de resultados del examen no es válida.'
  }),
  resultadoExamen: z.string().min(1, { message: 'El resultado del examen no puede estar vacío.' }),
  linkArchivoExamen: z.string().min(1, { message: 'El enlace al archivo del examen no puede estar vacío.' }),
  registroCompletoExamen: z.string().min(1, { message: 'El registro completo del examen no puede estar vacío.' })
})

export function validateExamenCreate (input) {
  return examCreateSchema.safeParse(input)
}

export function validateExamUpdate (input) {
  return examUpdateSchema.safeParse(input)
}
