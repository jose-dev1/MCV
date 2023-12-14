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

const serviciosRealizados = [
    { id: '1', value: 'Baño' },
    { id: '2', value: 'Corte de pelo' },
    { id: '3', value: 'Baño y cepillado' },
    { id: '4', value: 'Corte de uñas' },
    { id: '5', value: 'Baño y peluquería' }
];

const documentItems = [
    { id: 'C.C', value: 'Cedula de Ciudadania' },
    { id: 'C.E', value: 'Cedula de Extrangeria' }
]

const positinItems = [
    { id: 1, value: 'Max' },
    { id: 2, value: 'Chelsea' }
]

export const FormServisGroomer = (props) => {
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
                                name='tipo_documento'
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
                                desable={validarId ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Selects
                                id='tipo_servis'
                                label='Servicio'
                                name='tipo_servicio'
                                value={values.servicio}
                                onChange={handleInputChange}
                                items={serviciosRealizados}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {validarId ? (
                                <Input
                                    id='nombre'
                                    fullWidth
                                    label='Nombre Mascota'
                                    name='nombre'
                                    value={values.nombre}
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
                                id='fecha_servis'
                                fullWidth
                                label='Fecha'
                                name='fecha_servis'
                                fecha={values.fecha_creacion}
                                onChange={handleInputChangeDate}
                                disabled={validarId ? true : false}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {validarId && (
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Finalizar servicio</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="idestado"
                                        onChange={handleInputChangeDate}
                                        value={values.idestado}
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="Si" />
                                        <FormControlLabel value="1" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Input
                                id='nota'
                                fullWidth
                                label='Nota'
                                name='nota'
                                value={values.nota}
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
