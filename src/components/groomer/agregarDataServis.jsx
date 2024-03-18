import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import axios from 'axios'
import dayjs from 'dayjs'
import { useBringDocument } from '../../Hooks/useDocument';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { getDataById } from '../../utils/getDataById';
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner';
import Message from '../dash/succesfulMessage';
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
    const { id, label, bgColor, icon, tooltip, actualizar, dato, successMessage, errorMessage } = props

    const { values, setValues, handleInputChange } = useForm(defaultValues)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [dataMoscota, setDataMascota] = useState([])
    const [servi, setServi] = useState([])
    const [tipoDocuemento] = useBringDocument()
    const { desabilitado, validarId } = useHabilitar({ id })
    const [disableBoton, setDisableBoton] = useState(true)




    const handleModal = async () => {
        successMessage('')
        errorMessage('')
        const { todosDatos, validacion } = await getDataById({ id, endpoind: 'groomer', defaultValues })
        if (validacion) {
            if (todosDatos instanceof Error) {
                setError(todosDatos)
            } else {
                if (todosDatos.servicio_finalizado_groomer === 0) {
                    setDisableBoton(false);
                    setValues(todosDatos);
                    setOpen(true)
                }
                else {
                    handleClose()
                    errorMessage('Servicio ya finalizada no puede ser editado')
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

    useEffect(() => {
        const fectchData = async () => {
            try {
                const result = await axios.get('http://localhost:4321/servicios/GRO')
                setServi(result.data)
            } catch (error) {
                setError(`Error: ${error.response.data.message}`)
            }
        }
        fectchData()
    }, [])


    const reinicio = () => {
        setValues(defaultValues)
        setDataMascota([])
    }

    const handleSubmitId = async (event) => {
        event.preventDefault()
        if (!disableBoton) {
            setSuccess('')
            setDisableBoton(true)
            setDataMascota([])
        } else {
            try {
                const validation = emptyValidation({ DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento })
                setSuccess('')
                if (validation) {
                    setError('Por favor, complete los campos nesesarios.');
                } else {
                    setError('')
                    const getPets = await getPetsWithOwner({ DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento })
                    if (getPets instanceof Error) throw new Error(getPets.response.data.message)
                    setDataMascota(getPets)
                    setDisableBoton(false)
                    setSuccess('Datos cargados exitosamente.')
                }
            } catch (error) {
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
            const fechaHoy = dayjs().format('MM-DD-YYYY')
            let endpoint = 'http://localhost:4321/groomer'
            let httpMethod = 'post'
            let envio = {};
            if (id !== null && id) {
                const { servicio_finalizado_groomer: servicioFinalizado, contenido_servicio_groomer, notaServicio: notasSinFecha } = values;
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
                        <Message severity={'error'} message={error} />
                    )}
                    {success && (
                        <Message severity={'success'} message={success} />
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
                                name='numeroDocumento'
                                value={values.numero_documento_cliente ? values.numero_documento_cliente : values.numeroDocumento}
                                onChange={handleInputChange}
                                disabled={!disableBoton ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Boton
                                onClick={handleSubmitId}
                                bgColor={!disableBoton ? 'error' : 'success'}
                                icon={!disableBoton ? <DeleteIcon sx={{ fontSize: 40 }} /> : <PetsIcon sx={{ fontSize: 40 }} />}
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                    items={dataMoscota}
                                    required
                                    disabled={(validarId || dataMoscota.length === 0) ? true : false}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id={values.servicio_finalizado_groomer === '' ? 'servicioFinalizado' : 'servicio_finalizado_groomer'}
                                label='Servicio Finalizado'
                                name={values.servicio_finalizado_groomer === '' ? 'servicioFinalizado' : 'servicio_finalizado_groomer'}
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
