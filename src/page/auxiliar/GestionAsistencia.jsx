import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertaEliminar from '../../components/dash/alertaEliminar';
import { CheckIcon,XMarkIcon } from "@heroicons/react/24/outline";

const columns = [
    { field: 'nombre_mascota', headerName: 'Nombre del Paciente', width: 200 },
    { field: 'tipo_mascota', headerName: 'Especie', width: 140 },
    {
      field: 'duenno',
      headerName: 'Propietario',
      width: 210,
      valueGetter: (params) =>
        `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    { field: 'descripcion_servicio', headerName: 'Descripcion', width: 200 },
    { field: 'Hora_cita', headerName: 'Hora Cita', width: 130 },
    { field: 'asistenciaCIta', headerName: 'Asistencia', width: 130 ,
    valueGetter: (params) =>
    `${params.row.asistencia_cita === 1 ? 'Si' : 'No'}`},
  ]
    
export default function GestionarAsistencia() {
    const {selectId, saveSelectId} = useSelectId()
    const [actualizar,setActualizar] = useState(false)
    const [rows,setRows] = useState([])

    useEffect(()=>{
      const fechtData = async () =>{
        try {
          const response = await axios.get(`http://localhost:4321/asistencia`)
          setRows(response.data)
      }catch(error){
        console.log(error)
      }
      }
      console.log('hola')
      fechtData()
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
                title='Citas registradas del dia'
                agregar={
                  <AlertaEliminar 
                  idSeleccionado={selectId} 
                  actualizar= {setActualizar}
                  dato={actualizar}
                  tooltip='Confirmar asistencia' 
                  titulo='¿Desea confirmar la asistencia de la cita seleccionada?'
                  endPoint='asistencia/activar'
                  color='success'
                  icon={<CheckIcon className='w-6 h-6' />}
                  />
                }
                editar={
                  <AlertaEliminar 
                  idSeleccionado={selectId} 
                  dato={actualizar}
                  actualizar= {setActualizar}
                  tooltip='Confirmar inasistencia' 
                  titulo='¿Desea confirmar la inasistencia de la cita seleccionada?'
                  endPoint='asistencia/desactivar'
                  icon={<XMarkIcon className='w-6 h-6' />}
                  />
                }/>
            <DataTable rows={rows} columns={columns} selectId={saveSelectId} />
            </Stack>
        </div>
    );
}
