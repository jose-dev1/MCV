import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebarComponent'
import Botonera from '../../components/dash/botonera'
import { Maurisio } from '../../components/auxiliar/agregarCita'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId'
import AlertEliminar from '../../components/dash/alertEliminar'
import { Stack } from '@mui/material'
import BotonCam from '../../components/dash/botonCam'
import axios from 'axios'
import AlertPrincipal from '../../components/dash/alertPrincipal';

const columns = [
  {
    field: 'nombreDueño', headerName: 'Nombre Cliente', width: 200,
    valueGetter: (params) =>
      `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
  },
  { field: 'nombre_mascota', headerName: 'Nombre Mascota', width: 170 },
  {
    field: 'nombreEspecialista', headerName: 'Nombre Especialista', width: 200,
    valueGetter: (params) =>
      `${params.row.primer_nombre_empleado || ''} ${params.row.primer_apellido_empleado || ''}`
  },
  { field: 'descripcion_servicio', headerName: 'Servicio', width: 200 },
  { field: 'fecha_cita', headerName: 'Fecha', width: 130,
  valueGetter: (params) =>
  `${dayjs(params.row.fecha_cita).format('MM-DD-YYYY') || ''}`},
  { field: 'Hora_cita', headerName: 'Hora', width: 130 },
];

function GestionarAgenda() {
  const { selectId, saveSelectId } = useSelectId()
  const [dataMostrar, setDataMostrar] = useState([]);
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)
  const [dataVeterinario,setDataVeterinario] = useState([])
  const [dataGroomer,SetDataGroomer] = useState([])
  const [estadoBoton,setEstadoBoton] = useState(true)
  const [success,setSuccess] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/agendar/especialista/VET');
        setDataVeterinario(result.data);
      } catch (error) {
        setDataVeterinario([])
        error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor');
      }
      
      try {
        const result2 = await axios.get('http://localhost:4321/agendar/especialista/GRO');
        SetDataGroomer(result2.data);
      } catch (error) {
        SetDataGroomer([])
        error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor');
      }
    };
  
    fetchData();
  }, [actualizar]);
  
  useEffect(() => {
    if (estadoBoton) {
      setDataMostrar(dataVeterinario);
    } else {
      setDataMostrar(dataGroomer);
    }
  }, [estadoBoton, dataVeterinario, dataGroomer]);


  const handleCam = async (nom) => {
    nom === 'VET' ? setDataMostrar(dataVeterinario) : setDataMostrar(dataGroomer)
    nom === 'VET' ? setEstadoBoton(true) : setEstadoBoton(false)
  }


  return (
    <div className='flex gap-3'>
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
          title='Gestionar Agenda'
          agregar={<Maurisio
            icon={<PlusIcon className='w-6 h-6' />}
            tooltip='Agregar Cita'
            bgColor='secondary'
            label='Agregar Cita'
            actualizar= {setActualizar}
            dato={actualizar}
            id={null}
            successMessage={setSuccess}
            errorMessage={setError}/>
          }
          editar={
            <Maurisio
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Cita'
              bgColor='primary'
              label='Editar Cita'
              id={selectId}
              actualizar= {setActualizar}
              dato={actualizar}
              successMessage={setSuccess}
              errorMessage={setError}
            />
          }
          eliminar={<AlertEliminar 
            idSeleccionado={selectId} 
            tooltip='Desactivar Cita' 
            titulo='¿Desea desactivar la cita seleccionada?'
            endPoint='agendar/desabilitar'
            menssage='Por favor, especifique el motivo por el cual desea desactivar la cita. Tenga en cuenta que este cambio es irreversible.'
            actualizar= {setActualizar}
            dato={actualizar}/>}
        />
        <div className="flex">
          <BotonCam onData={() => handleCam('VET')} name='Veterinario' Boton={estadoBoton} />
          <BotonCam onData={() => handleCam('GRO')} name='Groomer' Boton={!estadoBoton} />
        </div>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        </div>
      </Stack>
      <AlertPrincipal severity='error' message={error}/>
      <AlertPrincipal severity='success' message={success}/>
    </div>
  )
}

export default GestionarAgenda