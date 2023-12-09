import { Alert, Grid, Modal  } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from './Input'
import Selects from './Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'

const documentItems = [
  { id: 'C.C', value: 'Cedula de Ciudadania' },
  { id: 'C.E', value: 'Cedula de Extrangeria' }
]

const positinItems = [
  { id: 1, value: 'Groomer' },
  { id: 2, value: 'Asistente veterinario' }
]


export const FormAgregar = (props) => {
  const { label, datosEditables, bgColor, icon, tooltip, }=props

  const { values, setValues, handleInputChange } = useForm(datosEditables)
  const [desabilitado, setDesabilitado] = useState(Object.keys(datosEditables).length === 0)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')


  const handleModal = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    setValues(datosEditables)
    setDesabilitado(Object.keys(datosEditables).length === 0)
  }, [datosEditables, setValues])

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
                <Input
                  id='firstName'
                  label='Primer Nombre'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='secondName'
                  label='Segundo Nombre'
                  name='secondName'
                  value={values.secondName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='firstLastName'
                  fullWidth
                  label='Primer Apellido'
                  name='firstLastName'
                  value={values.firstLastName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='secondLastName'
                  fullWidth
                  label='Segundo Apellido'
                  name='secondLastName'
                  value={values.secondLastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='document'
                  fullWidth
                  label='Documento'
                  name='document'
                  value={values.document}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Selects
                  id='documentType'
                  label='Tipo de Documento'
                  name='documentType'
                  value={values.documentType}
                  onChange={handleInputChange}
                  items={documentItems}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='userName'
                  fullWidth
                  label='Usuario'
                  name='userName'
                  value={values.userName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='password'
                  fullWidth
                  type='password'
                  label='Contraseña'
                  name='password'
                  value={values.password}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='email'
                  fullWidth
                  label='Correo'
                  name='email'
                  value={values.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Selects
                  id='position'
                  label='Cargo'
                  name='position'
                  value={values.position}
                  onChange={handleInputChange}
                  items={positinItems}
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
