import { Grid, Modal } from '@mui/material'
import useForm from '../../Hooks/useForm'
import Input from '../admin/Input'
import Selects from '../admin/Selects'
import { useEffect, useState } from 'react'
import Boton from '../dash/boton'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import InputDate from '../dash/inputDate'
import TextArea from '../dash/textArea'
import dayjs from 'dayjs'
import { MenuItem, Select } from '@mui/material'
import axios from 'axios';
import { useBringDocument } from '../../Hooks/useDocument';
import { getDataById } from '../../utils/getDataById';
import { emptyValidation, getPetsWithOwner } from '../../utils/getPetsWithOwner';
import { useHabilitar } from '../../Hooks/useHabilitar';
import Message from '../dash/succesfulMessage'
import { useTypeDespa } from '../../Hooks/useDespaType'


const defaultValues = {
    idMascota: '',
    numeroDocumento: '',
    tipoDocumento: 'C.C',
    idTipoDesparacitacion: '',
    fecha_aplicacion_desparacitacion: dayjs(),
    fecha_vencimiento_desparacitacion: dayjs(),
    medicamento_aplicado: '',
    lote_desparacitacion: '',
    registro_ica: '',
    laboratorio_desparacitacion: '',
    estado_desparacitacion: 1,
}

export const FromAgregarDesparacitacion = (props) => {
    const { label, bgColor, icon, tooltip, id, actualizar, dato } = props
    const { values, setValues, handleInputChange, handleInputChangeDate } = useForm(defaultValues)
    const [dataMascota, setDataMascota] = useState([])
    const [despaTypes] = useTypeDespa();
    const [selectedDespaType, setSelectedDespaType] = useState('');
    const { desabilitado, validarId } = useHabilitar({ id })
    const [tipoDocuemento] = useBringDocument()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [open, setOpen] = useState(false)

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
        setError('');
        setSuccess('');
        try {
            let endpoint = 'http://localhost:4321/desparasitacion';
            let httpMethod = 'post';
            let envio = {};
            if (id !== null && id) {
                const { fecha_aplicacion_desparacitacion: fechaAplicacionDesparacitacion,
                    fecha_vencimiento_desparacitacion: fechaVencimientoDesparacitacion,
                    lote_desparacitacion: loteDesparacitacion,
                    laboratorio_desparacitacion: laboratorioDesparacitacion,
                    medicamento_aplicado: medicamentoAplicado,
                    registro_ica: registroIca } = values;
                envio = {
                    fechaAplicacionDesparacitacion,
                    fechaVencimientoDesparacitacion,
                    loteDesparacitacion,
                    laboratorioDesparacitacion,
                    medicamentoAplicado,
                    registroIca,

                };
                endpoint += `/actualizar_desparasitacion/${values.id}`;
                httpMethod = 'put';
            } else {
                const { idMascota, idTipoDesparacitacion, medicamento_aplicado, lote_desparacitacion, registro_ica, laboratorio_desparacitacion, anotacion_desparacitacion } = values
                envio = {
                    idMascota,
                    idTipoDesparacitacion,
                    medicamento_aplicado,
                    lote_desparacitacion,
                    registro_ica,
                    laboratorio_desparacitacion,
                    anotacion_desparacitacion
                };
                endpoint += '/crear_desparasitacion';

            }
            const response = await axios[httpMethod](endpoint, envio);
            setSuccess(response.data.message);
            actualizar(!dato);
        } catch (error) {
            setError(`Error: ${error.response.data.message}`);
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
                                    items={dataMascota}
                                    disabled={(validarId || dataMascota.length === 0) ? true : false}
                                    required
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {validarId ? (
                                <Input
                                    id='idTipoDesparacitacion'
                                    fullWidth
                                    label='Tipo de Desparacitación'
                                    name='idTipoDesparacitacion'
                                    value={values.id_tipo_desparacitacion}
                                    onChange={handleInputChange}
                                    disabled={true}
                                    required
                                />
                            ) : (
                                <Selects
                                    id='idTipoDesparacitacion'
                                    label='Desparacitacion'
                                    name='idTipoDesparacitacion'
                                    value={values.idTipoDesparacitacion}
                                    onChange={handleInputChange}
                                    items={despaTypes}
                                    disabled={(validarId || dataMascota.length === 0) ? true : false}
                                    required
                                />
                            )}
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

