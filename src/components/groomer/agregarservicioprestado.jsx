import DataTable from '../../components/dash/dataTable'
import React, { useEffect, useState } from "react";
import useSelectId from '../../Hooks/useSelectId'
import Botonera from '../../components/dash/botonera'
import { FormServisGroomer } from '../../components/groomer/agregarDataServis';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaVer from './modalVerGroo';
import axios from 'axios';
import dayjs from 'dayjs';
import AlertEliminar from '../../components/dash/alertEliminar'
import AlertPrincipal from '../../components/dash/alertPrincipal';

const columns = [
    {
        field: 'nombreDueño',
        headerName: 'Nombre Cliente',
        width: 200,
        valueGetter: (params) =>
            `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    {
        field: 'fecha_servicio_groomer',
        headerName: 'Fecha',
        width: 180,
        valueGetter: (params) =>
            `${dayjs(params.row.fecha_servicio_groomer).format('MM-DD-YYYY HH:MM') || ''}`
    },
    { field: 'descripcion_servicio', headerName: 'Servicio', width: 170 },
    { field: 'nombre_mascota', headerName: 'Nombre mascota', width: 120 },
    {
        field: 'estado_servicio_groomer',
        headerName: 'Estado del servicio',
        width: 200,
        valueGetter: (params) => params.row.servicio_finalizado_groomer === 1 ? 'Finalizado' : 'En proceso'
    },
];


export default function VacunasRegistradas() {
    const { selectId, saveSelectId } = useSelectId()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [actualizar, setActualizar] = useState(false)
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const fectcData = async () => {
            try {
                const result = await axios.get('http://localhost:4321/groomer')
                setData(result.data)
            } catch (error) {
                setData([])
                error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
            }
        }

        fectcData()
    }, [actualizar])
    return (
        <>
            <Botonera
                title='Servicios registrados'
                agregar={<FormServisGroomer
                    icon={<PlusIcon className='w-6 h-6' />}
                    tooltip='Agregar Servicio'
                    bgColor='secondary'
                    id={null}
                    label='Agregar Servicio'
                    actualizar={setActualizar}
                    dato={actualizar}
                    successMessage={setSuccess}
                    errorMessage={setError}
                />

                }
                editar={
                    <FormServisGroomer
                        icon={<PencilSquareIcon className='w-6 h-6' />}
                        tooltip='Editar servicio'
                        bgColor='primary'
                        label='Editar Servicio'
                        id={selectId}
                        actualizar={setActualizar}
                        dato={actualizar}
                        successMessage={setSuccess}
                        errorMessage={setError}
                    />
                }
                ver={<AlertaVer idSeleccionado={selectId} tooltip='Ver' />}
                eliminar={<AlertEliminar
                    idSeleccionado={selectId}
                    tooltip='Desactivar Servicio'
                    titulo='¿Desea desactivar el servicio?'
                    endPoint='groomer/delete'
                    menssage='Por favor, especifique el motivo por el cual desea desactivar el servicio. Tenga en cuenta que este cambio es irreversible.'
                    actualizar={setActualizar}
                    dato={actualizar} />}
            />

            <DataTable rows={data} columns={columns} selectId={saveSelectId} />
            <AlertPrincipal severity='error' message={error} />
            <AlertPrincipal severity='success' message={success} />
        </>
    )
}
