import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EyeIcon } from "@heroicons/react/24/outline";
import AlertPrincipal from '../../components/dash/alertPrincipal';
import { HistoriaClinica } from '../../components/veterinario/historiaClinica';
import Sidebar from '../../components/sidebarComponent'
const columns = [
    {
        field: 'nombreDueño',
        headerName: 'Nombre Cliente',
        width: 200,
        valueGetter: (params) =>
            `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    { field: 'descripcion_documento', headerName: 'Tipo documento', width: 180 },
    { field: 'numero_documento_cliente', headerName: 'Numero documento', width: 140 },
    { field: 'nombre_mascota', headerName: 'Nombre mascota', width: 140 },
    { field: 'fecha_creacion', headerName: 'Fecha de registro', width: 140, valueGetter: (params) => new Date(params.row.fecha_creacion).toLocaleDateString('es-ES') },
];

export default function ServicioMascota() {
    const { selectId, saveSelectId } = useSelectId()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        const fectchData = async () => {
            setError('')
            try {
                const result = await axios.get('http://localhost:4321/historia_clinica/get_historial')
                setData(result.data)
            } catch (error) {
                setData([])
                error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
            }
        }
        fectchData()
    }, [])



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
                    title='Historia Clinica'
                    ver={<HistoriaClinica
                        id={selectId}
                        bgColor="secondary"
                        icon={<EyeIcon className="w-6 h-6" />}
                        tooltip='Visualizar Historia Clinica'
                    />}
                />
                <DataTable rows={data} columns={columns} selectId={saveSelectId} />
            </Stack>
            <AlertPrincipal severity='error' message={error} />
        </div>
    )
}
