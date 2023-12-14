import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import AlertaCanceclarCita from '../../components/veterinario/alertCancelarCita';
import Stack from '@mui/material/Stack';

const columns = [
    { 
      field: 'duenno', 
      headerName: 'Propietario',
      width: 170,
      valueGetter: (params) => `${params.row.primer_nombre || ''} ${params.row.primer_apellido || ''}`
    },
    { 
      field: 'descripcion', 
      headerName: 'Descripcion', 
      width: 210 
    },
    { 
      field: 'nombre', 
      headerName: 'Nombre Cliente', 
      width: 170 
    },
    { 
      field: 'tipoEspecie', 
      headerName: 'Especie', 
      width: 140 
    },
    { 
      field: 'horaCita', 
      headerName: 'Hora Cita', 
      width: 140 
    },
    { 
      field: 'idEstadoValor', 
      headerName: 'Asistencia', 
      width: 140 
    },
]
  
const rows = [
    { 
        id: 1, 
        nombre: 'Max', 
        idestado: 1, 
        primer_nombre: 'Juan', 
        primer_apellido: 'Pérez', 
        idTipoEspecie: 0, 
        tipoEspecie: 'Perro', 
        descripcion: 'Baño', 
        horaCita: '10:00 AM', 
        idEstado: 1, 
        idEstadoValor: 'Si' },
    { 
      id: 2, 
      nombre: 'Whiskers', 
      idestado: 0, 
      primer_nombre: 'María', 
      primer_apellido: 'López', 
      idTipoEspecie: 1,
      tipoEspecie: 'Gato', 
      descripcion: 'Sepillado', 
      horaCita: '11:30 AM', 
      idEstado: 0, 
      idEstadoValor: 'No' },
    { 
      id: 3, 
      nombre: 'Buddy', 
      idestado: 0, 
      primer_nombre: 'Carlos', 
      primer_apellido: 'Gómez', 
      idTipoEspecie: 0, 
      tipoEspecie: 'Perro', 
      descripcion: 'Baño y sepillado', 
      horaCita: '02:15 PM', 
      idEstado: 1, 
      idEstadoValor: 'Si' },
    { 
      id: 4, 
      nombre: 'Mittens', 
      idestado: 0, 
      primer_nombre: 'Laura', 
      primer_apellido: 'Martínez', 
      idTipoEspecie: 1, 
      tipoEspecie: 'Gato', 
      descripcion: 'Corte de pelo', 
      horaCita: '03:45 PM', 
      idEstado: 0, 
      idEstadoValor: 'No' 
    },
    { 
      id: 5, 
      nombre: 'Rocky', 
      idestado: 1, 
      primer_nombre: 'Pedro', 
      primer_apellido: 'Rodríguez', 
      idTipoEspecie: 0, 
      tipoEspecie: 'Perro', 
      descripcion: 'Corte de uñas', 
      horaCita: '09:30 AM', 
      idEstado: 1, 
      idEstadoValor: 'Si' 
    },
    { 
      id: 6, 
      nombre: 'Misty', 
      idestado: 0, 
      primer_nombre: 'Ana', 
      primer_apellido: 'Sánchez', 
      idTipoEspecie: 1, 
      tipoEspecie: 'Gato', 
      descripcion: 'Corte de pelo', 
      horaCita: '01:00 PM', 
      idEstado: 0, 
      idEstadoValor: 'No' },
    { 
      id: 7, 
      nombre: 'Charlie', 
      idestado: 1, 
      primer_nombre: 'Mario', 
      primer_apellido: 'Fernández', 
      idTipoEspecie: 0, 
      tipoEspecie: 'Perro', 
      descripcion: 'Baño completo', 
      horaCita: '11:45 AM', 
      idEstado: 1, 
      idEstadoValor: 'Si' },
    { 
      id: 8, 
      nombre: 'Luna', 
      idestado: 0, 
      primer_nombre: 'Isabel', 
      primer_apellido: 'Díaz', 
      idTipoEspecie: 1, 
      tipoEspecie: 'Gato', 
      descripcion: 'Corte de pelo', 
      horaCita: '04:30 PM', 
      idEstado: 0, idEstadoValor: 'No' },
    { 
      id: 9, 
      nombre: 'Maximus', 
      idestado: 1, 
      primer_nombre: 'Héctor', 
      primer_apellido: 'Luna', 
      idTipoEspecie: 0, 
      tipoEspecie: 'Perro', 
      descripcion: 'Corte de uñas', 
      horaCita: '02:00 PM', 
      idEstado: 1, idEstadoValor: 'Si' },
    { 
      id: 10, 
      nombre: 'Oliver', 
      idestado: 0, 
      primer_nombre: 'Elena', 
      primer_apellido: 'García', 
      idTipoEspecie: 1, 
      tipoEspecie: 'Gato', 
      descripcion: 'Baño', 
      horaCita: '10:45 AM', 
      idEstado: 0, 
      idEstadoValor: 'No' }
];

export default function AgendaGroomer() {
  const {selectId, saveSelectId} = useSelectId()
  const {saveSelectRow} = useSelectRow()

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
          editar={
            <AlertaCanceclarCita idSeleccionado={selectId} tooltip={'Cancelar cita'}/>
          }/>
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
        </Stack>
    </div>
  )
}
