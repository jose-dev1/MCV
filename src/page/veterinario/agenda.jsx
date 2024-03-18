import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertEliminar from '../../components/dash/alertEliminar';
import useForm from '../../Hooks/useForm';
import InputDate from '../../components/dash/inputDate'
import dayjs from 'dayjs';
import { dateFormater } from '../../utils/dateFormater';
import AlertPrincipal from '../../components/dash/alertPrincipal';

const columns = [
    { 
      field: 'duenno', 
      headerName: 'Propietario',
      width: 170,
      valueGetter: (params) => `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`
    },
    { 
      field: 'descripcion_servicio', 
      headerName: 'Descripcion', 
      width: 210 
    },
    { 
      field: 'nombre_mascota', 
      headerName: 'Nombre Mascota',
      width: 170 
    },
    { 
      field: 'tipo_mascota', 
      headerName: 'Especie', 
      width: 140 
    },
    { 
      field: 'Hora_Cita', 
      headerName: 'Hora Cita', 
      width: 140 
    }
]

const defaultValues ={
  fechaCita: dayjs()
}
export default function AgendaVeterinario() {
  const {selectId, saveSelectId} = useSelectId()
  const {values, handleInputChangeDate} = useForm(defaultValues)
  const [error, setError] = useState(null)
  const [rows, setRows] = useState([])
  const [actualizar, setActualizar] = useState(false)

  useEffect(()=>{
    const fetchData= async ()=>{
      try {
        let localstorage = localStorage
        const id = JSON.parse(localstorage.getItem('user'))
        const {data} = await axios.get(`http://localhost:4321/agendar/${dateFormater({time: values.fechaCita, format: 'YYYY-MM-DD'})}/${id.id_usuario}`)
        setRows(data)
      } catch (error) {
        setRows([])
        error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
      }
    }
    fetchData()
  },[actualizar, values.fechaCita])

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
            actualizar= {setActualizar}
            dato={actualizar}/>}
          />
          <div className='flex'>
            <InputDate
              id='fechaCita'
              fullWidth
              label='Fecha cita'
              name='fechaCita'
              fecha={values.fechaCita}
              onChange={handleInputChangeDate}
              disabled={false}
              required />
          </div>
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} />
        </Stack>
        <AlertPrincipal severity='error' message={error}/>
    </div>
  )
}
