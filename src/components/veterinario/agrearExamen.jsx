import { Grid, Modal, Tooltip } from '@mui/material'
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
import { useExamTypes } from '../../Hooks/useExamTypes'
import Message from '../dash/succesfulMessage'
import InputDate from '../dash/inputDate'
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { handleExamenesPdf } from '../../utils/formatoExamenes'

const registroCompletoExamen = [
  {
      id: 0, value: 'No'
  },
  {
      id: 1, value: 'Si'
  }
]

const resultadoExamen = [
  {
      id: 'Negativo', value: 'Negativo'
  },
  {
      id: 'Positivo', value: 'Positivo'
  }
]

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
  registro_completo_examen: 0,
  lote:'',
  fechaVencimiento:dayjs(),
  resultadoFiv:'Negativo',
  resultadoFelv:'Negativo',
  resultadoCpv:'Negativo',
  resultadoCdv:'Negativo',
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
  const [tipo_examen,SetTipoExamen] = useState()
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileChangePdf = (event) => {
    setSuccess('Archivo cargado correcramente')
    setSelectedPdf(event.target.files[0]);
  };
  const reinicio = () =>{
    setDataMascota([])
  }

  const handlePdf = async () => {
    try {
      setError('')
        const dataMascota = await axios.get(`http://localhost:4321/infoClienteMascota/${values.idMascota}`)
        handleExamenesPdf(tipo_examen, values,dataMascota.data);
  } catch (error) {
      console.error('Error al generar el PDF:', error);
  }
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
              SetTipoExamen(todosDatos.tipo_examen)
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
    setSelectedFile(null);
    setSelectedPdf(null)
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
        if(selectedPdf){
          const { fecha_registro_resultados_examen: fechaRegistroResultadosExamen,
            resultado_examen: resultadoExamen,
            registro_completo_examen: registroCompletoExamen} = values;
            const formData = new FormData();
            formData.append('archivo', selectedPdf);
        
            const link = await axios.post('http://localhost:4321/files/examenes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (registroCompletoExamen===0){
              envio = {
                fechaRegistroResultadosExamen: null,
                resultadoExamen,
                linkArchivoExamen:link.data.link,
                registroCompletoExamen
              };
            }else {
              envio = {
                fechaRegistroResultadosExamen: dateFormater({time: fechaRegistroResultadosExamen, format: 'YYYY-MM-DD'}),
                resultadoExamen,
                linkArchivoExamen:link.data.link,
                registroCompletoExamen
              };
            }
            endpoint += `/${values.id}`
            httpMethod = 'patch'
        }
        else {
          setDisableBoton(false)
          setError('No ha cargado ningun archivo pdf por favor carge uno')
          return
        }
      } else {
        if(selectedFile){
          const dataFile = new FormData();
          dataFile.append('archivo', selectedFile);
      
          const linkImagen = await axios.post('http://localhost:4321/files/examenes', dataFile, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          const { idMascota, idTipoExamen, lote, fechaVencimiento } = values
          envio = {
            idMascota,
            idTipoExamen,
            lote,
            fechaVencimiento: dayjs(fechaVencimiento).format('YYYY-MM-DD'),
            linkImagen: linkImagen.data.link
        }
        }else {
          setError('No ha cargado ninguna imagen')
          setDisableBoton(false)
          return
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
                  value={values.idTipoExamen}
                  onChange={handleInputChange}
                  items={examType}
                  required
                />
              )}
            </Grid>
              <>
              <Grid item xs={12} sm={6}>
                <Input
                  id='lote'
                  label='Lote'
                  name='lote'
                  value={values.lote}
                  onChange={handleInputChange}
                  required
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputDate
                    id='fechaVencimiento'
                    fullWidth
                    label='Fecha vencimiento prueba'
                    name='fechaVencimiento'
                    fecha={values.fechaVencimiento}
                    onChange={handleInputChangeDate}
                    required
                    disabled={true}
                />
              </Grid>
              </>
            {tipo_examen === 'Test VIF-VILEF' && (
              <>
                <Grid item xs={12} sm={6}>
                <Selects
                    id='resultadoFiv'
                    label='Resultado FIV'
                    name='resultadoFiv'
                    value={values.resultadoFiv}
                    onChange={handleInputChange}
                    items={resultadoExamen}
                    disabled={false}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Selects
                    id='resultadoFelv'
                    label='Resultado FELV'
                    name='resultadoFelv'
                    value={values.resultadoFelv}
                    onChange={handleInputChange}
                    items={resultadoExamen}
                    disabled={false}
                    required
                  />
                </Grid>
              </>
            )}
            {tipo_examen === 'Test CPV' && (
              <>
                <Grid item xs={12} sm={12}>
                <Selects
                    id='resultadoCpv'
                    label='Resultado CPV'
                    name='resultadoCpv'
                    value={values.resultadoCpv}
                    onChange={handleInputChange}
                    items={resultadoExamen}
                    disabled={false}
                    required
                  />
                </Grid>
              </>
            )}
            {!validarId &&
              <Grid item xs={12} sm={12}>
                <Button
                  component="label"
                  role={undefined}
                  color={selectedFile ? 'success' :  'secondary'}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  className='w-full'
                >
                  Subir imagen resultado
                  <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                </Button>
              </Grid>}
            {tipo_examen === 'Test CDV' && (
              <>
                <Grid item xs={12} sm={12}>
                <Selects
                    id='resultadoCdv'
                    label='Resultado CDV'
                    name='resultadoCdv'
                    value={values.resultadoCdv}
                    onChange={handleInputChange}
                    items={resultadoExamen}
                    disabled={false}
                    required
                  />
                </Grid>
              </>
            )}
            {validarId && (
              <>
              <Grid item xs={12} sm={12}>
                <Input
                  id='resultado_examen'
                  label='Resultado Examen'
                  name='resultado_examen'
                  value={values.resultado_examen}
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
              </>
            )}
            {validarId && (
              <>
                <Grid item xs={12} sm={3}>
                  <input type="button" className='w-full mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white' value="Generar" disabled={disableBoton} onClick={handlePdf}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Tooltip title="Cargar examen">
                    <Button
                      component="label"
                      className='w-full h-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      <VisuallyHiddenInput type="file" onChange={handleFileChangePdf}/>Cargar
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <button
                    type='submit'
                    className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                    disabled={disableBoton}
                  >
                    Registrar
                  </button>
                </Grid>
              </>
            )}
            {!validarId && (
              <Grid item xs={12} sm={12}>
                <button
                  type='submit'
                  className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'
                  disabled = {disableBoton}
                  >
                  Registrar
                </button>
              </Grid>
            )}
          </Grid>
        </form>
      </Modal>
    </div>
  )
}
