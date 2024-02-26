import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { FormAgregar } from '../../components/admin/agregarComponent'
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import Stack from '@mui/material/Stack';
import AlertaVer from '../../components/admin/modalVerAdmin'
import axios from 'axios';
import { useEffect, useState } from 'react';

const columns = [
  { field: 'primer_nombre_empleado', headerName: 'Primer Nombre', width: 140 },
  { field: 'segundo_nombre_empleado', headerName: 'Primer Apellido', width: 140 },
  { field: 'numero_documento_empleado', headerName: 'Numero de documento', width: 170 },
  { field: 'correo_usuario', headerName: 'Correo', width: 260 },
  { field: 'descripcion_usuario', headerName: 'Cargo', width: 180 },
  { field: 'estado_usuario', headerName: 'Estado', width: 130 }
];

const defaultValues = {
  primer_nombre_empleado: '',
  segundo_nombre_empleado: '',
  primer_apellido_empleado: '',
  segundo_apellido_empleado: '',
  numero_documento_empleado: '',
  id_tipo_documento: 'C.C',
  password_usuario: '',
  correo_usuario: '',
  position: 1
}

export default function AddEmploye() {
  const { selectId, saveSelectId } = useSelectId()
  const { selectRow, saveSelectRow } = useSelectRow()
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)
  useEffect(() => {
    const fectchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/admin')
        setData(result.data)
      } catch (error) {
        setError('Error' + error.message)
      }
    }
    fectchData()
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
          title='Agregar Empleado'
          agregar={<FormAgregar
            datosEditables={defaultValues}
            icon={<PlusIcon className='w-6 h-6' />}
            tooltip='Agregar Empleado'
            bgColor='secondary'
            label='Agregar Empleado' />}
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
          ver={<AlertaVer idSeleccionado={selectId} tooltip='Ver' />}
        />
        <DataTable rows={data} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
      </Stack>
    </div>
  )
}
