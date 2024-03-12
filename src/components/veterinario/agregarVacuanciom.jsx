import dayjs from 'dayjs';
import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'
import InputTime from '../dash/inputTime';
import axios from 'axios';
import { useBringDocument } from '../../Hooks/useDocument';
import { useBringVacuna } from '../../Hooks/useVacuna';
import Message from '../dash/succesfulMessage';
import { getDataById } from '../../utils/getDataById';
import { useHabilitar } from '../../Hooks/useHabilitar';
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner';
import { getSpecialist } from '../../utils/getSpecialist';
import { getServisWithSpecialist } from '../../utils/getServisWithSpecialist';
import { dateFormater } from '../../utils/dateFormater';

const especialista = [
    { id: 4, value: 'Veterinario' },
    { id: 5, value: 'Groomer' }
]

const defaultValues = {
    id: '',
    fechaVacunaAplicada: dayjs(),
    fechaVencimiento: dayjs(),
    laboratorio: '',
    idTipoVacuna: '',
    idMascota: '',
    tipoDocumento: 'C.C',
    numeroDocumento: '',
    loteVacuna: ''
}

export const Maurisio = (props) => {
    const { label, id, bgColor, icon, tooltip, actualizar, dato } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');
    const [dataMoscota, setDataMascota] = useState([])
    const [dataEspecialista, setDataEspecialista] = useState([])
    const [dataServicio, setDataServicio] = useState([])
    const [tipoDocuemento] = useBringDocument()
    const { desabilitado, validarId } = useHabilitar({ id })
    const [tipoVacuna] = useBringVacuna()


    const reinicio = () => {
        setDataMascota([])
        setDataEspecialista([])
        setDataServicio([])
    }

    const handleModal = async () => {
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
        reinicio()
        setValues(defaultValues)
        setError('')
        setSuccess('')
        setOpen(false)
    }

    const handleSubmitId = async (event) => {
        event.preventDefault()
        try {
            const validation = emptyValidation({ DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento })
            setSuccess('')
            if (validation) {
                setError('Por favor, complete los campos nesesarios.');
                reinicio()
            }
            else {
                setError('')
                const getPets = await getPetsWithOwner({ DocumentType: values.tipoDocumento, DocumentNumber: values.numeroDocumento })
                if (getPets instanceof Error) throw new Error(getPets.response.data.message)
                setDataMascota(getPets)
                setSuccess('Datos cargados exitosamente.')
            }
        } catch (error) {
            reinicio()
            setError(`${error}`)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('')
        setSuccess('')
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
                const { fechaVacunaAplicada, fechaVencimiento, laboratorio, idTipoVacuna, idMascota, loteVacuna } = values
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
            setSuccess(response.data.message) 
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
                                    id='idDocumento'
                                    fullWidth
                                    label='Tipo de documento'
                                    name='tipoDocumento'
                                    value={values.id_tipo_documento}
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
                        <Grid item xs={12} sm={4}>
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
                                    disabled={(validarId || dataMoscota.length === 0) ? true : false}
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
