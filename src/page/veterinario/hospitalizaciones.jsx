import { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import { FormAgregarHozpitalizaciones } from '../../components/veterinario/agregarHospitalziacionCoomponent';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import dayjs from 'dayjs';

const columns = [
  {
    field: 'nombreDueño', headerName: 'Nombre Cliente', width: 200,
    valueGetter: (params) =>
      `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
  },
  { field: 'nombre_mascota', headerName: 'Nombre Paciente', width: 170 },
  {
    field: 'telefono_cliente', headerName: 'Telefono contacto', width: 200
  },
  { field: 'fecha_hospitalizacion', headerName: 'Fecha ingreso', width: 130,
  valueGetter: (params) =>
  `${dayjs(params.row.fecha_hospitalizacion).format('MM-DD-YYYY') || ''}`},
  { field: 'servicioFinalizado', headerName: 'Servicio Finalizado', width: 200
  ,
  valueGetter: (params) =>
  `${params.row.servicio_finalizado_hospitalizacion === 0 ? 'No' : 'Si'}` },
];

export default function Hospitalizaciones () {

  const { selectId, saveSelectId } = useSelectId()
  const [dataMostrar, setDataMostrar] = useState([]);
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/hospitalizaciones');
        setDataMostrar(result.data)
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };
  
    fetchData();
  }, [actualizar]);

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
          title='Hospitalizaciones registradas'
          agregar={<FormAgregarHozpitalizaciones
            icon={<PlusIcon className='w-6 h-6' /> }
            tooltip='Agregar Hospitalización'
            bgColor='secondary'
            label='Agregar Hospitalización'
            actualizar= {setActualizar}
            dato={actualizar}
            id={null}/>}
          editar={
            <FormAgregarHozpitalizaciones 
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Hospitalización'
              bgColor='primary'
              label='Editar Hospitalización'
              id={selectId}
              actualizar= {setActualizar}
              dato={actualizar}
            />
          } 
          eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Hospitalización'/>}
        />
        <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        </Stack>
    </div>
  )
}
