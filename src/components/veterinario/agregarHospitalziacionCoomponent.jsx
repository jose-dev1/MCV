import { Grid, Modal  } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useState } from 'react'
import Boton from '../dash/boton'
import InputDate from '../dash/inputDate'
import TextArea from '../dash/textArea'
import dayjs from 'dayjs'
import axios from 'axios';
import { useBringDocument } from '../../Hooks/useDocument';
import Message from '../dash/succesfulMessage';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner';
import { dateFormater } from '../../utils/dateFormater';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';

const servicioFinalizado = [
  {
      id: 0, value: 'No'
  },
  {
      id: 1, value: 'Si'
  }
]

const defaultValues = {
  id: '',
  fecha_salida_hospitalizacion: dayjs(),
  idMascota: '',
  servicio_finalizado_hospitalizacion:'',
  numeroDocumento: '',
  tipoDocumento: 'C.C',
  contenido_hospitalizacion:'',
  observaciones: '',
  nombre_mascota:''
}

export const FormAgregarHozpitalizaciones = (props) => {
  const { label, id, bgColor, icon, tooltip, actualizar,dato,successMessage,errorMessage } = props

  const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [dataMoscota, setDataMascota] = useState([])
    const [tipoDocuemento] = useBringDocument()
    const {desabilitado, validarId} = useHabilitar({id})
    const [disableBoton,setDisableBoton] = useState(true)


    const handleModal = async () => {
      successMessage('')
      errorMessage('')
      const {todosDatos, validacion} =  await getDataById({id, endpoind: 'hospitalizaciones', defaultValues})
      if (validacion) {
          if(todosDatos instanceof Error){
              setError(todosDatos)
          }else{
            if (todosDatos.servicio_finalizado_hospitalizacion === 0) {
              setDisableBoton(false);
              setValues(todosDatos);
              setOpen(true)
            } else {
              handleClose()
              errorMessage('Historia clinica ya finalizada no puede ser editada')
            }
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
            if (getPets instanceof Error) throw new Error(getPets.response.data.message) 
            setDataMascota(getPets)
            setDisableBoton(false)
            setSuccess('Datos cargados exitosamente.')
        }
    }catch (error) {
      error.response ? setError(`Error: ${error.response.data.message}`) : setError('Error al conectar con el servidor')
    }
    }

}

const handleSubmit = async (event) => {
  event.preventDefault();
  setError('')
  setSuccess('')
  setDisableBoton(true)
  try {
      let endpoint = 'http://localhost:4321/hospitalizaciones'
      let httpMethod = 'post'
      let envio = {}
      const fechaHoy = `${dayjs().format('MM-DD-YYYY')} ${dayjs().format('HH:MM')}`
      if (id !== null && id) {
          const { fecha_salida_hospitalizacion:fechaSalida,contenido_hospitalizacion, observaciones, servicio_finalizado_hospitalizacion:servicioFinializadoHospitalizacion } = values;
          if(servicioFinializadoHospitalizacion === 0){
            envio = {
              fechaSalida:null,
              contenidoHospitalizacion: `${contenido_hospitalizacion} ${fechaHoy}: ${observaciones}\n`,
              servicioFinializadoHospitalizacion
          }
          } else {
              envio = {
                fechaSalida:dateFormater({time: fechaSalida, format: 'YYYY-MM-DD'}),
                contenidoHospitalizacion: `${contenido_hospitalizacion} ${fechaHoy}: ${observaciones}\n`,
                servicioFinializadoHospitalizacion
            }
          }
          endpoint += `/${values.id}`
          httpMethod = 'patch'
      }else {
          const { idMascota, observaciones } = values
          envio = {
              idMascota, 
              contenidoHospitalizacion:`${fechaHoy}: ${observaciones}\n`
          }
      }
      const response = await axios[httpMethod](endpoint, envio)
      successMessage(response.data.message)
      actualizar(!dato)
      handleClose()
  } catch (error) {
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
                  id='tipoDocuemento'
                  label='Tipo de Documento'
                  name='tipoDocuemento'
                  value={values.tipoDocumento}
                  onChange={handleInputChange}
                  items={tipoDocuemento}
                  disabled={!disableBoton ? true : false}
                  required
                />
              )}
              </Grid>
              <Grid item xs={12} sm={4}>
              <Input
                  id='numeroDocumento'

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
                    disabled={(validarId || dataMoscota.length === 0) ? true : false}
                    required
                  />
                )}
              </Grid>
              
              {validarId && (
                <Grid item xs={12} sm={6}>
                  <Selects
                    id='servicio_finalizado_hospitalizacion'
                    label='Servicio Finalizado'
                    name='servicio_finalizado_hospitalizacion'
                    value={values.servicio_finalizado_hospitalizacion}
                    onChange={handleInputChange}
                    items={servicioFinalizado}
                    disabled={false}
                    required
                  />
                </Grid>
              )}
            
              {validarId && (
                  <Grid item xs={12} sm={6}>
                    <InputDate
                      id='fecha_salida_hospitalizacion'
                      fullWidth
                      label='Fecha salida hospitalizacion'
                      name='fecha_salida_hospitalizacion'
                      fecha={values.fecha_salida_hospitalizacion ? values.fecha_salida_hospitalizacion : values.fecha_salida_hospitalizacion=dayjs()}
                      onChange={handleInputChangeDate}
                      disabled={values.servicio_finalizado_hospitalizacion === 0 ? true:false}
                    />
                </Grid>
              )}
              {validarId && (
                  <Grid item xs={12}>
                  <TextArea
                    id="contenido_hospitalizacion"
                    label="Observaciones Agegadas Anteriormente"
                    name="contenido_hospitalizacion"
                    value={values.contenido_hospitalizacion.trim()}
                    onChange={handleInputChange}
                    disabled
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextArea
                    id="observaciones"
                    label="Observaciones"
                    name="observaciones"
                    value={values.observaciones}
                    onChange={handleInputChange}
                    disabled={false}
                />
              </Grid>
              <Grid item xs={12}>
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
