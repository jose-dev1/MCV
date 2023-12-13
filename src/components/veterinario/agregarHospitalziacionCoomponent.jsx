import { Alert, Grid, Modal  } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TextField } from '@mui/material';
import InputDate from '../dash/inputDate'

const documentItems = [
  { id: 'C.C', value: 'Cedula de Ciudadania' },
  { id: 'C.E', value: 'Cedula de Extrangeria' }
]

const positinItems = [
  { id: 1, value: 'Groomer' },
  { id: 2, value: 'Asistente veterinario' }
]

export const FormAgregarHozpitalizaciones = (props) => {
  const { label, datosEditables, bgColor, icon, tooltip, }=props

  const { values, setValues, handleInputChange, handleInputChangeDate} = useForm(datosEditables)
  const [desabilitado, setDesabilitado] = useState(Object.keys(datosEditables).length === 0)
  const [validarId,setValidarId]=useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')


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

    const formErrores = {};
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'secondName' && key !== 'secondLastName'){
        if (!value || (typeof value.trim === 'function' && value.trim() === '')) {
          formErrores[key] = 'Error los campo no puede estar vacíos';
          
        }
      }
    });

    if (Object.keys(formErrores).length > 0) {
      setError('Por favor, complete los campos nesesarios.');
      return;
    }else{
      setError('')
      return
    }
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
          {error && (
          <Alert className='mb-2' severity="error">
            {error}
          </Alert>
        )}
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
                  fullWidth
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
                  id='primer_nombre'
                  label='Primer Nombre Dueño'
                  name='primer_nombre'
                  value={values.primer_nombre}
                  disabled={true} 
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                  id='primer_apellido'
                  fullWidth
                  label='Primer Apellido Dueño'
                  name='primer_apellido'
                  value={values.primer_apellido}
                  disabled={true}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {validarId ? (
                  <Input
                    id='nombre'
                    fullWidth
                    label='Nombre Mascota'
                    name='nombre'
                    value={values.nombre}
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
                ) : (
                  <Selects
                    id='nombre'
                    label='Nombre Mascota'
                    name='nombre'
                    value={values.nombre}
                    onChange={handleInputChange}
                    items={documentItems}
                    required
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputDate
                  id='fecha_creacion'
                  fullWidth
                  label='Fecha ingreso'
                  name='fecha_creacion'
                  fecha={values.fecha_creacion}
                  onChange={handleInputChangeDate}
                  disabled={validarId ? true : false}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="observaciones"
                    label="Observaciones"
                    name='observaciones'
                    multiline
                    maxRows={15}
                    value={values.observaciones}
                    onChange={handleInputChange}
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
