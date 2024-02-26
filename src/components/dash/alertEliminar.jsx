import Boton from "../dash/boton";
import Swal from "sweetalert2";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AlertEliminar(props) {
  const {idSeleccionado, titulo ,tooltip, menssage, endPoint } = props
  const [desabilitado, setDesabilitado] = useState(idSeleccionado===null ? false : true)

  useEffect(() => {
    if(idSeleccionado === null){
        setDesabilitado(false)
    }
    else if(idSeleccionado !== null && idSeleccionado){
        setDesabilitado(false)
    }
    else{
        setDesabilitado(true)
    }
},[idSeleccionado])

const handleClick = async () => {
  const { value: mensaje } = await Swal.fire({
      title: titulo,
      input: 'textarea',
      text: menssage,
      inputPlaceholder: 'Descripcion...',
      inputAttributes: {
          'aria-label': 'Type your message here'
      },
      confirmButtonText: 'Enviar',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      inputValidator: (value) => {
          if (!value) {
              return 'Por favor, escribe un mensaje.';
          }
      }
  });

  if (mensaje) {
      try {
        const datos = {
          anotacion:mensaje
        }
          const response = await axios.patch(`http://localhost:4321/${endPoint}/${idSeleccionado}`,datos)
          Swal.fire(response.data.message, '', 'success');
      } catch (error) {
        console.log(error)
          Swal.fire('Error al enviar mensaje', error.response.data.message, 'error');
      }
  } else {
      Swal.fire('Mensaje no enviado', '', 'info');
  }
};

  return (
    <>
      <Boton 
        bgColor='error'
        icon={<XMarkIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}
