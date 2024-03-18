import { Modal } from '@mui/material'
import { useState } from 'react'
import Boton from '../dash/boton'
import dayjs from 'dayjs';
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import axios from 'axios';
import { dateFormater } from '../../utils/dateFormater';

const columns = [
  { field: 'nombre_mascota', headerName: 'Nombre Mascota', width: 160 },
  { field: 'Hora_cita', headerName: 'Hora Cita', width: 160}
];

export const VerCitasDia = (props) => {
  const { bgColor, icon, tooltip, idEmpleado, fechaCita, saveError, desable } = props
  
  const { saveSelectId } = useSelectId()
  const [dataMostrar, setDataMostrar] = useState([]);
  const [open, setOpen] = useState(false)

  const handleModal = async () => {
    if(fechaCita === '' || idEmpleado==='' )
    {
      saveError('Seleccione un especialista y un dia para realizar la busqueda de citas')
    }else{
      try {
        saveError('')
        const result = await axios.get(`http://localhost:4321/agendar/empleados/${dateFormater({time: fechaCita, format: 'YYYY-MM-DD'})}/${idEmpleado}`);
        setDataMostrar(result.data)
        setOpen(true)
      } catch (error) {
        setDataMostrar([])
        error.response.data.message ? saveError(error.response.data.message) : saveError('Error al conectar con el servidor')
      }
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Boton
        onClick={handleModal} 
        bgColor={bgColor} 
        icon={icon}
        tooltip={tooltip}
        desable={desable}
      />
      <Modal
        open={open}
        onClose={handleClose}
      >
      <div className='w-[500px] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-black rounded-lg shadow p-4 bg-white'>
        <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        </div>
      </Modal>
    </div>
  )
}