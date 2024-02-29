import DataTable from '../../components/dash/dataTable'
import React, { useEffect, useState } from "react";
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import Botonera from '../../components/dash/botonera'
import { FormServisGroomer } from '../../components/groomer/agregarDataServis';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaVer from './modalVerGroo';
import axios from 'axios';
import dayjs from 'dayjs';
import AlertEliminar from '../../components/dash/alertEliminar'

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
        valueGetter: (params) => params.row.estado_servicio_groomer === 1 ? 'Finalizado' : 'En proceso'
    },
];


export default function VacunasRegistradas() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [actualizar, setActualizar] = useState(false)

    useEffect(() => {
        const fectcData = async () => {

            try {
                const result = await axios.get('http://localhost:4321/groomer')
                setData(result.data)
            } catch (error) {
                setError('Error', error.message)
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
                    />
                }
                //  eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Servicio' />}
                ver={<AlertaVer idSeleccionado={selectId} tooltip='Ver' />}
                eliminar={<AlertEliminar
                    idSeleccionado={selectId}
                    tooltip='Desactivar Servicio'
                    titulo='¿Desea desactivar la cita seleccionada?'
                    endPoint='groomer/delete'
                    menssage='Por favor, especifique el motivo por el cual desea desactivar la cita. Tenga en cuenta que este cambio es irreversible.' 
                    actualizar={setActualizar}
                    dato={actualizar}/>}
            />

            <DataTable rows={data} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
        </>
    )
}
