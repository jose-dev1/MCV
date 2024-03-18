import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import { useState } from 'react'
import Boton from '../dash/boton'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import dayjs from 'dayjs'
import { useHabilitar } from '../../Hooks/useHabilitar'
import { getDataById } from '../../utils/getDataById'
import { useBringDocument } from '../../Hooks/useDocument'
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner'
import { dateFormater } from '../../utils/dateFormater'
import axios from 'axios'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useExamTypes } from '../../Hooks/useExamTypes'
import Message from '../dash/succesfulMessage'
import InputDate from '../dash/inputDate'
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';

const registroCompletoExamen = [
  {
      id: 0, value: 'No'
  },
  {
      id: 1, value: 'Si'
  }
]

const defaultValues = {
  id: '',
  fecha_creacion: dayjs(),
  idMascota: '',
  numeroDocumento: '',
  tipoDocumento: 'C.C',
  idTipoExamen: 1,
  fecha_registro_resultados_examen: dayjs(),
  resultado_examen:'',
  link_archivo_examen:'',
  registro_completo_examen: 0
}

export const AgrearExamen = (props) => {
  const { label, bgColor, icon, tooltip, id, actualizar, dato, successMessage, errorMessage } = props

  const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)
  const {desabilitado, validarId} = useHabilitar({id})
  const [tipoDocuemento] = useBringDocument()
  const [examType] = useExamTypes()

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(false)
  const [dataMoscota, setDataMascota] = useState([])
  const [disableBoton, setDisableBoton] = useState(true)

  const reinicio = () =>{
    setDataMascota([])
  }

  const handleModal = async () => {
    successMessage('')
    errorMessage('')
    const {todosDatos, validacion} =  await getDataById({id, endpoind: 'examenesVeterinario', defaultValues})
    if (validacion) {
        if(todosDatos instanceof Error){
            setError(todosDatos)
        }else{
            if (todosDatos.registro_completo_examen === 0){
              setDisableBoton(false)
              setValues(todosDatos)
              setOpen(true)
            }else{
              handleClose()
              errorMessage('El examen no puede ser editado')
            }
        }
    }else{
      setOpen(true)
    }
  }
  const handleClose = () => {
    reinicio()
    setValues(defaultValues)
    setError('')
    setSuccess('')
    setOpen(false)
    setDisableBoton(true)
  }

  const handleSubmitId = async (event) => {
    event.preventDefault()
    if (!disableBoton){
      setSuccess('')
      setDisableBoton(true)
      setDataMascota([])
    }else{
      try{
          const validation = emptyValidation({DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento})
          setSuccess('')
          if (validation || values.especialista === '') {
              setError('Por favor, complete los campos nesesarios.');
              reinicio()
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
          reinicio()
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
      let endpoint = 'http://localhost:4321/examenesVeterinario/'
      let httpMethod = 'post'
      let envio = {};
      if (id !== null && id) {
          const { fecha_registro_resultados_examen: fechaRegistroResultadosExamen,
          resultado_examen: resultadoExamen,
          link_archivo_examen: linkArchivoExamen,
          registro_completo_examen: registroCompletoExamen} = values;
          if (registroCompletoExamen===0){
            envio = {
              fechaRegistroResultadosExamen: null,
              resultadoExamen,
              linkArchivoExamen,
              registroCompletoExamen
            };
          }else {
            envio = {
              fechaRegistroResultadosExamen: dateFormater({time: fechaRegistroResultadosExamen, format: 'YYYY-MM-DD'}),
              resultadoExamen,
              linkArchivoExamen,
              registroCompletoExamen
            };
          }
          endpoint += `/${values.id}`
          httpMethod = 'patch'
      } else {
          const { idMascota, idTipoExamen } = values
          envio = {
              idMascota,
              idTipoExamen
          }
      }
      const response = await axios[httpMethod](endpoint, envio)
      successMessage(response.data.message)
      actualizar(!dato)
      handleClose()
  } catch (error) {
      setError(`Error: ${error.response.data.message}`)
      setDisableBoton(false)
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
                    id='idDocumento'
                    fullWidth
                    label='Tipo de documento'
                    name='tipoDocumento'
                    value={values.descripcion_documento}
                    onChange={handleInputChange}
                    disabled={validarId ? true : false}
                    required
                />
            ) : (
                <Selects
                id='idDocumento'
                label='Tipo de Documento'
                name='tipoDocumento'
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
                label='N°documento'
                name='numeroDocumento'
                value={values.numero_documento_cliente}
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
            <Grid item xs={12} sm={6}>
            {validarId ? (
                <Input
                    id='idMascota'
                    fullWidth
                    label='Nombre Mascota'
                    name='idMascota'
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
            <Grid item xs={12} sm={6}>
              {validarId ? (
                <Input
                  id='tipoExamen'
                  label='Tipo Examen'
                  name='tipoExamen'
                  value={values.tipo_examen}
                  onChange={handleInputChange}
                  disabled={true}
                  required
                />
              ) : (
                <Selects
                  id='idTipoExamen'
                  label='Tipo Examen'
                  name='idTipoExamen'
                  value={values.tipoExamen}
                  onChange={handleInputChange}
                  items={examType}
                  required
                />
              )}
            </Grid>
            
            {validarId && (
              <>
                <Grid item xs={12} sm={6}>
                <InputDate
                    id='fecha_registro_resultados_examen'
                    fullWidth
                    label='Fecha registro resultados examen'
                    name='fecha_registro_resultados_examen'
                    fecha={values.fecha_registro_resultados_examen ? values.fecha_registro_resultados_examen : values.fecha_registro_resultados_examen=dayjs()}
                    onChange={handleInputChangeDate}
                    disabled={values.registro_completo_examen === 0 ? true : false}
                    required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='resultado_examen'
                  label='resultado Examen'
                  name='resultado_examen'
                  value={values.resultado_examen}
                  onChange={handleInputChange}

                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id='link_archivo_examen'
                  label='link Archivo Examen'
                  name='link_archivo_examen'
                  value={values.link_archivo_examen}
                  onChange={handleInputChange}

                  required
                />
              </Grid>
                <Grid item xs={12} sm={6}>
                  <Selects
                    id='registro_completo_examen'
                    label='Registro completo examen'
                    name='registro_completo_examen'
                    value={values.registro_completo_examen}
                    onChange={handleInputChange}
                    items={registroCompletoExamen}
                    disabled={false}
                    required
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <button
                type='submit'
                className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                disabled = {disableBoton}
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
