import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { FormAgregarHozpitalizaciones } from '../../components/veterinario/agregarHospitalziacionCoomponent';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';

const columns = [
  { field: 'nombre', headerName: 'Nombre del Paciente', width: 190 },
  { field: 'tipo', headerName: 'Especie', width: 150 },
  {
    field: 'duenno',
    headerName: 'Propietario',
    width: 180,
    valueGetter: (params) =>
      `${params.row.primer_nombre || ''} ${params.row.primer_apellido || ''}`
  },
  { field: 'telefono', headerName: 'Telefono Propietario', width: 180 },
  { field: 'fecha_creacion', headerName: 'Fecha de Ingreso', width: 170 },
  { field: 'servicioFinalizado', headerName: 'Estado', width: 150 }
]

const rows = [
  {
    id: 1,
    fecha_creacion: '2023-01-01',
    estado: 'Activo',
    idestado: 1,
    nombre: 'Max',
    tipo: 'Perro',
    primer_nombre: 'Juan',
    primer_apellido: 'Pérez',
    N_documento: '123456789',
    tipo_documento: 'C.C',
    telefono: '555-1234',
    observaciones: 'Revisión veterinaria anual',
    servicioFinalizado: 'Activo'
  },
  {
    id: 2,
    fecha_creacion: '2023-02-15',
    estado: 'Inactivo',
    idestado: 0,
    nombre: 'Whiskers',
    tipo: 'Gato',
    primer_nombre: 'María',
    primer_apellido: 'López',
    N_documento: '987654321',
    tipo_documento: 'C.E',
    telefono: '555-5678',
    observaciones: 'Hospitalizado por fiebre',
    servicioFinalizado: 'Finalizado'
  },
  {
    id: 3,
    fecha_creacion: '2023-03-10',
    estado: 'Activo',
    idestado: 0,
    nombre: 'Buddy',
    tipo: 'Perro',
    primer_nombre: 'Carlos',
    primer_apellido: 'Gómez',
    N_documento: '456789012',
    tipo_documento: 'C.C',
    telefono: '555-9012',
    observaciones: 'Revisión veterinaria anual',
    servicioFinalizado: 'Activo'
  },
  {
    id: 4,
    fecha_creacion: '2023-04-20',
    estado: 'Inactivo',
    idestado: 0,
    nombre: 'Mittens',
    tipo: 'Gato',
    primer_nombre: 'Laura',
    primer_apellido: 'Martínez',
    N_documento: '345678901',
    tipo_documento: 'C.E',
    telefono: '555-3456',
    observaciones: 'Hospitalizado por fractura de pata',
    servicioFinalizado: 'Finalizado'
  },
  {
    id: 5,
    fecha_creacion: '2023-05-05',
    estado: 'Activo',
    idestado: 1,
    nombre: 'Rocky',
    tipo: 'Perro',
    primer_nombre: 'Pedro',
    primer_apellido: 'Rodríguez',
    N_documento: '789012345',
    tipo_documento: 'C.C',
    telefono: '555-6789',
    observaciones: 'Atención veterinaria por malestar',
    servicioFinalizado: 'Activo'
  },
  {
    id: 6,
    fecha_creacion: '2023-06-12',
    estado: 'Inactivo',
    idestado: 0,
    nombre: 'Misty',
    tipo: 'Gato',
    primer_nombre: 'Ana',
    primer_apellido: 'Sánchez',
    N_documento: '234567890',
    tipo_documento: 'C.E',
    telefono: '555-0123',
    observaciones: 'Atención veterinaria por infección',
    servicioFinalizado: 'Finalizado'
  },
  {
    id: 7,
    fecha_creacion: '2023-07-25',
    estado: 'Activo',
    idestado: 1,
    nombre: 'Charlie',
    tipo: 'Perro',
    primer_nombre: 'Mario',
    primer_apellido: 'Fernández',
    N_documento: '890123456',
    tipo_documento: 'C.C',
    telefono: '555-2345',
    observaciones: 'Hospitalizado por alergia',
    servicioFinalizado: 'Activo'
  },
  {
    id: 8,
    fecha_creacion: '2023-08-08',
    estado: 'Inactivo',
    idestado: 0,
    nombre: 'Luna',
    tipo: 'Gato',
    primer_nombre: 'Isabel',
    primer_apellido: 'Díaz',
    N_documento: '567890123',
    tipo_documento: 'C.E',
    telefono: '555-5678',
    observaciones: 'Hospitalizado por intoxicación alimentaria',
    servicioFinalizado: 'Finalizado'
  },
  {
    id: 9,
    fecha_creacion: '2023-09-18',
    estado: 'Activo',
    idestado: 1,
    nombre: 'Maximus',
    tipo: 'Perro',
    primer_nombre: 'Héctor',
    primer_apellido: 'Luna',
    N_documento: '012345678',
    tipo_documento: 'C.C',
    telefono: '555-9012',
    observaciones: 'Atención veterinaria por malestar',
    servicioFinalizado: 'Activo'
  },
  {
    id: 10,
    fecha_creacion: '2023-10-30',
    estado: 'Inactivo',
    idestado: 0,
    nombre: 'Oliver',
    tipo: 'Gato',
    primer_nombre: 'Elena',
    primer_apellido: 'García',
    N_documento: '345678901',
    tipo_documento: 'C.E',
    telefono: '555-3456',
    observaciones: 'Atención veterinaria por infección',
    servicioFinalizado: 'Finalizado'
  }
];

const defaultValues = {
  id: '',
  fecha_creacion: dayjs(),
  estado: '',
  idestado: 1,
  nombre: '',
  tipo: '',
  primer_nombre: '',
  primer_apellido: '',
  N_documento: '',
  tipo_documento: 'C.C',
  telefono: '',
  observaciones: '',
  servicioFinalizado: ''
}

export default function Hospitalizaciones () {
  const {selectId, saveSelectId} = useSelectId()
  const {selectRow, saveSelectRow} = useSelectRow()

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
            datosEditables={defaultValues}
            icon={<PlusIcon className='w-6 h-6' /> }
            tooltip='Agregar Hospitalización'
            bgColor='secondary'
            label='Agregar Hospitalización'/>}
          editar={
            <FormAgregarHozpitalizaciones 
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Hospitalización'
              bgColor='primary'
              label='Editar Hospitalización'
              datosEditables={selectRow}
            />
          }
          eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Hospitalización'/>}
          descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Registro' />}
          />
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
        </Stack>
    </div>
  )
}
