import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'
import TextArea from '../dash/textArea'
import dayjs from 'dayjs'
import axios from 'axios';
import { useBringDocument } from '../../Hooks/useDocument';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import Message from '../dash/succesfulMessage'


const defaultValues = {
    id: '',
    fecha_creacion: dayjs(),
    idMascota: '',
    numeroDocumento: '',
    tipoDocumento: 'C.C',
    idTipoDesparacitacion: 1,
    fecha_aplicacion_desparacitacion: dayjs(),
    fecha_vencimiento_desparacitacion: dayjs(),
    medicamento_aplicado: '',
    lote_desparacitacion: '',
    registro_ica: '',
    laboratorio_desparacitacion: '',
    estado_desparacitacion: 1,
    anotacion_desparacitacion: ''
}

export const FromAgregarDesparacitacion = (props) => {
    const { label, bgColor, icon, tooltip, id, actualizar, dato } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)
    const { desabilitado, validarId } = useHabilitar({ id })
    const [tipoDocuemento] = useBringDocument()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [open, setOpen] = useState(false)
    const [dataMascota, setDataMascota] = useState([])

    const reinicio = () => {
        setDataMascota([])
    }

    const handleModal = async () => {
        const { todosDatos, validacion } = await getDataById({ id, endpoind: 'desparacitacion', defaultValues })
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
        reinicio()
        setValues(defaultValues)
        setError('')
        setSuccess('')
        setOpen(false)
    }

    const handleSubmitId = async (event) => {
        event.preventDefault()

        if (values.tipoDocumento === '' || values.numeroDocumento === '') {
            setError('Por favor, complete los campos necesarios.');
        }
        else {
            try {
                const response = await axios.get(`http://localhost:4321/mascotas/${values.tipoDocuemento}/${values.numeroDocumento}`);
                if (response.data.length === 0) {
                    setError('No se encontraron mascotas asociadas a este documento.');
                } else {
                    setDataMascota(response.data);
                    setError('');
                    setSuccess('Datos cargados exitosamente.');
                }
            } catch (error) {
                setError('Error al cargar las mascotas.');
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4321/desparacitaciones', values);
            setSuccess('Desparacitación creada con éxito.');
        } catch (error) {
            setError('Error al crear la desparacitación.');
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
                        <Message className='mb-2' severity="error">
                            {error}
                        </Message>
                    )}
                    {success && (
                        <Message className='mb-2' severity="success">
                            {success}
                        </Message>
                    )}
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='tipo_documento'
                                label='Tipo de Documento'
                                name='tipoDocumento'
                                value={values.tipoDocumento}
                                onChange={handleInputChange}
                                items={tipoDocuemento}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='numero_documento'
                                fullWidth
                                label='Número de Documento'
                                name='numeroDocumento'
                                value={values.numeroDocumento}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Boton
                                onClick={handleSubmitId}
                                bgColor='success'
                                icon={<MagnifyingGlassIcon />}
                                tooltip='Buscar'
                                disabled={validarId ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='id_mascota'
                                label='Mascota'
                                name='idMascota'
                                value={values.idMascota}
                                onChange={handleInputChange}
                                items={dataMascota.map(mascota => ({
                                    label: `${mascota.nombre} - ${mascota.raza}`,
                                    value: mascota.id
                                }))}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='idTipoDesparacitacion'
                                label='Tipo de Desparacitación'
                                name='idTipoDesparacitacion'
                                value={values.idTipoDesparacitacion}
                                onChange={handleInputChange}
                                items={['Tipo 1', 'Tipo 2', 'Tipo 3']}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_aplicacion_desparacitacion'
                                fullWidth
                                label='Fecha de Aplicación'
                                name='fecha_aplicacion_desparacitacion'
                                fecha={values.fecha_aplicacion_desparacitacion}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_vencimiento_desparacitacion'
                                fullWidth
                                label='Fecha de Vencimiento'
                                name='fecha_vencimiento_desparacitacion'
                                fecha={values.fecha_vencimiento_desparacitacion}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='medicamento_aplicado'
                                fullWidth
                                label='Medicamento Aplicado'
                                name='medicamento_aplicado'
                                value={values.medicamento_aplicado}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='lote_desparacitacion'
                                fullWidth
                                label='Lote de Desparacitación'
                                name='lote_desparacitacion'
                                value={values.lote_desparacitacion}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='registro_ica'
                                fullWidth
                                label='Registro ICA'
                                name='registro_ica'
                                value={values.registro_ica}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='laboratorio_desparacitacion'
                                fullWidth
                                label='Laboratorio de Desparacitación'
                                name='laboratorio_desparacitacion'
                                value={values.laboratorio_desparacitacion}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextArea
                                id='anotacion_desparacitacion'
                                fullWidth
                                label='Anotación de Desparacitación'
                                name='anotacion_desparacitacion'
                                value={values.anotacion_desparacitacion}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
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
