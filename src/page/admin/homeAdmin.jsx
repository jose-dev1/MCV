import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { FormAgregar } from '../../components/admin/agregarComponent'
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Stack from '@mui/material/Stack';
import AlertaVer from '../../components/admin/modalVerAdmin'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AlertEliminar from '../../components/dash/alertEliminar';
import AlertPrincipal from '../../components/dash/alertPrincipal';

const columns = [
  { field: 'primer_nombre_empleado', headerName: 'Primer Nombre', width: 140 },
  { field: 'primer_apellido_empleado', headerName: 'Primer Apellido', width: 140 },
  { field: 'numero_documento_empleado', headerName: 'Numero de documento', width: 170 },
  { field: 'correo_usuario', headerName: 'Correo', width: 260 },
  { field: 'descripcion_usuario', headerName: 'Cargo', width: 180 },
  { field: 'estado_usuario', headerName: 'Estado', width: 130, 
    valueGetter: (params) =>
        `${params.row.estado_usuario === 1 ? 'Activo' : 'Desactivado'}`
  }
];



export default function AddEmploye() {
  const { selectId, saveSelectId } = useSelectId()
  const { selectRow } = useSelectRow()
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)
  const [success, setSuccess] = useState('')
  useEffect(() => {
    const fectchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/admin')
        setData(result.data)
      } catch (error) {
        error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
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
          title='Gestionar Empleado'
          agregar={<FormAgregar
            icon={<PlusIcon className='w-6 h-6' />}
            tooltip='Agregar Empleado'
            bgColor='secondary'
            label='Agregar Empleado' 
            actualizar= {setActualizar}
            dato={actualizar}
            id={null}
            successMessage={setSuccess}
            errorMessage={setError}/>}
          editar={
            <FormAgregar
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Empleado'
              bgColor='primary'
              label='Editar Empleado'
              datosEditables={selectRow}
              actualizar= {setActualizar}
              dato={actualizar}
              id={selectId}
              successMessage={setSuccess}
              errorMessage={setError}
            />
          }
          eliminar={<AlertEliminar 
            idSeleccionado={selectId} 
            tooltip='Desactivar usuario' 
            titulo='¿Desea desactivar elusuario seleccionado?'
            endPoint='admin/desabilitar'
            menssage='Por favor, especifique el motivo por el cual desea desactivar a este usuario. Tenga en cuenta que este cambio es irreversible.'
            actualizar= {setActualizar}
            dato={actualizar}/>}
          ver={<AlertaVer idSeleccionado={selectId} tooltip='Ver' />}
        />
        <DataTable rows={data} columns={columns} selectId={saveSelectId}/>
      </Stack>
      <AlertPrincipal severity='error' message={error}/>
        <AlertPrincipal severity='success' message={success}/>
    </div>
  )
}
