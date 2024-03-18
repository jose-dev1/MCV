import { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import { FormAgregarHozpitalizaciones } from '../../components/veterinario/agregarHospitalziacionCoomponent';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertEliminar from '../../components/dash/alertEliminar'
import Stack from '@mui/material/Stack';
import axios from 'axios';
import dayjs from 'dayjs';
import AlertPrincipal from '../../components/dash/alertPrincipal';
import { VerInfoHospitalizacion } from '../../components/veterinario/verHospitalizacion';
import { EyeIcon } from "@heroicons/react/24/outline";
const columns = [
  {
    field: 'nombreDueño', headerName: 'Nombre Cliente', width: 230,
    valueGetter: (params) =>
      `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
  },
  { field: 'nombre_mascota', headerName: 'Nombre Paciente', width: 200 },
  {
    field: 'telefono_cliente', headerName: 'Telefono contacto', width: 230
  },
  { field: 'fecha_hospitalizacion', headerName: 'Fecha ingreso', width: 160,
  valueGetter: (params) =>
  `${dayjs(params.row.fecha_hospitalizacion).format('MM-DD-YYYY')}`},
  { field: 'fecha_salida', headerName: 'Fecha salida', width: 160,
  valueGetter: (params) =>
  `${params.row.fecha_salida_hospitalizacion? dayjs(params.row.fecha_salida_hospitalizacion).format('MM-DD-YYYY'):'Ahun ingresado'}`},
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
  const [success,setSuccess] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/hospitalizaciones');
        setDataMostrar(result.data)
      } catch (error) {
        setDataMostrar([])
        error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
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
            id={null}
            successMessage={setSuccess}
            errorMessage={setError}/>}
          editar={
            <FormAgregarHozpitalizaciones 
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Hospitalización'
              bgColor='primary'
              label='Editar Hospitalización'
              id={selectId}
              actualizar= {setActualizar}
              dato={actualizar}
              successMessage={setSuccess}
              errorMessage={setError}
            />
          } 
          eliminar={<AlertEliminar 
            idSeleccionado={selectId} 
            tooltip='Desactivar Hospitalizacion' 
            titulo='¿Desea desactivar la hospitalizacion?'
            endPoint='hospitalizaciones/delete'
            menssage='Por favor, especifique el motivo por el cual desea desactivar la hospitalizacion. Tenga en cuenta que este cambio es irreversible.'
            actualizar= {setActualizar}
            dato={actualizar}/>}
          ver={<VerInfoHospitalizacion 
            id={selectId} 
            tooltip='Ver hospitalizacion'
            icon={<EyeIcon className="w-6 h-6" />}
            bgColor='success'
            saveError={setError}
            />}
          />
        <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        </Stack>
        <AlertPrincipal severity='error' message={error}/>
        <AlertPrincipal severity='success' message={success}/>
    </div>
  )
}
