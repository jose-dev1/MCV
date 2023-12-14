import Boton from "../dash/boton";
import Swal from "sweetalert2";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AlertaActivarCita(props) {
  const {idSeleccionado, tooltip } = props

  const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)

  useEffect(() => {
    setDesabilitado(idSeleccionado.length === 0)
  }, [idSeleccionado, setDesabilitado])

  const handleClick = () =>{
    Swal.fire({
      title: '¿Deseas confirmar la asistencia?',
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Asistencia confirmada.", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se ha confirmado la asistencia.", "", "error");
      }
    });
  }

  return (
    <>
      <Boton 
        bgColor='success'
        icon={<CheckIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}
