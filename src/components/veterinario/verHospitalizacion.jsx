import { Modal } from '@mui/material'
import { useState } from 'react'
import Boton from '../dash/boton'
import { useHabilitar } from '../../Hooks/useHabilitar';
import dayjs from 'dayjs';
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import axios from 'axios';


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
  const regex = /\n/g;
  const fragments = content.split(regex).filter(Boolean);
  return fragments;
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
      <div className='w-[800px] h-[650px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-gray-300 rounded-lg shadow-lg bg-white'>
          <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
          {contenido && (
            <>
              <div className="flex flex-col items-center mt-10 ">
                <h4 className="text-3xl font-extrabold text-gray-900 mb-6">Observaciones Ingresadas</h4>
                <div className="w-11/12 overflow-y-auto overflow-x-hidden h-[300px]">
                  {formattedContent.map((line, index) => (
                    <div className="my-2 py-2 px-4 bg-gray-200 rounded" key={index}>
                      <p className="mb-2">{line}</p>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
