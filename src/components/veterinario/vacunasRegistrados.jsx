import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { Maurisio } from '../../components/veterinario/agregarVacuanciom'
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Stack from '@mui/material/Stack';
import AlertaVer from '../../components/admin/modalVerAdmin'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AlertEliminar from '../../components/dash/alertEliminar';



const columns = [
    {
        field: 'nombreDueño',
        headerName: 'Nombre Cliente',
        width: 200,
        valueGetter: (params) =>
            `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    { field: 'nombre_mascota', headerName: 'Nombre mascota', width: 140 },
    { field: 'tipo_mascota', headerName: 'Tipo mascota', width: 140 },
    { field: 'laboratorio', headerName: 'Laboratorio', width: 170 },
    { field: 'nombre_vacuna', headerName: 'Nombre mascota', width: 260 },
    {
        field: 'estado_vacuna_aplicada', headerName: 'Estado', width: 130,
        valueGetter: (params) =>
            `${params.row.estado_vacuna_aplicada === 1 ? 'Activo' : 'Desactivado'}`
    }
];



export default function AddEmploye() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow } = useSelectRow()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [actualizar, setActualizar] = useState(false)
    useEffect(() => {
        const fectchData = async () => {
            try {
                const result = await axios.get('http://localhost:4321/carnet/ver')
                setData(result.data)
            } catch (error) {
                setError('Error' + error.message)
            }
        }
        fectchData()
    }, [actualizar])



    return (
        <div className='flex gap-9'>
            <Stack
                spacing={2}
                sx={{
                    position: 'fixed',
                    top: 10,
                    right: 6,
                    bottom: 5,
                    left: 'calc(22% + 3px)',
                    p: [2, 3, 4],
                    width: '77%',
                    display: 'flex',
                    overflow: 'auto'
                }}
            >

                <Botonera
                    title='Gestionar Vacuna'
                    agregar={<Maurisio
                        icon={<PlusIcon className='w-6 h-6' />}
                        tooltip='Agregar vacuna'
                        bgColor='secondary'
                        label='Agregar Empleado'
                        actualizar={setActualizar}
                        dato={actualizar}
                        id={null} />}
                    editar={
                        <Maurisio
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Editar Empleado'
                            bgColor='primary'
                            label='Editar empleado'
                            datosEditables={selectRow}
                            actualizar={setActualizar}
                            dato={actualizar}
                            id={selectId}
                        />
                    }
                    eliminar={<AlertEliminar
                        idSeleccionado={selectId}
                        tooltip='Desactivar vacuna'
                        titulo='¿Desea desactivar la vacuna seleccionada?'
                        endPoint='carnet/delete'
                        menssage='Por favor, especifique el motivo por el cual desea desactivar esta vacuna. Tenga en cuenta que este cambio es irreversible.'
                        actualizar={setActualizar}
                        dato={actualizar} />}
                />
                <DataTable rows={data} columns={columns} selectId={saveSelectId} />
            </Stack>
        </div>
    )
}
