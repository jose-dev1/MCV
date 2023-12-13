import Boton from "../dash/boton";
import Swal from "sweetalert2";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AlertaDescargar(props) {
  const {idSeleccionado, tooltip } = props

  const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)

  useEffect(() => {
    setDesabilitado(idSeleccionado.length === 0)
  }, [idSeleccionado, setDesabilitado])

  const handleClick = () =>{
    Swal.fire({
      title: '¿Deseas descargar el registro seleccionado?',
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Tu descarga se ha completado.", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El registro no ha sido descargado.", "", "error");
      }
    });
  }

  return (
    <>
      <Boton 
        bgColor='success'
        icon={<DocumentArrowDownIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}
