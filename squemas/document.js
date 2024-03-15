import z from 'zod'
const documentSchema = z.object({
  tipoDocumento: z.string(),
  numeroDocumento: z.string().refine(value => /^[a-zA-Z0-9]+$/.test(value), {
    message: 'El número de documento no puede contener caracteres especiales.'
  })
})

export function validateDocument (input) {
  return documentSchema.safeParse(input)
}
