import Boton from "../dash/boton";
import Swal from "sweetalert2";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AlertaCanceclarCita(props) {
  const {idSeleccionado, tooltip } = props

  const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)

  useEffect(() => {
    setDesabilitado(idSeleccionado.length === 0)
  }, [idSeleccionado, setDesabilitado])

  const handleClick =  () =>{
    Swal.fire({
      title:'¿Quieres cancelar la cita?',
      input: 'textarea',
      text:"Se le notificará al usuario. Por favor, escribe el motivo por el cual cancelas la cita.",
      inputPlaceholder: 'Descripcion...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      confirmButtonText:'Enviar',
      showDenyButton:true,
      denyButtonText:`Cancelar`,
    })
    .then((result)=>{
      if(result.isConfirmed){
          Swal.fire('Mensaje enviado','','success')
      }else if(result.isDenied){
          Swal.fire('Mensaje no enviado','','info')
      }
    })
  }

  return (
    <>
      <Boton 
        bgColor='success'
        icon={<XMarkIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}
