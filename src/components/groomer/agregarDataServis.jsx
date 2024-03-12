import { Alert, Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TextField } from '@mui/material';
import InputDate from '../dash/inputDate'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'
import dayjs from 'dayjs'

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
    nombreMascota: '',
    fechaAplicacion: '',
    servicioFinalizado: 0,
    tipoDocumento: 'C.C',
    numeroDocumento: '',
    notaServicio: '',
    idServicio: 8,
    idMascota: '',
    servicio_finalizado_groomer: ''

}


export const FormServisGroomer = (props) => {
    const { id, label, bgColor, icon, tooltip, actualizar, dato } = props
    const [datosEditables, setDatosEditables] = useState(defaultValues)
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(datosEditables)
    const [desabilitado, setDesabilitado] = useState(id === null ? false : true)
    const [validarId, setValidarId] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [info, setInfo] = useState('');
    const [success, setSuccess] = useState('');
    const [servi, setServi] = useState([])
    const [tipoDocuemento, setTipodocumento] = useState([])
    const [mascota, setMascota] = useState([])

    const handleModal = async () => {
        if (id !== null && id) {
            try {
                const result = await axios.get(`http://localhost:4321/groomer/${id}`)
                const todosDatos = {
                    ...defaultValues,
                    ...result.data
                }
                setDatosEditables(todosDatos)
                setValues(todosDatos)
                console.log(result.data)
            } catch (error) {
                setError(`Error: ${error.response.data.message}`)
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
        const infoTimeout = setTimeout(() => {
            setInfo(null);
        }, 5000);
        return () => {
            clearTimeout(infoTimeout);
        };
    }, [info]);



    useEffect(() => {
        const fectchData = async () => {
            try {
                const resulDoc = await axios.get('http://localhost:4321/documentos')
                const result = await axios.get('http://localhost:4321/servicios/GRO')
                setServi(result.data)
                setTipodocumento(resulDoc.data)
            } catch (error) {
                setError(`Error: ${error.response.data.message}`)
            }
        }
        fectchData()
    }, [])


    const reinicio = () => {
        setMascota([])
    }


    useEffect(() => {
        if (id === null) {
            setDesabilitado(false)
        }
        else if (id !== null && id) {
            setDesabilitado(false)
        }
        else {
            setDesabilitado(true)
        }
        setValidarId(id !== null && id)
    }, [id])


    const handleSubmitId = async (event) => {
        event.preventDefault()

        if (values.tipoDocumento === '' || values.numeroDocumento === '') {
            setError('Por favor, complete los campos nesesarios.');
        }
        else {
            setError('');
            try {
                const result = await axios.get(`http://localhost:4321/mascotas/${values.tipoDocumento}/${values.numeroDocumento}`)
                setMascota(result.data)
                setInfo('Datos cargados exitosamente.')


            } catch (error) {
                reinicio()
                setError(`Error: ${error.response.data.message}`)
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        try {
            const fechaHoy = dayjs().format('MM-DD-YYYY')
            let endpoint = 'http://localhost:4321/groomer'
            let httpMethod = 'post'
            let envio = {};
            if (id !== null && id) {
                const { servicio_finalizado_groomer:servicioFinalizado, contenido_servicio_groomer, notaServicio: notasSinFecha } = values;
                envio = {
                    servicioFinalizado,
                    notaServicio: `${contenido_servicio_groomer} ${fechaHoy}:${notasSinFecha}`
                };
                endpoint += `/servis/update/${values.id}`
                httpMethod = 'patch'
            } else {
                const { idMascota, servicioFinalizado, notaServicio: notasSinFecha, idServicio } = values
                envio = {
                    idServicio,
                    idMascota,
                    servicioFinalizado,
                    notaServicio: `${fechaHoy}: ${notasSinFecha}  `
                }
                endpoint += `/create`
            }
            const response = await axios[httpMethod](endpoint, envio)
            setInfo(response.data.message)
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
                                    id='tipoDocumento'
                                    fullWidth
                                    label='Tipo Documento'
                                    name='tipoDocumento'
                                    value={values.id_tipo_documento}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='tipoDocumento'
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
                        <Grid item xs={12} sm={4}>
                            <Input
                                id='numeroDocumento'
                                fullWidth
                                label='N°documento'
                                name='numeroDocumento'
                                value={values.numero_documento_cliente ? values.numero_documento_cliente : values.numeroDocumento}
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
                                    label='servicio'
                                    name='idServicio'
                                    value={values.idServicio}
                                    onChange={handleInputChange}
                                    items={servi}
                                    disabled={validarId ? true : false}
                                    required
                                />
                            )}
                        </Grid>                        <Grid item xs={12} sm={6}>
                            {validarId ? (
                                <Input
                                    id='nombreMascota'
                                    fullWidth
                                    label='Nombre Mascota'
                                    name='nombreMascota'
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
                                    items={mascota}
                                    required
                                    disabled={(validarId || mascota.length === 0) ? true : false}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id={values.servicio_finalizado_groomer === '' ? 'servicioFinalizado' :'servicio_finalizado_groomer'}
                                label='Servicio Finalizado'
                                name={values.servicio_finalizado_groomer === '' ? 'servicioFinalizado' :'servicio_finalizado_groomer'}
                                value={values.servicio_finalizado_groomer === '' ? values.servicioFinalizado : values.servicio_finalizado_groomer}
                                onChange={handleInputChange}
                                items={servicioFinalizado}
                                disabled={false}
                                required
                            />
                        </Grid>
                        {validarId && (
                            <Grid item xs={12} sm={12}>
                                <Input
                                    id='descripSer'
                                    fullWidth
                                    label='notas agregadas anteriormente'
                                    name='descripSer'
                                    value={values.contenido_servicio_groomer}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Input
                                id="notaServicio"
                                label="Nuevas Observaciones"
                                name='notaServicio'
                                fullWidth
                                value={values.notaServicio}
                                onChange={handleInputChange}
                                required
                                disabled={false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button
                                onClick={handleSubmit}
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
