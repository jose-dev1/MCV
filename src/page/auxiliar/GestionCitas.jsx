import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import AlertaActivarCita from '../../components/auxiliar/verificarCitaComponent';

const columns = [
    { field: 'nombre', headerName: 'Nombre del Paciente', width: 170 },
    { field: 'tipoEspecie', headerName: 'Especie', width: 130 },
    {
      field: 'duenno',
      headerName: 'Propietario',
      width: 160,
      valueGetter: (params) =>
        `${params.row.primer_nombre || ''} ${params.row.primer_apellido || ''}`
    },
    { field: 'descripcion', headerName: 'Descripcion', width: 160 },
    { field: 'horaCita', headerName: 'Hora Cita', width: 130 },
    { field: 'idEstadoValor', headerName: 'Asistencia', width: 130 },
  ]
  
  const rows = [
    { id: 1, nombre: 'Max', idestado: 1, primer_nombre: 'Juan', primer_apellido: 'Pérez', idTipoEspecie: 0, tipoEspecie: 'Perro', descripcion: 'Cita para peluqueria', horaCita: '10:00 AM', idEstado: 1, idEstadoValor: 'Si' },
    { id: 2, nombre: 'Whiskers', idestado: 0, primer_nombre: 'María', primer_apellido: 'López', idTipoEspecie: 1, tipoEspecie: 'Gato', descripcion: 'Cita de control', horaCita: '11:30 AM', idEstado: 0, idEstadoValor: 'No' },
    { id: 3, nombre: 'Buddy', idestado: 0, primer_nombre: 'Carlos', primer_apellido: 'Gómez', idTipoEspecie: 0, tipoEspecie: 'Perro', descripcion: 'Cita de cirugia', horaCita: '02:15 PM', idEstado: 1, idEstadoValor: 'Si' },
    { id: 4, nombre: 'Mittens', idestado: 0, primer_nombre: 'Laura', primer_apellido: 'Martínez', idTipoEspecie: 1, tipoEspecie: 'Gato', descripcion: 'Cita para peluqeria', horaCita: '03:45 PM', idEstado: 0, idEstadoValor: 'No' },
    { id: 5, nombre: 'Rocky', idestado: 1, primer_nombre: 'Pedro', primer_apellido: 'Rodríguez', idTipoEspecie: 0, tipoEspecie: 'Perro', descripcion: 'Cita para peluqueria', horaCita: '09:30 AM', idEstado: 1, idEstadoValor: 'Si' },
    { id: 6, nombre: 'Misty', idestado: 0, primer_nombre: 'Ana', primer_apellido: 'Sánchez', idTipoEspecie: 1, tipoEspecie: 'Gato', descripcion: 'Cita de control', horaCita: '01:00 PM', idEstado: 0, idEstadoValor: 'No' },
    { id: 7, nombre: 'Charlie', idestado: 1, primer_nombre: 'Mario', primer_apellido: 'Fernández', idTipoEspecie: 0, tipoEspecie: 'Perro', descripcion: 'Cita de cirugia', horaCita: '11:45 AM', idEstado: 1, idEstadoValor: 'Si' },
    { id: 8, nombre: 'Luna', idestado: 0, primer_nombre: 'Isabel', primer_apellido: 'Díaz', idTipoEspecie: 1, tipoEspecie: 'Gato', descripcion: 'Cita para peluqeria', horaCita: '04:30 PM', idEstado: 0, idEstadoValor: 'No' },
    { id: 9, nombre: 'Maximus', idestado: 1, primer_nombre: 'Héctor', primer_apellido: 'Luna', idTipoEspecie: 0, tipoEspecie: 'Perro', descripcion: 'Cita para peluqueria', horaCita: '02:00 PM', idEstado: 1, idEstadoValor: 'Si' },
    { id: 10, nombre: 'Oliver', idestado: 0, primer_nombre: 'Elena', primer_apellido: 'García', idTipoEspecie: 1, tipoEspecie: 'Gato', descripcion: 'Cita de control', horaCita: '10:45 AM', idEstado: 0, idEstadoValor: 'No' }
  ];
  
export default function GestionarCitas() {
    const {selectId, saveSelectId} = useSelectId()
    const {saveSelectRow} = useSelectRow()
    
    return (
        <div className='flex gap-9'>
            <Sidebar />
            <div className='mt-10'>
            <Botonera
                title='Citas registradas del dia'
                editar={
                    <AlertaActivarCita idSeleccionado={selectId} tooltip={'Confirmar Asistencia'}/>
                }/>
            <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
            </div>
        </div>
    );
}
