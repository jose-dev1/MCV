import dayjs from 'dayjs';
import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useState,useEffect } from 'react'
import Boton from '../dash/boton'
import InputDate from '../dash/inputDate'
import InputTime from '../dash/inputTime';
import axios from 'axios';
import { useBringDocument } from '../../Hooks/useDocument';
import Message from '../dash/succesfulMessage';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner';
import { getSpecialist } from '../../utils/getSpecialist';
import { getServisWithSpecialist } from '../../utils/getServisWithSpecialist';
import { dateFormater } from '../../utils/dateFormater';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { VerCitasDia } from './VerAgenda';

const especialista = [
    { id: 4, value: 'Veterinario' },
    { id: 5, value: 'Groomer' }
]

const defaultValues = {
    fechaCita: dayjs(),
    horaCita: dayjs(),
    estadoCita:1,
    idEmpleado: '',
    idServicio: '',
    idMascota: '',
    especialista: 4,
    tipoDocumento: 'C.C',
    numeroDocumento: ''
  }

export const Maurisio = (props) => {
    const { label, id, bgColor, icon, tooltip, actualizar,dato,successMessage,errorMessage  } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)
    
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [dataMoscota, setDataMascota] = useState([])
    const [dataEspecialista, setDataEspecialista] = useState([])
    const [dataServicio, setDataServicio] = useState([])
    const [tipoDocuemento] = useBringDocument()
    const {desabilitado, validarId} = useHabilitar({id})
    const [disableBoton,setDisableBoton] = useState(true)
    const [blockPastHours,setBlockPastHours] = useState(true)

    useEffect(()=>{
        dateFormater({time: values.fechaCita, format: 'YYYY-MM-DD'})===(dayjs().format('YYYY-MM-DD')) ? setBlockPastHours(true) : setBlockPastHours(false)
    },[values.fechaCita])


    const reinicio = () =>{
        setDataMascota([])
        setDataEspecialista([])
        setDataServicio([])
    }

    const handleModal = async () => {
        successMessage('')
        errorMessage('')
        const {todosDatos, validacion} =  await getDataById({id, endpoind: 'agendar/citas', defaultValues})
        if (validacion) {
            if(todosDatos instanceof Error){
                setError(todosDatos)
            }else{
                setDisableBoton(false);
                setValues(todosDatos);
                setOpen(true)
            }
        }
        setOpen(true)
    }

    const handleClose = () => {
        reinicio()
        setDisableBoton(true)
        setValues(defaultValues)
        setError('')
        setSuccess('')
        setOpen(false)
    }

    const handleSubmitId = async (event) => {
        event.preventDefault()
        if(!disableBoton)
        {
          setSuccess('')
          setDisableBoton(true)
          reinicio()
          setValues(defaultValues)
        } else {
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
                    
                    const resultEs = await getSpecialist({specialist:values.especialista})
                    if (resultEs instanceof Error) throw new Error(resultEs.response.data.message) 
                    setDataEspecialista(resultEs)
                    
                    const resultSer = await getServisWithSpecialist({specialist: values.especialista})
                    if (resultSer instanceof Error) throw new Error(resultSer.response.data.message) 
                    setDataServicio(resultSer)
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
            let endpoint = 'http://localhost:4321/agendar'
            let httpMethod = 'post'
            let envio = {};
            if (id !== null && id) {
                const { fechaCita, horaCita, id_empleado, id_mascota } = values;
                envio = {
                    fechaCita: dateFormater({time: fechaCita, format: 'YYYY-MM-DD'}),
                    horaCita: dateFormater({time: horaCita, format: 'HH:mm'}),
                    idEmpleado: id_empleado,
                    idMascota: id_mascota
                };
                endpoint += `/${values.id}`
                httpMethod = 'patch'
            } else {
                const { fechaCita, horaCita, estadoCita, idEmpleado, idServicio, idMascota, especialista } = values
                envio = {
                    fechaCita: dateFormater({time: fechaCita, format: 'YYYY-MM-DD'}),
                    horaCita: dateFormater({time: horaCita, format: 'HH:mm'}),
                    estadoCita,
                    idEmpleado,
                    idServicio,
                    idMascota,
                    especialista: especialista === 4 ? 'VET' : 'GRO'
                }
            }
            const response = await axios[httpMethod](endpoint, envio)
            successMessage(response.data.message)
            handleClose()
            actualizar(!dato)
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
                                    id='Especialista'
                                    fullWidth
                                    label='Especialista'
                                    name='especialista'
                                    value={values.es === 'VET' ? 'Veterinario':'Groomer'}
                                    onChange={handleInputChange}
                                    disabled={validarId ? true : false}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='especialista'
                                    label='Especialista'
                                    name='especialista'
                                    value={values.especialista}
                                    onChange={handleInputChange}
                                    items={especialista}
                                    disabled={!disableBoton ? true : false}
                                    required
                                />
                            )}
                        </Grid>
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
                        <Grid item xs={12} sm={10}>
                            <Input
                                id='numeroDocumento'
                                fullWidth
                                label='N°documento'
                                name='numeroDocumento'
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
                        <Grid item xs={12} sm={10}>
                            {validarId ? (
                                <Input
                                    id='idEmpleado'
                                    fullWidth
                                    label='Empleado seleccionado'
                                    name='idEmpleado'
                                    value={values.nombre_empleado}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='idEmpleado'
                                    label='Seleccione el empleado'
                                    name='idEmpleado'
                                    value={values.idEmpleado}
                                    onChange={handleInputChange}
                                    items={dataEspecialista}
                                    disabled={(validarId || dataEspecialista.length === 0) ? true : false}
                                    required
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <VerCitasDia
                                bgColor='success'
                                icon={<AssignmentIcon sx={{ fontSize: 40 }}/>}
                                desable={disableBoton ? true : false}
                                tooltip='Ver Citas'
                                saveError={setError}
                                idEmpleado={values.id_empleado ?? values.idEmpleado}
                                fechaCita={values.fechaCita}
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
                                    id='idServicio'
                                    fullWidth
                                    label='Servicio'
                                    name='idServicio'
                                    value={values.descripcion_servicio}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='idServicio'
                                    label='Servicio'
                                    name='idServicio'
                                    value={values.idServicio}
                                    onChange={handleInputChange}
                                    items={dataServicio}
                                    disabled={(validarId || dataServicio.length === 0) ? true : false}
                                    required
                                />
                            )}
                        </Grid>
                        {validarId && (
                            <Grid item xs={12} sm={6}>
                                <Input
                                    id='diaAnterior'
                                    fullWidth
                                    label='Dia programado'
                                    name='diaAnterior'
                                    value={dayjs(values.fecha_cita).format('MM-DD-YYYY')}
                                    disabled={true}
                                    required
                                />
                            </Grid>
                        )}
                        {validarId && (
                        <Grid item xs={12} sm={6}>

                            <Input
                            id='horaAnterior'
                            fullWidth
                            label='Hora Programada'
                            name='horaAnterior'
                            value={values.Hora_cita}
                            disabled={true}
                            required
                        />
                        </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                        <InputDate
                                id='fechaCita'
                                fullWidth
                                label='Fecha cita'
                                name='fechaCita'
                                fecha={values.fechaCita}
                                onChange={handleInputChangeDate}
                                blockPastDates={true}
                                disabled={false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <InputTime
                                id='horaCita'
                                fullWidth
                                label='Hora cita'
                                name='horaCita'
                                hour={values.horaCita}
                                onChange={handleInputChangeDate}
                                blockPastHours={blockPastHours}
                                disabled={false}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <button
                                type='submit'
                                className={`w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg 
                                cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem 
                                shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md ${disableBoton ? 'opacity-50': ''}`}
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
