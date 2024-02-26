import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebarComponent'
import Botonera from '../../components/dash/botonera'
import { Maurisio } from '../../components/auxiliar/agregarCita'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import AlertaEliminar from '../../components/dash/alertaEliminar'
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion'
import { Stack } from '@mui/material'
import BotonCam from '../../components/dash/botonCam'
import axios from 'axios'

const columns = [
  { field: 'nombre_mascota', headerName: 'Nombre Cliente', width: 180 },
  {
    field: 'nombreDueño', headerName: 'Nombre Mascota', width: 200,
    valueGetter: (params) =>
      `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
  },
  { field: 'descripcion_servicio', headerName: 'Servicio', width: 180 },
  { field: 'fecha_cita', headerName: 'Fecha', width: 180 },
  { field: 'Hora_cita', headerName: 'Hora', width: 190 },
];

const defaultValues = {
  id: '',
  fechaCita: dayjs(),
  horaCita: '',
  idEmpleado: '',
  idServicio: '',
  idMacota: '',
  especialista: '',
  tipoDocumento: 'C.C',
  numeroDocumento: '',
  nombreMascota: ''
}

function GestionarAgenda() {
  const { selectId, saveSelectId } = useSelectId()
  const { selectRow, saveSelectRow } = useSelectRow()
  const [dataMostrar, setDataMostrar] = useState([]);
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
    const fectchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/agendar/especialista/VET')
        setDataMostrar(result.data)
      } catch (error) {
        setError('Error' + error.message)
      }
    }
    fectchData()
  }, [actualizar])


  const handleCam = async (nom) => {
    try {
      const result = await axios.get(`http://localhost:4321/agendar/especialista/${nom}`)
      setDataMostrar(result.data)
    } catch (error) {
      setError('Error' + error.message)
    }
    console.log(nom)
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
            datosEditables={defaultValues}
            icon={<PlusIcon className='w-6 h-6' />}
            tooltip='Agregar Cita'
            bgColor='secondary'
            label='Agregar Cita' />
          }
          editar={
            <Maurisio
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Cita'
              bgColor='primary'
              label='Editar Cita'
              datosEditables={selectRow}
            />
          }
          eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Desactivar Examen' />}
        />
        <div className="flex">
          <BotonCam onData={() => handleCam('VET')} name='Veterinario' />
          <BotonCam onData={() => handleCam('GRO')} name='Groomer' />
        </div>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        </div>
      </Stack>
    </div>
  )
}



export default GestionarAgenda