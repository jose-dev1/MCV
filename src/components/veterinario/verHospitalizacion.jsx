import { Modal } from '@mui/material'
import { useState } from 'react'
import Boton from '../dash/boton'
import { useHabilitar } from '../../Hooks/useHabilitar';
import dayjs from 'dayjs';
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import axios from 'axios';
import Typography from '@mui/material/Typography';

const columns = [
  { field: 'nombre_mascota', headerName: 'Nombre Paciente', width: 150 },
  { field: 'fecha_hospitalizacion', headerName: 'Fecha ingreso', width: 150,
  valueGetter: (params) =>
  `${dayjs(params.row.fecha_hospitalizacion).format('MM-DD-YYYY')}`},
  { field: 'fecha_salida', headerName: 'Fecha salida', width: 150,
  valueGetter: (params) =>
  `${params.row.fecha_salida_hospitalizacion? dayjs(params.row.fecha_salida_hospitalizacion).format('MM-DD-YYYY'):'Ahun ingresado'}`},
  { field: 'servicioFinalizado', headerName: 'Servicio Finalizado', width: 150
  ,
  valueGetter: (params) =>
  `${params.row.servicio_finalizado_hospitalizacion === 0 ? 'No' : 'Si'}` },
];

const formatContent = (content) => {
  // Expresión regular para encontrar fechas en el formato 'MM-DD-YYYY'
  const regex = /(\b\d{2}-\d{2}-\d{4}\b)/g;

  // Dividir el contenido en pares de fecha y contenido
  const fragments = content.split(regex).filter(Boolean); // Eliminar elementos vacíos

  // Agrupar los fragmentos en pares de fecha y contenido
  const formattedFragments = [];
  for (let i = 0; i < fragments.length - 1; i += 2) {
    formattedFragments.push(`${fragments[i]} ${fragments[i + 1]}`);
  }

  console.log(formattedFragments); // Imprimir el vector resultante

  return formattedFragments;
};




export const VerInfoHospitalizacion = (props) => {
  const { bgColor, icon, tooltip,id, saveError } = props
  
  const { saveSelectId } = useSelectId()
  const [dataMostrar, setDataMostrar] = useState([]);
  const [open, setOpen] = useState(false)
  const {desabilitado} = useHabilitar({id})
  const [contenido , mostrarContenido] = useState(false)
  
  const formattedContent = dataMostrar.length > 0 ? formatContent(dataMostrar[0].contenido_hospitalizacion) : [];
  
  const handleModal = async () => {
      try {
        const result = await axios.get(`http://localhost:4321/hospitalizaciones/${id}`);
        setDataMostrar([result.data])
        setOpen(true)
        setTimeout(() => {
          mostrarContenido(true);
        }, 2000);
      } catch (error) {
        setDataMostrar([])
        error.response.data.message ? saveError(error.response.data.message) : saveError('Error al conectar con el servidor')
      }
  }
  const handleClose = () => {
    setOpen(false)
    mostrarContenido(false)
  }

  return (
    <div>
      <Boton
        onClick={handleModal} 
        bgColor={bgColor} 
        icon={icon}
        tooltip={tooltip}
        desable={desabilitado}
      />
      <Modal
        open={open}
        onClose={handleClose}
      >
      <div className='w-[800px] h-[650px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-black rounded-lg shadow p-4 bg-white'>
        <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        {contenido  && ( <>
          <Typography variant="h4">
          Observaciones Ingresadas
        </Typography>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Typography variant="subtitle1" gutterBottom style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
        {formattedContent.map((line, index) => (
          <div key={index}>
            {line}
          </div>
        ))}
      </Typography>
    </div>
        </>
              )}


        </div>
      </Modal>
    </div>
  )
}
