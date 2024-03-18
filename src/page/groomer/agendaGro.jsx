import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertEliminar from '../../components/dash/alertEliminar';


const columns = [
  {
    field: 'duenno',
    headerName: 'Propietario',
    width: 170,
    valueGetter: (params) => `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
  },
  {
    field: 'descripcion_servicio',
    headerName: 'Descripcion del servicio',
    width: 210
  },
  {
    field: 'nombre_mascota',
    headerName: 'Nombre Mascota',
    width: 170
  },
  {
    field: 'fecha_cita',
    headerName: 'Fecha de la cita',
    width: 140,
    valueGetter: (params) => new Date(params.row.fecha_cita).toLocaleDateString('es-ES')
  },
  {
    field: 'Hora_cita',
    headerName: 'Hora Cita',
    width: 140
  }
]


export default function AgendaGroomer() {
  const { selectId, saveSelectId } = useSelectId()
  const [usuario] = useState(JSON.parse(localStorage.getItem('user')));

  const [rows, setRows] = useState([])
  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(usuario.id_tipo_usuario)
        const response = await axios.get(`http://localhost:4321/agenda_groomer/mostrar/5`)
        setRows(response.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
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
          title='Gestiona tu Agenda'
          eliminar={<AlertEliminar
            idSeleccionado={selectId}
            tooltip='Cancelar Cita'
            titulo='¿Desea Cancelar la cita seleccionada?'
            endPoint='agendar/desabilitar'
            menssage='Por favor, especifique el motivo por el cual desea cancelar esta cita. Tenga en cuenta que este cambio es irreversible.'
            actualizar={setActualizar}
            dato={actualizar} />}
        />
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} />
      </Stack>
    </div>
  )
}
