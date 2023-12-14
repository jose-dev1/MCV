import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { FormAgregar } from '../../components/admin/agregarComponent'
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import Stack from '@mui/material/Stack';

const columns = [
  { field: 'firstName', headerName: 'Primer Nombre', width: 140 },
  { field: 'firstLastName', headerName: 'Primer Apellido', width: 140 },
  { field: 'document', headerName: 'Numero de documento', width: 170 },
  { field: 'email', headerName: 'Correo', width: 260 },
  { field: 'rol', headerName: 'Cargo', width: 180 },
  { field: 'estado', headerName: 'Estado', width: 130 }
];

const rows = [
  {
    id: '1',
    firstName: 'Juan',
    secondName: 'Carlos',
    firstLastName: 'González',
    secondLastName: 'Pérez',
    document: '123456789',
    documentType: 'C.C',
    userName: 'juancar123',
    password: 'contraseña123',
    email: 'juancarlos@example.com',
    emailType: 1,
    position: 1,
    rol: 'Groomer',
    idEstado: 1,
    estado: 'Activo'
  },
  {
    id: '2',
    firstName: 'María',
    secondName: 'Elena',
    firstLastName: 'López',
    secondLastName: 'García',
    document: '987654321',
    documentType: 'C.C',
    userName: 'marialo',
    password: 'clave456',
    email: 'marialopez@example.com',
    emailType: 1,
    position: 2,
    rol: 'Asistente Veterinario',
    idEstado: 1,
    estado: 'Activo'
  },
  {
    id: '3',
    firstName: 'Pedro',
    secondName: 'José',
    firstLastName: 'Martínez',
    secondLastName: 'Sánchez',
    document: '456123789',
    documentType: 'C.C',
    userName: 'pedromar',
    password: 'pedro123',
    email: 'pedromartinez@example.com',
    emailType: 1,
    position: 1,
    rol: 'Groomer',
    idEstado: 0,
    estado: 'Inactivo'
  },
  {
    id: '4',
    firstName: 'Luisa',
    secondName: 'Fernanda',
    firstLastName: 'Ramírez',
    secondLastName: 'Díaz',
    document: '789456123',
    documentType: 'C.C',
    userName: 'luradi',
    password: 'luisa456',
    email: 'luisaramirez@example.com',
    emailType: 1,
    position: 2,
    rol: 'Asistente Veterinario',
    idEstado: 1,
    estado: 'Activo'
  },
  {
    id: '5',
    firstName: 'Andrés',
    secondName: 'Felipe',
    firstLastName: 'Santos',
    secondLastName: 'Castro',
    document: '321654987',
    documentType: 'C.C',
    userName: 'andresfc',
    password: 'andres123',
    email: 'andresfelipe@example.com',
    emailType: 1,
    position: 1,
    rol: 'Groomer',
    idEstado: 0,
    estado: 'Inactivo'
  }
];


const defaultValues = {
  firstName: '',
  secondName: '',
  firstLastName: '',
  secondLastName: '',
  document: '',
  documentType: 'C.C',
  userName: '',
  password: '',
  email: '',
  emailType: 1,
  position: 1
}

export default function AddEmploye () {
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
          title='Agregar Empleado'
          agregar={<FormAgregar
            datosEditables={defaultValues}
            icon={<PlusIcon className='w-6 h-6' /> }
            tooltip='Agregar Empleado'
            bgColor='secondary'
            label='Agregar Empleado'/>}
          editar={
            <FormAgregar
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Empleado'
              bgColor='primary'
              label='Editar Empleado'
              datosEditables={selectRow}
            />
          }
          eliminar={<AlertaEliminar idSeleccionado={selectId} />}
          />
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
        </Stack>
    </div>
  )
}
