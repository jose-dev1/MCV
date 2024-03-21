import { Alert, Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { TextField } from '@mui/material';
import InputDate from '../dash/inputDate'
import axios from 'axios';
import Message from '../dash/succesfulMessage';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { dateFormater } from '../../utils/dateFormater';
import dayjs from 'dayjs'

const registro_historia_clinica_finalizado = [
    {
        id: 0, value: 'No'
    },
    {
        id: 1, value: 'Si'
    }
]

const defaultValues = {
    id: '',
    fecha_registro_historia_clinica: dayjs(),
    registro_historia_clinica_finalizado: 0,
    notaServicio: '',
    estado_registro_historia_clinica: 1,
    anotacion_registro_historia_clinica: '',
    id_historia_clinica: 0,
    id_servicio: 0,
}

export const FormAgregarHistoriaClinica = (props) => {
    const { label, id, bgColor, icon, tooltip, actualizar, dato, successMessage, idHistoria, errorMessage } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const { desabilitado, validarId } = useHabilitar({ id })
    const [success, setSuccess] = useState('')
    const [servi, setServi] = useState([])
    const [disableBoton, setDisableBoton] = useState(true)


    const handleClose = () => {
        setError('')
        setSuccess('')
        setOpen(false)
    }
    const handleModal = async () => {
        successMessage('')
        errorMessage('')
        const { todosDatos, validacion } = await getDataById({ id, endpoind: 'historia_clinica', defaultValues })
        if (validacion) {
            if (todosDatos instanceof Error) {
                setError(todosDatos)
            } else {
                if (todosDatos.registro_historia_clinica_finalizado === 0) {
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

    useEffect(() => {
        const fectchData = async () => {
            try {
                const result = await axios.get('http://localhost:4321/servicios/VET')
                setServi(result.data)
            } catch (error) {
                setError(`Error: ${error.response.data.message}`)
            }
        }
        fectchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setDisableBoton(true);

        try {
            (values.id_historia_clinica = idHistoria)
            const fechaHoy = dayjs().format('MM-DD-YYYY')
            let endpoint = 'http://localhost:4321/historia_clinica'
            let httpMethod = 'post'
            let envio = {}
            if (id !== null && id) {
                const { registro_historia_clinica_finalizado: registro_historia_clinica_finalizado, descripcion_registro_historia_clinica, notaServicio: notasSinFecha } = values
                envio = {
                    registro_historia_clinica_finalizado,
                    notaServicio: `${descripcion_registro_historia_clinica} ${fechaHoy}:${notasSinFecha}`,
                }
                endpoint += `/actualizar/${values.id}`
                httpMethod = 'patch'
            } else {
                const { id_historia_clinica, id_servicio, registro_historia_clinica_finalizado, notaServicio: notasSinFecha, estado_registro_historia_clinica } = values
                envio = {
                    id_historia_clinica,
                    registro_historia_clinica_finalizado,
                    notaServicio: `${fechaHoy}: ${notasSinFecha}`,
                    id_servicio,
                    estado_registro_historia_clinica
                }
                endpoint += '/createH'
            }
            console.log(envio)

            const response = await axios[httpMethod](endpoint, envio)
            successMessage(response.data.message)
            actualizar(!dato)
            handleClose()
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
                        <Message severity={'error'} message={error} />
                    )}
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={12}>
                            {validarId ? (
                                <Input
                                    id='id_servicio'
                                    fullWidth
                                    label='Tipo servicio'
                                    name='id_servicio'
                                    value={values.descripcion_servicio}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='id_servicio'
                                    label='Servicio'
                                    name='id_servicio'
                                    value={values.id_servicio}
                                    onChange={handleInputChange}
                                    items={servi}
                                    required
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_registro_historia_clinica'
                                fullWidth
                                label='Fecha de registro'
                                name='fecha_registro_historia_clinica'
                                fecha={values.fecha_registro_historia_clinica}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id={values.registro_historia_clinica_finalizado === '' ? 'registro_historia_clinica_finalizado' : 'registro_historia_clinica_finalizado'}
                                label='Servicio Finalizado'
                                name={values.registro_historia_clinica_finalizado === '' ? 'registro_historia_clinica_finalizado' : 'registro_historia_clinica_finalizado'}
                                value={values.registro_historia_clinica_finalizado === '' ? values.registro_historia_clinica_finalizado : values.registro_historia_clinica_finalizado}
                                onChange={handleInputChange}
                                items={registro_historia_clinica_finalizado}
                                disabled={false}
                                required
                            />
                        </Grid>
                        {validarId && (
                            <Grid item xs={12} sm={12}>
                                <Input
                                    id='descripServicio'
                                    fullWidth
                                    label='notas agregadas anteriormente'
                                    name='descripServicio'
                                    value={values.descripcion_registro_historia_clinica}
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
