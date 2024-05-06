import { Modal } from '@mui/material'
import { useState, useEffect } from 'react'
import Boton from '../dash/boton'
import { useHabilitar } from '../../Hooks/useHabilitar';
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import AlertEliminar from '../../components/dash/alertEliminar';
import dayjs from 'dayjs';
import AlertPrincipal from '../../components/dash/alertPrincipal';
import { FormAgregarHistoriaClinica } from './agregarHistoria'
import { VerHistorialServicio } from '../../components/veterinario/verHistorialServicio';
import { EyeIcon } from "@heroicons/react/24/outline";

const columns = [
    {
        field: 'fecha_registro_historia_clinica', headerName: 'Fecha de historial', width: 150, valueGetter: (params) =>
            `${dayjs(params.row.fecha_registro_historia_clinica).format('MM-DD-YYYY')}`
    },
    { field: 'descripcion_servicio', headerName: 'Servicios prestados', width: 250 },
    { field: 'registro_historia_clinica_finalizado', headerName: 'Servicio finalizado', width: 150, valueGetter: (params) => params.row.registro_historia_clinica_finalizado === 1 ? 'Servicio Finalizado' : 'Servicio en proceso' },
];

export const HistoriaClinica = (props) => {
    const { id, bgColor, icon, tooltip } = props
    const [open, setOpen] = useState(false)
    const { desabilitado } = useHabilitar({ id })
    const { selectId, saveSelectId } = useSelectId()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [actualizar, setActualizar] = useState(false)
    const [success, setSuccess] = useState('')
    const [tablavisible, setTablavisible] = useState('')


    useEffect(() => {
        const fectchData = async () => {
            try {
                const result = await axios.get(`http://localhost:4321/info_mascotas/historial/${id}`)
                setData(result.data)
            } catch (error) {
                setData([])
                error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
            }
        }
        if (id) fectchData()
    }, [actualizar])

    const handleModal = async () => {
        try {
            setSuccess('')
            setError('')
            const result = await axios.get(`http://localhost:4321/info_mascotas/historial/${id}`)
            setData(result.data)
        } catch (error) {
            setData([])
            error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
        }
        setOpen(true)
    }


    const handleClose = () => {
        saveSelectId('')
        setOpen(false)
        setTablavisible(false)

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
                <div className='min-h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-black rounded-lg shadow p-4 bg-white'>
                    <Botonera
                        title='Asignar servicio '
                        agregar={<FormAgregarHistoriaClinica
                            icon={<PlusIcon className='w-6 h-6' />}
                            tooltip='Agregar servicio'
                            bgColor='secondary'
                            label='Agregar servicio'
                            actualizar={setActualizar}
                            dato={actualizar}
                            id={null}
                            idHistoria={id}
                            successMessage={setSuccess}
                            errorMessage={setError}
                        />}

                        editar={
                            <FormAgregarHistoriaClinica
                                icon={<PencilSquareIcon className='w-6 h-6' />}
                                tooltip='Editar servicio'
                                bgColor='primary'
                                label='Editar servicio'
                                actualizar={setActualizar}
                                dato={actualizar}
                                id={selectId}
                                idHistoria={id}
                                successMessage={setSuccess}
                                errorMessage={setError}
                            />
                        }
                        eliminar={<AlertEliminar
                            idSeleccionado={selectId}
                            tooltip='Desactivar servicio'
                            titulo='¿Desea desactivar el servicio seleccionado?'
                            endPoint='historia_clinica/delete'
                            menssage='Por favor, especifique el motivo por el cual desea desactivar este servicio. Tenga en cuenta que este cambio es irreversible.'
                            actualizar={setActualizar}
                            dato={actualizar}
                        />

                        }
                        ver={<VerHistorialServicio
                            id={selectId}
                            tooltip='Ver Observaciones'
                            icon={<EyeIcon className="w-6 h-6" />}
                            bgColor='success'
                            saveError={setError}
                        />}
                    />
                    <DataTable rows={data} columns={columns} selectId={saveSelectId} />
                    <AlertPrincipal severity='error' message={error} />
                    <AlertPrincipal severity='success' message={success} />
                </div>
            </Modal>
        </div>
    )
}
