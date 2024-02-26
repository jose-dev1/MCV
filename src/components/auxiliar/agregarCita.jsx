import dayjs from 'dayjs';
import { Alert, Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'
import InputTime from '../dash/inputTime';
import axios from 'axios';

const especialista = [
    { id: 4, value: 'Veterinario' },
    { id: 5, value: 'Groomer' }
]

const defaultValues = {
    id:'',
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
    const { label, id, bgColor, icon, tooltip, actualizar,dato } = props

    const [datosEditables, setDatosEditables] = useState(defaultValues)
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(datosEditables)
    const [desabilitado, setDesabilitado] = useState(id===null ? false : true)
    const [validarId, setValidarId] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [info, setInfo] = useState('');
    const [success, setSuccess] = useState('');
    const [tipoDocuemento, setTipodocumento] = useState([])
    const [dataMoscota, setDataMascota] = useState([])
    const [dataEspecialista, setDataEspecialista] = useState([])
    const [dataServicio, setDataServicio] = useState([])

    useEffect(() => {
        const fectchData = async () => {
            try {
                const result = await axios.get('http://localhost:4321/documentos')
                setTipodocumento(result.data)
            } catch (error) {
                setError(`Error: ${error.response.data.menssage}`)
            }
        }
        fectchData()
    }, [])


    const reinicio = () =>{
        setDataMascota([])
        setDataEspecialista([])
        setDataServicio([])
    }

    const handleModal = async() => {
        if(id !== null && id){
            try {
                const result = await axios.get(`http://localhost:4321/agendar/citas/${id}`)
                const todosDatos = {
                    ...defaultValues,
                    ...result.data
                }
                setDatosEditables(todosDatos)
                setValues(todosDatos)
            } catch (error) {
                setError(`Error: ${error.response.data.menssage}`)
            }
        }
        setOpen(true)
    }

    const handleClose = () => {
        reinicio()
        setValues(defaultValues)
        setDatosEditables(defaultValues)
        setError('')
        setSuccess('')
        setOpen(false)
    }

    useEffect(() => {
        if(id === null){
            setDesabilitado(false)
        }
        else if(id !== null && id){
            setDesabilitado(false)
        }
        else{
            setDesabilitado(true)
        }
    },[id])

    useEffect(() => {
        setValidarId(datosEditables.id !== '')
    }, [datosEditables, setValidarId])

    useEffect(() => {
        const infoTimeout = setTimeout(() => {
            setInfo(null);
        }, 5000);
        return () => {
            clearTimeout(infoTimeout);
        };
    }, [info]);


    const handleSubmitId = async (event) => {
        event.preventDefault()
        if (values.tipoDocuemento === '' || values.numeroDocumento === '' || values.especialista === '') {
            setError('Por favor, complete los campos nesesarios.');
            reinicio()
        }
        else {
            setError('');
            try {
                const result = await axios.get(`http://localhost:4321/mascotas/${values.tipoDocumento}/${values.numeroDocumento}`)
                setDataMascota(result.data)
                setInfo('Datos cargados exitosamente.')

                const resultEs = await axios.get(`http://localhost:4321/especialistas/${values.especialista}`)
                setDataEspecialista(resultEs.data)


                const resultSer = await axios.get(`http://localhost:4321/servicios/${values.especialista === 4 ? 'VET' : 'GRO'}`)
                setDataServicio(resultSer.data)
            } catch (error) {
                reinicio()
                setError(`Error: ${error.response.data.menssage}`)
            }

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        try {
            let endpoint = 'http://localhost:4321/agendar'
            let httpMethod = 'post'
            let envio = {};
            if (id !== null && id) {
                const { fechaCita, horaCita, id_empleado, id_mascota } = values;
                envio = {
                    fechaCita: fechaCita instanceof dayjs ? fechaCita.format('YYYY-MM-DD') : fechaCita,
                    horaCita: horaCita instanceof dayjs ? horaCita.format('HH:mm') : horaCita,
                    idEmpleado: id_empleado,
                    idMascota: id_mascota
                };
                endpoint += `/${values.id}`
                httpMethod = 'patch'
            } else {
                const { fechaCita, horaCita, estadoCita, idEmpleado, idServicio, idMascota, especialista } = values
                envio = {
                    fechaCita: fechaCita instanceof dayjs ? fechaCita.format('YYYY-MM-DD') : fechaCita,
                    horaCita: horaCita instanceof dayjs ? horaCita.format('HH:mm') : horaCita,
                    estadoCita,
                    idEmpleado,
                    idServicio,
                    idMascota,
                    especialista
                }
            }
            const response = await axios[httpMethod](endpoint, envio)
            setInfo(response.data.message)
            actualizar(!dato)
        } catch (error) {
            setError(`Error: ${error.response.data.menssage}`)
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
                    {info && (
                        <Alert className='mb-2' severity="info">
                            {info}
                        </Alert>
                    )}
                    {error && (
                        <Alert className='mb-2' severity="error">
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert className='mb-2' severity="success">
                            {success}
                        </Alert>
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
                                disabled={validarId ? true : false}
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
                                value={values.numero_documento_cliente}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Boton
                                onClick={handleSubmitId}
                                bgColor='success'
                                icon={<MagnifyingGlassIcon />}
                                tooltip='Buscar'
                                desable={validarId ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
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
                                disabled={false}
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
