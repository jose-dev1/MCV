import { Grid, Modal  } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useState } from 'react'
import Boton from '../dash/boton'
import TextArea from '../dash/textArea'
import axios from 'axios';
import { useBringDocument } from '../../Hooks/useDocument';
import Message from '../dash/succesfulMessage';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleCertificadoPdf } from '../../utils/formatoCertificado'

const defaultValues = {
  id: '',
  idMascota: '',
  numeroDocumento: '',
  tipoDocumento: 'C.C',
  nombre_mascota:'',
  informacionAdicional:'',
  informacionSanitaria:''
}

export const FormAgregarCertificado = (props) => {
  const { label, id, bgColor, icon, tooltip, actualizar,dato,successMessage,errorMessage } = props

  const { values, setValues, handleInputChange } = useForm(defaultValues)

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [dataMoscota, setDataMascota] = useState([])
    const [tipoDocumento] = useBringDocument()
    const {desabilitado, validarId} = useHabilitar({id})
    const [disableBoton,setDisableBoton] = useState(true)
    const [estadoMascota,setEstadoMascota] = useState(true)

    const handleModal = async () => {
      successMessage('')
      errorMessage('')
      const {todosDatos, validacion} =  await getDataById({id, endpoind: 'certificados/oneById', defaultValues})
      if (validacion) {
          if(todosDatos instanceof Error){
              setError(todosDatos)
          }else{
              setDisableBoton(false);
              setValues(todosDatos);
              setOpen(true)
            }
      }
      else {
        setOpen(true)
      }
  }
  const handleClose = () => {
    setError('')
    setSuccess('')
    reinicio()
    setDisableBoton(true)
    setOpen(false)
  }

  const reinicio = () =>{
    setValues(defaultValues)
    setDataMascota([])
  }

  const handleSubmitId = async (event) => {
    event.preventDefault()
    if(!disableBoton)
    {
      setSuccess('')
      setDisableBoton(true)
      setEstadoMascota(true)
      setDataMascota([])
    } else {
      try{
        const validation = emptyValidation({DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento})
        setSuccess('')
        if (validation) {
            setError('Por favor, complete los campos nesesarios.');
        }
        else {
            setError('')
            const getPets = await getPetsWithOwner({DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento})
            if (getPets instanceof Error) throw new Error(getPets.response ? `Error: ${getPets.response.data.message}` : 'Error al conectar con el servidor') 
            setDataMascota(getPets)
            setDisableBoton(false)
            setEstadoMascota(false)
            setSuccess('Datos cargados exitosamente.')
        }
    }catch (error) {
      setError(`${error}`)    
    }
    }
}

const handleSubmit = async (event) => {
  event.preventDefault();
  setError('')
  setSuccess('')
  setDisableBoton(true)
  try {
      let respuesta
      if(id !== null && id){
        respuesta = await axios.get(`http://localhost:4321/certificados/oneById/${id}`)
      }else {
        respuesta = await axios.get(`http://localhost:4321/certificados/infoForCertificate/${values.idMascota}`)
      }
      handleCertificadoPdf({...respuesta.data,informacionAdicional:values.informacionAdicional,informacionSanitaria:values.informacionSanitaria})
      let endpoint = 'http://localhost:4321/certificados'
      let httpMethod = 'post'
      let envio = {}
      if (id !== null && id) {
          const { informacionAdicional, informacionSanitaria } = values;
            envio = {
              informacionAdicionalCertificado:informacionAdicional,
              informacionSanitariaCertificado:informacionSanitaria
            }
          endpoint += `/update/${id}`
          httpMethod = 'patch'
      }else {
          const {vacunasAplicadas, desparacitacionesExternas, desparacitacionesInternas} = respuesta.data
          const { informacionAdicional, informacionSanitaria } = values
          envio = {
              informacionSanitariaCertificado:informacionSanitaria,
              informacionAdicionalCertificado:informacionAdicional,
              vacunas:vacunasAplicadas,
              desparacitaciones:[desparacitacionesExternas,desparacitacionesInternas]
          }
          endpoint += `/${values.idMascota}`
      }
      const response = await axios[httpMethod](endpoint, envio)
      successMessage(response.data.message)
      actualizar(!dato)
      handleClose()
  } catch (error) {
      setDisableBoton(false)
      error.response ? setError(`Error: ${error.response.data.message}`) : setError('Error al conectar con el servidor')
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
              {validarId ? (
                <Input
                  id='descripcion_documento'
                  fullWidth
                  label='Tipo de documento'
                  name='descripcion_documento'
                  value={values.descripcion_documento}
                  onChange={handleInputChange}
                  disabled={validarId ? true : false}
                  required
                />
              ) : (
                <Selects
                  id='tipoDocumento'
                  label='Tipo de Documento'
                  name='tipoDocumento'
                  value={values.tipoDocumento}
                  onChange={handleInputChange}
                  items={tipoDocumento}
                  disabled={!disableBoton ? true : false}
                  required
                />
              )}
              </Grid>
              <Grid item xs={12} sm={4}>
              <Input
                  id='numeroDocumento'
                  fullWidth
                  label='N°documento'
                  name='numeroDocumento'oneById
                  value={values.numero_documento_cliente??values.numeroDocumento}
                  onChange={handleInputChange}
                  disabled={!disableBoton ? true : false}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Boton
                    onClick={handleSubmitId}
                    bgColor={!disableBoton ?  'error': 'success'} 
                    icon={!disableBoton ? <DeleteIcon sx={{ fontSize: 40 }}/> : <PetsIcon sx={{ fontSize: 40 }}/>}
                    tooltip='Buscar'
                    desable={validarId ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {validarId ? (
                  <Input
                    id='nombre_macota'
                    fullWidth
                    label='Nombre Mascota'
                    name='nombre_macota'
                    value={values.nombre_mascota}
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
                ) : (
                  <Selects
                    id='idMascota'
                    label='Nombre Mascota'
                    name='idMascota'
                    value={values.idMascota}
                    onChange={handleInputChange}
                    items={dataMoscota}
                    disabled={(estadoMascota) ? true : false}
                    required
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextArea
                  id="informacionSanitaria"
                  label="Informacion Sanitaria"
                  name="informacionSanitaria"
                  value={values.informacionSanitaria}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextArea
                    id="informacionAdicional"
                    label="Informacion Adicional"
                    name="informacionAdicional"
                    value={values.informacionAdicional}
                    onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <button
                  type='submit'
                  className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                  disabled={disableBoton}
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
