import * as z from 'zod' // Se cambia 'z' a '* as z' para importar todo el módulo

const vacunaSchema = z.object({
  idTipoVacuna: z.number().refine(value => value !== 0, {
    message: 'Seleccione una vacuna aplicada'
  }),
  fechaVacunaAplicada: z.string().min(1, { message: 'El campo Fecha de aplicacion no puede estar vacío' }).regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de vacunación debe estar en formato YYYY-MM-DD' }),
  fechaVencimiento: z.string().min(1, { message: 'El campo Fecha de vencimiento no puede estar vacío' }).regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de vencimiento debe estar en formato YYYY-MM-DD' }),
  laboratorio: z.string().min(1, { message: 'El campo Laboratorio no puede estar vacío' }),
  loteVacuna: z.string().min(1, { message: 'El campo Lote de la vacuna no puede estar vacío' }),
  idMascota: z.string({ message: 'El campo ID de mascota no puede estar vacío' })
})

export function manejoErrorVacunaCrear (input) { // Se cambia 'manejoErroVacunaCrear' a 'manejoErrorVacunaCrear'
  return vacunaSchema.safeParse(input)
}
