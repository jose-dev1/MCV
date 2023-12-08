import { FormAgregar } from '../../components/admin/agregarComponent'
import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../components/dash/useSelectId';
import Botonera from '../../components/dash/botonera'

const columns = [
  { field: 'doc', headerName: 'Documento', width: 90 },
  { field: 'firstName', headerName: 'Primer Nombre', width: 130 },
  { field: 'position', headerName: 'Cargo', width: 100 },
  { field: 'state', headerName: 'Estado', type: 'number', width: 90 }
];

const rows = [
  { doc: 12345, position: 'Veterinario', firstName: 'Jhon', state: 35 },
  { doc: 123456, position: 'Groomer', firstName: 'Jhon', state: 42 },
  { doc: 1234567, position: 'Asistente', firstName: 'Jhon', state: 45 }
];
export default function AddEmploye () {
  const {selectId, saveSelectId} = useSelectId()

  return (
    <div className='flex gap-9'>
      <Sidebar />
      <div className='mt-10'>
        
        <Botonera descarga={true} componente={<FormAgregar label='Agregar Empleado' />}/>
        <DataTable rows={rows} columns={columns} tipoId={(rows)=>rows.doc} selectId={saveSelectId} />
        <button onClick={()=>console.log(selectId)}>hola</button>
      </div>
    </div>
  )
}
