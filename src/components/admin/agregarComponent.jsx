import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from './Input'
import Selects from './Selects'
import { useState } from 'react'
import Boton from '../dash/boton'
import { useBringDocument } from '../../Hooks/useDocument'
import { useHabilitar } from '../../Hooks/useHabilitar'
import Message from '../dash/succesfulMessage'
import { useBringUserType } from '../../Hooks/getTipeEmployee'
import axios from 'axios'
import useGenreTypes from '../../Hooks/useGenreTypes'
import { getDataById } from '../../utils/getDataById'

const defaultValues = {
  primerNombreEmpleado: '',
  segundoNombreEmpleado: '',
  primerApellidoEmpleado: '',
  segundoApellidoEmpleado: '',
  numeroDocumentoEmpleado: '',
  idTipoDocumento: 'C.C',
  passwordUsuario: '',
  correoUsuario: '',
  idTipoUsuario: 3,
  idGenero: 'M',
  estadoUsuario: 1, 
  estadoVerificacionUsuario: 1
}


export const FormAgregar = (props) => {
  const { label, id, bgColor, icon, tooltip, actualizar, dato } = props
  const { values, setValues, handleInputChange } = useForm(defaultValues)
  const {desabilitado, validarId} = useHabilitar({id})

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [tipoDocuemento] = useBringDocument()
  const [positinItems] = useBringUserType()
  const [genreTypes] = useGenreTypes()

  const handleModal = async () => {
    const {todosDatos, validacion} =  await getDataById({id, endpoind: 'admin', defaultValues})
    if (validacion) {
        if(todosDatos instanceof Error){
            setError(todosDatos)
        }else{
            setValues(todosDatos)
        }
    }
    setOpen(true)
  }

  const handleClose = () => {
    setValues(defaultValues)
    setError('')
    setSuccess('')
    setOpen(false)
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    setSuccess('')
    try {
        let endpoint = 'http://localhost:4321/admin'
        let httpMethod = 'post'
        let envio = {};
        if (id !== null && id) {
            envio = {
              ...values
            };
            endpoint += `/actualizar/${values.id}`
            httpMethod = 'patch'
        } else {
            envio = {
              ...values
            }
        }
        const response = await axios[httpMethod](endpoint, envio)
        setSuccess(response.data.message)
        actualizar(!dato)
    } catch (error) {
        setError(`Error: ${error.response.data.message}`)
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
            <Message severity = {'error'} message={error}/>
          )}
          {success && (
            <Message severity = {'success'} message={success}/>
          )}
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sm={6}>
              <Input
                id='primerNombreEmpleado'
                label='Primer Nombre'
                name='primerNombreEmpleado'
                value={values.primerNombreEmpleado}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='segundoNombreEmpleado'
                label='Segundo Nombre'
                name='segundoNombreEmpleado'
                value={values.segundoNombreEmpleado}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='primerApellidoEmpleado'
                fullWidth
                label='Primer Apellido'
                name='primerApellidoEmpleado'
                value={values.primerApellidoEmpleado}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='segundoApellidoEmpleado'
                fullWidth
                label='Segundo Apellido'
                name='segundoApellidoEmpleado'
                value={values.segundoApellidoEmpleado}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='numeroDocumentoEmpleado'
                fullWidth
                label='Documento'
                name='numeroDocumentoEmpleado'
                value={values.numeroDocumentoEmpleado}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Selects
                  id='idTipoDocumento'
                  label='Tipo de Documento'
                  name='idTipoDocumento'
                  value={values.idTipoDocumento}
                  onChange={handleInputChange}
                  items={tipoDocuemento}
                  required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='passwordUsuario'
                fullWidth
                type='password'
                label='Contraseña'
                name='passwordUsuario'
                value={values.passwordUsuario}
                onChange={handleInputChange}
                required
                disabled={validarId ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                id='correoUsuario'
                fullWidth
                label='Correo'
                name='correoUsuario'
                value={values.correoUsuario}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Selects
                id='idTipoUsuario'
                label='Cargo'
                name='idTipoUsuario'
                value={values.idTipoUsuario}
                onChange={handleInputChange}
                items={positinItems}
                required
                disabled={validarId ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Selects
                id='idGenero'
                label='Genero'
                name='idGenero'
                value={values.idGenero}
                onChange={handleInputChange}
                items={genreTypes}
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
