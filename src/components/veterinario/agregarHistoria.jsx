import { Alert, Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { TextField } from '@mui/material';
import InputDate from '../dash/inputDate'



const documentItems = [
    { id: 'C.C', value: 'Cedula de Ciudadania' },
    { id: 'C.E', value: 'Cedula de Extrangeria' }
]

const especieItem = [
    { id: 1, value: 'Gato' },
    { id: 2, value: 'Perro' },
]

const razaItem = [
    { id: 1, value: 'Siberiano' },
    { id: 2, value: 'Tigrillo' },
    { id: 3, value: 'otro' },
]

const sexoItem = [
    { id: 1, value: 'Macho' },
    { id: 2, value: 'Hembra' },
]

const colorItem = [
    { id: 1, value: 'Negro' },
    { id: 2, value: 'Amarillo' },
    { id: 3, value: 'Gris' },
    { id: 4, value: 'Blanco' },
    { id: 5, value: 'Negro y gris' },

]

export const FormAgregarHistoriaClinica = (props) => {
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
                                name='tipo_documento'
                                value={values.tipo_documento}
                                onChange={handleInputChange}
                                items={documentItems}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <Input
                                id='nombre'
                                label='Nombre Mascota'
                                name='nombre'
                                value={values.nombre}
                                disabled={false}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='especie'
                                label='Especie'
                                name='especie'
                                value={values.especie}
                                onChange={handleInputChange}
                                items={especieItem}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='raza'
                                label='Raza'
                                name='raza'
                                value={values.raza}
                                onChange={handleInputChange}
                                items={razaItem}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='color'
                                label='Color'
                                name='color'
                                value={values.color}
                                onChange={handleInputChange}
                                items={colorItem}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Selects
                                id='sexo'
                                label='Sexo'
                                name='sexo'
                                value={values.sexo}
                                onChange={handleInputChange}
                                items={sexoItem}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputDate
                                id='fecha_creacion'
                                fullWidth
                                label='Fecha ingreso'
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
                                    id="observacionesAgregadas"
                                    label="Observaciones Agegadas Anteriormente"
                                    name="observacionesAgregadas"
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
