import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { VerVacunasMascota } from './verVacunasMascota';
import { EyeIcon } from "@heroicons/react/24/outline";
import AlertPrincipal from '../../components/dash/alertPrincipal';
import Swal from "sweetalert2";
import Boton from "../../components/dash/boton";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { DescargaCarnet } from './descargarVacuan';

const columns = [
    {
        field: 'identificacionCliente',
        headerName: 'Identificacion Cliente',
        width: 200,
        valueGetter: (params) =>
            `${params.row.id_tipo_documento || ''} ${params.row.numero_documento_cliente || ''}`
    },
    {
        field: 'nombreDueño',
        headerName: 'Nombre Cliente',
        width: 200,
        valueGetter: (params) =>
            `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    { field: 'nombre_mascota', headerName: 'Nombre mascota', width: 140 },
    { field: 'tipo_mascota', headerName: 'Tipo mascota', width: 140 },
    { field: 'peso_mascota', headerName: 'Peso mascota', width: 140 },
    { field: 'tamanno_mascota', headerName: 'Tamaño mascota', width: 140 },
];

function AlertaDescargar(props) {
    const { idSeleccionado, tooltip } = props
    const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)

    useEffect(() => {
        setDesabilitado(idSeleccionado.length === 0)
    }, [idSeleccionado, setDesabilitado])

    const handleClick = () => {
        Swal.fire({
            title: '¿Deseas descargar el certificado?',
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Descargando el certificado", "", "success");
            } else if (result.isDenied) {
                Swal.fire("No se ha descargado el certificado", "", "error");
            }
        });
    }

    return (
        <>
            <Boton
                bgColor='success'
                icon={<DocumentArrowDownIcon className='w-6 h-6' />}
                tooltip={tooltip}
                onClick={handleClick}
                desable={desabilitado}
            />
        </>
    )
}



export default function AddEmploye() {
    const { selectId, saveSelectId } = useSelectId()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        const fectchData = async () => {
            setError('')
            try {
                const result = await axios.get('http://localhost:4321/carnet/mascotas')
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
                    title='Gestionar Carnet Vacunas'
                    ver={<VerVacunasMascota
                        id={selectId}
                        bgColor="secondary"
                        icon={<EyeIcon className="w-6 h-6" />}
                        tooltip='Visualizar Vacunas'
                    />}

                    descarga={<DescargaCarnet
                        selectId={selectId}
                        tooltip='Descargar Vacunas'
                        bgColor='success'
                        icon={<DocumentArrowDownIcon className='w-6 h-6' />}
                    />}
                />
                <DataTable rows={data} columns={columns} selectId={saveSelectId} />
            </Stack>
            <AlertPrincipal severity='error' message={error} />
        </div>
    )
}
