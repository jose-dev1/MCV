import Boton from "../dash/boton";
import Swal from "sweetalert2";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function  AlertEliminar(props) {
  const {idSeleccionado, titulo ,tooltip, menssage, endPoint,actualizar,dato,abrirModal,cerrarModal} = props
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
  if(typeof cerrarModal ==='function') cerrarModal()
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
          Swal.fire({
            title: response.data.message,
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              if(typeof abrirModal ==='function') abrirModal()
            }
          });
          if(typeof abrirModal !== 'function') actualizar(!dato)
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error al enviar mensaje',
          icon: 'error',
          text: error.response.data.message
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            if(typeof abrirModal ==='function') abrirModal()
          }
        });
      }
  } else {
    Swal.fire({
      title: 'Mensaje no enviado',
      icon: 'info',
      customClass: {
        container: 'sweet-alert-container'
      }
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        if(typeof abrirModal ==='function') abrirModal()
      }
    });
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