import * as z from 'zod' // Se cambia 'z' a '* as z' para importar todo el módulo

const vacunaSchema = z.object({
  fechaVacunaAplicada: z.string().min(1, { message: 'Campos vacíos' }).regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de vacunación debe estar en formato YYYY-MM-DD' }),
  fechaVencimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'La fecha de vencimiento debe estar en formato YYYY-MM-DD' }),
  laboratorio: z.string().min(1, { message: 'Campos vacíos' }),
  loteVacuna: z.string({ message: 'El campo lote de vacuna no puede estar vacío' }),
  idMascota: z.string({ message: 'El campo ID de mascota no puede estar vacío' }),
  idTipoVacuna: z.string({ message: 'El campo ID de tipo de vacuna no puede estar vacío' })
})

export function manejoErrorVacunaCrear (input) { // Se cambia 'manejoErroVacunaCrear' a 'manejoErrorVacunaCrear'
  return vacunaSchema.safeParse(input)
}
