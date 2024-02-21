import Boton from "./boton";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AlertaEliminar(props) {
  const {idSeleccionado, tooltip } = props

  const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)

  useEffect(() => {
    setDesabilitado(idSeleccionado.length === 0)
  }, [idSeleccionado, setDesabilitado])

  const handleClick = () =>{
    Swal.fire({
      title: '¿Deseas eliminar el registro seleccionado?',
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se aplicaron", "", "error");
      }
    });
  }

  return (
    <>
      <Boton 
        bgColor='error'
        icon={<TrashIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}