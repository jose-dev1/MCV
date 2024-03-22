import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Boton from '../dash/boton';
import DataTable from '../../components/dash/dataTable';
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera';
import { DescargarHistoria } from './DescargarHistoria';
import axios from 'axios';
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import AlertPrincipal from '../../components/dash/alertPrincipal';

const columns = [
    { field: 'fecha_servicio_groomer', headerName: 'Fecha del servicio', width: 150, valueGetter: (params) => new Date(params.row.fecha_servicio_groomer).toLocaleDateString('es-ES') },
    { field: 'anotacion_servicio_groomer', headerName: 'Anotacion del servicio', width: 250 },
    { field: 'contenido_servicio_groomer', headerName: 'Contenido del servicio', width: 250 },
    { field: 'descripcion_servicio', headerName: 'Servicios prestados', width: 250 },
    { field: 'registro_historia_clinica_finalizado', headerName: 'Servicio finalizado', width: 150, valueGetter: (params) => params.row.registro_historia_clinica_finalizado === 1 ? 'Servicio Finalizado' : 'Servicio en proceso' },
]

export default function ServiciosGroomer(props) {
    const { bgColor, icon, tooltip, id, name } = props;
    const [open, setOpen] = useState(false);
    const { selectId, saveSelectId } = useSelectId();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    const handleModal = async () => {
        try {
            setSuccess('');
            setError(null);
            const result = await axios.get(`http://localhost:4321/info_mascotas/serviciosGroo/${id}`);
            setData(result.data);
        } catch (error) {
            setError(error);
        }
        setOpen(true);
    }

    const handleClose = () => {
        saveSelectId('');
        setOpen(false);
    }

    return (
        <div>
            <Boton
                onClick={handleModal}
                bgColor={bgColor}
                icon={icon}
                tooltip={tooltip}
            />

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='min-h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-black rounded-lg shadow p-4 bg-white'>
                    <Botonera
                        title={`Servicios groomer prestado a ${name}`}
                    />
                    <DataTable rows={data} columns={columns} selectId={saveSelectId} />
                    <AlertPrincipal severity='error' message={error && error.message} />
                    <AlertPrincipal severity='success' message={success && success.message} />
                </div>
            </Modal>

        </div>
    );
}
