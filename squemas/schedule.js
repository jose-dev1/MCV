import z from 'zod'

const scheduleSchemaCreate = z.object({
  fechaCita: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  horaCita: z.string(),
  estadoCita: z.number().int().min(0).max(1),
  idEmpleado: z.string().uuid(),
  idServicio: z.number().int(),
  idMascota: z.string().uuid(),
  especialista: z.string().refine(value => value === 'VET' || value === 'GRO', {
    message: 'El especialista solo puede ser "VET" o "GRO".'
  })
})

const scheduleSchemaCreateUpdate = z.object({
  fechaCita: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  horaCita: z.string(),
  idEmpleado: z.string().uuid(),
  idMascota: z.string().uuid()
})

export function validateScheduleCreate (input) {
  return scheduleSchemaCreate.safeParse(input)
}

export function validateScheduleUPdate (input) {
  return scheduleSchemaCreateUpdate.safeParse(input)
}
