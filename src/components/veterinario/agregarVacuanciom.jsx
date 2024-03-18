import dayjs from 'dayjs';
import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useState } from 'react'
import Boton from '../dash/boton'
import InputDate from '../dash/inputDate'
import axios from 'axios';
import { useBringVacuna } from '../../Hooks/useVacuna';
import Message from '../dash/succesfulMessage';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { dateFormater } from '../../utils/dateFormater';


const defaultValues = {
    id: '',
    fechaVacunaAplicada: dayjs(),
    fechaVencimiento: dayjs(),
    laboratorio: '',
    idTipoVacuna: 0,
    loteVacuna: ''
}

export const Maurisio = (props) => {
    const { label, id, bgColor, icon, tooltip, actualizar, dato, idMascota, successMessage } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const { desabilitado, validarId } = useHabilitar({ id })
    const [tipoVacuna] = useBringVacuna(idMascota)

    const handleModal = async () => {
        successMessage('')
        const { todosDatos, validacion } = await getDataById({ id, endpoind: 'carnet/busqueda', defaultValues })
        if (validacion) {
            if (todosDatos instanceof Error) {
                setError(todosDatos)
            } else {
                setValues(todosDatos)
            }
        }
        setOpen(true)
    }

    const handleClose = () => {
        setValues(defaultValues)
        setError('')
        setOpen(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        successMessage('')
        try {
            let endpoint = 'http://localhost:4321/carnet'
            let httpMethod = 'post'
            let envio = {};
            if (id !== null && id) {
                const { fechaVacunaAplicada } = values;
                envio = {
                    fechaVacunaAplicada : dateFormater({ time: fechaVacunaAplicada, format: 'YYYY-MM-DD' }),
                };
                endpoint += `/update/${values.id}`
                httpMethod = 'patch'
            } else {
                const { fechaVacunaAplicada, fechaVencimiento, laboratorio, idTipoVacuna, loteVacuna } = values
                envio = {
                    fechaVacunaAplicada: dateFormater({ time: fechaVacunaAplicada, format: 'YYYY-MM-DD' }),
                    fechaVencimiento: dateFormater({ time: fechaVencimiento, format: 'YYYY-MM-DD' }),
                    laboratorio,
                    idTipoVacuna,
                    loteVacuna,
                    idMascota
                }
                endpoint += `/create`
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
                                    id='idTipoVacuna'
                                    fullWidth
                                    label='Tipo vacuna'
                                    name='idTipoVacuna'
                                    value={values.nombre_vacuna}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='idTipoVacuna'
                                    label='Vacuna'
                                    name='idTipoVacuna'
                                    value={values.idTipoVacuna}
                                    onChange={handleInputChange}
                                    items={tipoVacuna}
                                    required
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='laboratorio'
                                fullWidth
                                label='Laboratorio'
                                name='laboratorio'
                                value={values.laboratorio}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='loteVacuna'
                                fullWidth
                                label='Lote de la vacuna'
                                name='loteVacuna'
                                value={values.lote_vacuna_aplicada ?? values.loteVacuna}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fechaVencimiento'
                                fullWidth
                                label='Fecha de vencimiento'
                                name='fechaVencimiento'
                                fecha={values.fecha_vencimiento_vacuna_aplicada ? values.fechaVencimiento = dayjs(values.fecha_vencimiento_vacuna_aplicada).format('YYYY-MM-DD') : values.fechaVencimiento}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fechaVacunaAplicada'
                                fullWidth
                                label='Fecha de aplicacion'
                                name='fechaVacunaAplicada'
                                fecha={ dayjs(values.fecha_vacuna_aplicada).format('YYYY-MM-DD') ?? values.fechaVacunaAplicada  }
                                onChange={handleInputChangeDate}
                                disabled={false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button
                                type='submit'
                                className='w-full inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md'>
                                Registrar
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </div>
    )
}
