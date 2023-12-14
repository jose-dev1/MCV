import { Alert, Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'

const vacunas = [
    { id: 1, value: 'Parvovirosi' },
    { id: 2, value: 'Pentavalente' },
    { id: 3, value: 'Pentavalente + coronavirus' },
    { id: 4, value: 'Pentavalente + coronavirus' },
    { id: 5, value: 'Rabia' },
    { id: 6, value: 'Tos de perreras (opcional) (KC)*' },
]
const documentItems = [
    { id: 'C.C', value: 'Cedula de Ciudadania' },
    { id: 'C.E', value: 'Cedula de Extrangeria' }
]

const positinItems = [
    { id: 1, value: 'Max' },
    { id: 2, value: 'Chelsea' }
]

export const Maurisio = (props) => {
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
                                id='idDocumento'
                                label='Tipo de Documento'
                                name='idDocumento'
                                value={values.idDocumento}
                                onChange={handleInputChange}
                                items={documentItems}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Input
                                id='numeroDocumento'
                                fullWidth
                                label='N°documento'
                                name='N_documento'
                                value={values.numeroDocumento}
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
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='idVacuna'
                                label='Vacuna'
                                name='idVacuna'
                                value={values.idVacuna}
                                onChange={handleInputChange}
                                items={vacunas}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='Laboratorio'
                                fullWidth
                                label='Laboratorio'
                                name='laboratorio'
                                value={values.laboratorio}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {validarId ? (
                                <Input
                                    id='nombreMascota'
                                    fullWidth
                                    label='Nombre Mascota'
                                    name='nombreMascota'
                                    value={values.nombreMascota}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='nombre'
                                    label='Nombre Mascota'
                                    name='nombre'
                                    value={values.nombre}
                                    onChange={handleInputChange}
                                    items={positinItems}
                                    required
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fechaAplicacion'
                                fullWidth
                                label='Fecha de aplicación'
                                name='fechaAplicacion'
                                fecha={values.fechaAplicacion}
                                onChange={handleInputChangeDate}
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
