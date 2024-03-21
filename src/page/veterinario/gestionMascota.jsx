import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import AlertPrincipal from '../../components/dash/alertPrincipal';
import Sidebar from '../../components/sidebarComponent'
import AlertEliminar from '../../components/dash/alertEliminar'
import { FromGestionarMascota } from '../../components/veterinario/gestionarMascota';
const columns = [
    {
        field: 'nombreDueño',
        headerName: 'Nombre Cliente',
        width: 200,
        valueGetter: (params) =>
            `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    { field: 'nombre_mascota', headerName: 'Nombre mascota', width: 180 },
    { field: 'raza_mascota', headerName: 'Raza', width: 180 },
    { field: 'color_mascota', headerName: 'Color', width: 140 },
    { field: 'anotacion_mascota', headerName: 'Anotacion', width: 140 },
];

export default function GestionMascota() {
    const { selectId, saveSelectId } = useSelectId()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState('')
    const [actualizar, setActualizar] = useState(false)
    useEffect(() => {
        const fectchData = async () => {
            setError('')
            try {
                const result = await axios.get('http://localhost:4321/info_mascotas')
                setData(result.data)
            } catch (error) {
                setData([])
                setError('Error al conectar con el servidor')
            }
        }
        fectchData()
    }, [actualizar])



    return (
        <div className='flex gap-9'>
            <Sidebar />
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
                    title='Gestionar Mascota'
                    editar={
                        <FromGestionarMascota
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Editar Mascota'
                            bgColor='secondary'
                            label='Editar Mascota'
                            actualizar={setActualizar}
                            dato={actualizar}
                            id={selectId}
                            successMessage={setSuccess}
                            errorMessage={setError} />

                    }
                    eliminar={<AlertEliminar
                        idSeleccionado={selectId}
                        tooltip='Desactivar Examen'
                        titulo='¿Desea desactivar la mascota seleccionada?'
                        endPoint='gestionar_mascotas/delete'
                        menssage='Por favor, especifique el motivo por el cual desea desactivar la mascota. Tenga en cuenta que este cambio es irreversible.'
                        actualizar={setActualizar}
                        dato={actualizar} />}
                />
                <DataTable rows={data} columns={columns} selectId={saveSelectId} />
            </Stack>
            <AlertPrincipal severity='error' message={error} />
        </div>
    )
}
