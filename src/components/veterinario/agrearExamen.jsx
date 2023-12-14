import { Grid, Modal, TextField  } from '@mui/material'
import useForm from '../../Hooks/useForm'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'

const documentItems = [
  { id: 1, value: 'Max' },
  { id: 2, value: 'Luna' }
]

const tiposDeExamenes = [
  { id: 1, value: 'CDV Ag Test' },
  { id: 2, value: 'FIV AB/FeLV' },
  { id: 3, value: 'Test CPV' }
];

export const AgrearExamen = (props) => {
  const { label, datosEditables, bgColor, icon, tooltip, }=props

  const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(datosEditables)
  const [desabilitado, setDesabilitado] = useState(Object.keys(datosEditables).length === 0)
  const [open, setOpen] = useState(false)
  const [validarId,setValidarId]=useState(false)


  const handleModal = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    setValues(datosEditables)
    setDesabilitado(Object.keys(datosEditables).length === 0)
  }, [datosEditables, setValues])
  useEffect(() => {
    setValidarId(datosEditables.id !== '')
  }, [datosEditables, setValidarId])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <Boton
        onClick={handleModal} 
        bgColor={bgColor} 
        icon={icon}
        tooltip={tooltip}
        desable={desabilitado}
      />
      <Modal
        open={open}
        onClose={handleClose}
      >
          <form onSubmit={handleSubmit} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] border border-solid border-black rounded-lg shadow p-4 bg-white' autoComplete='off' id='form' noValidate>
            <h1 className='text-3xl text-center mb-2'>{label}</h1>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} sm={6}>
              <Selects
                  id='tipo_documento'
                  label='Tipo de Documento'
                  name='tipo_documento'
                  value={values.tipo_documento}
                  onChange={handleInputChange}
                  items={documentItems}
                  disabled={validarId ? true : false}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Input
                  id='N_documento'
                  label='N°documento'
                  name='N_documento'
                  value={values.N_documento}
                  onChange={handleInputChange}
                  disabled={validarId ? true : false}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Boton
                    bgColor='success' 
                    icon={<MagnifyingGlassIcon/>}
                    tooltip='Buscar'
                    desable={validarId ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                  id='nombreDueño'
                  label='Primer Nombre Dueño'
                  name='nombreDueño'
                  value={values.nombreDueño}
                  disabled={true} 
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                  id='apellidoDueño'
                  label='Primer Apellido Dueño'
                  name='apellidoDueño'
                  value={values.apellidoDueño}
                  disabled={true}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {validarId ? (
                  <Input
                    id='nombreMascota'
                    label='Nombre Mascota'
                    name='nombreMascota'
                    value={values.nombreMascota}
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
                ) : (
                  <Selects
                    id='nombreMascota'
                    label='Nombre Mascota'
                    name='nombreMascota'
                    value={values.nombreMascota}
                    onChange={handleInputChange}
                    items={documentItems}
                    required
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputDate
                  id='fecha_creacion'
                  label='Fecha ingreso'
                  name='fecha_creacion'
                  fecha={values.fecha_creacion}
                  onChange={handleInputChangeDate}
                  disabled={validarId ? true : false}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              {validarId ? (
                  <Input
                    id='tipoExamen'
                    label='Tipo Examen'
                    name='tipoExamen'
                    value={values.tipoExamen}
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
                ) : (
                  <Selects
                    id='tipoExamen'
                    label='Tipo Examen'
                    name='tipoExamen'
                    value={values.tipoExamen}
                    onChange={handleInputChange}
                    items={tiposDeExamenes}
                    required
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                    id='especie'
                    label='Especie'
                    name='especie'
                    value='especie'
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                    id='edad'
                    label='Edad'
                    name='edad'
                    value='edad'
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                    id='raza'
                    label='Raza'
                    name='raza'
                    value='raza'
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                    id='color'
                    label='Color'
                    name='color'
                    value='color'
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                    id='sexo'
                    label='Sexo'
                    name='sexo'
                    value='sexo'
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  id="observaciones"
                  label="Observaciones"
                  name='observaciones'
                  multiline
                  maxRows={7}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <button
                  type='submit'
                  className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-100 active:transform active:translate-y-1'
                >
                  Registrar
                </button>
              </Grid>
            </Grid>
          </form>
      </Modal>
    </div>
  )
}
