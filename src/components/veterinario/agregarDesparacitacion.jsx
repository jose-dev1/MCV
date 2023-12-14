import { Alert, Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'
import { TextField } from '@mui/material';

const Desparacitacion = [
    { id: 1, value: 'Interna' },
    { id: 2, value: 'Externa' },
]
const documentItems = [
    { id: 'C.C', value: 'Cedula de Ciudadania' },
    { id: 'C.E', value: 'Cedula de Extrangeria' }
]

const mascota = [
    { id: '1', value: 'Tommy' },
    { id: '2', value: 'Luna' }
]


const vacuna = [
    { id: '1', value: 'Rabia' },
    { id: '2', value: 'Triple felina' },
    { id: '3', value: 'Parvovirus' }
]




export const FromAgregarDesparacitacion = (props) => {
    const { label, datosEditables, bgColor, icon, tooltip, } = props

    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(datosEditables)
    const [desabilitado, setDesabilitado] = useState(Object.keys(datosEditables).length === 0)
    const [validarId, setValidarId] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [info, setInfo] = useState('');
    const [success, setSuccess] = useState('');


    const handleModal = () => setOpen(true)
    const handleClose = () => {
        setError('')
        setSuccess('')
        setOpen(false)
    }

    useEffect(() => {
        setValues(datosEditables)
        setDesabilitado(Object.keys(datosEditables).length === 0)
    }, [datosEditables, setValues])

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


    const handleSubmitId = (event) => {
        event.preventDefault()

        if (values.tipo_documento === '' || values.N_documento === '') {
            setError('Por favor, complete los campos nesesarios.');
        }
        else {
            setError('');
            setInfo('Datos cargados exitosamente.')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const formErrores = {};
        Object.entries(values).forEach(([key, value]) => {
            if (key !== 'secondName' && key !== 'secondLastName') {
                if (!value || (typeof value.trim === 'function' && value.trim() === '')) {
                    formErrores[key] = 'Error los campo no puede estar vacíos';

                }
            }
        });

        if (Object.keys(formErrores).length > 0) {
            setError('Por favor, complete los campos nesesarios.');
            return;
        } else {
            setError('')
            setSuccess('Datos guardados exitosamente.')
            return
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
                            <Selects
                                id='tipo_documento'
                                label='Tipo de Documento'
                                name='idDocumento'
                                value={values.tipo_documento}
                                onChange={handleInputChange}
                                items={documentItems}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Input
                                id='N_documento'
                                fullWidth
                                label='N°documento'
                                name='N_documento'
                                value={values.N_documento}
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
                                disabled={validarId ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='mascota'
                                label='Mascota'
                                name='mascota'
                                value={values.mascota}
                                onChange={handleInputChange}
                                items={mascota}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='tipo_desparacitacion'
                                label='Tipo de desparacitacion'
                                name='tipo_desparacitacion'
                                value={values.tipo_desparacitacion}
                                onChange={handleInputChange}
                                items={Desparacitacion}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_control'
                                fullWidth
                                label='Fecha de aplicación'
                                name='fecha_control'
                                fecha={values.fecha_control}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='peso'
                                fullWidth
                                label='Peso'
                                name='peso'
                                value={values.peso}
                                onChange={handleInputChange}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='tipo_vacuna'
                                label='Tipo Vacuna'
                                name='tipo_vacuna'
                                value={values.vacuna}
                                onChange={handleInputChange}
                                items={vacuna}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='proximo_control'
                                fullWidth
                                label='Fecha de aplicación'
                                name='proximo_control'
                                fecha={values.proximo_control}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_creacion'
                                fullWidth
                                label='Proximo control'
                                name='fecha_creacion'
                                fecha={values.fecha_creacion}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        {validarId && (
                            <Grid item xs={12}>
                                <TextField
                                    id="observaciones"
                                    label="Observaciones Agegadas Anteriormente"
                                    name="observaciones"
                                    multiline
                                    maxRows={7}
                                    value={values.observaciones}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                id="observaciones"
                                label="Nuevas Observaciones"
                                name='observaciones'
                                multiline
                                maxRows={7}
                                fullWidth
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
