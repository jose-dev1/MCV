import Boton from "./boton";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AlertaEliminar(props) {
  const { idSeleccionado, titulo, tooltip, endPoint, actualizar, dato, color, icon} = props;
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

  const handleClick = async() => {
    const result = await Swal.fire({
      title: titulo,
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await axios.patch(`http://localhost:4321/${endPoint}/${idSeleccionado}`);
        actualizar(!dato);
        console.log(dato)
        Swal.fire(response.data.message, '', 'success');
      } catch (error) {
        Swal.fire('Error', error.response.data.message || "Error desconocido", 'error');
      }
    } else if (result.isDenied) {
      Swal.fire("Los cambios no se aplicaron", "", "error");
    }
  };

  return (
    <>
      <Boton 
        bgColor={color??'error'}
        icon={icon??<TrashIcon className='w-6 h-6' />}
        tooltip={tooltip}
        onClick={handleClick}
        desable={desabilitado}
      />
    </>
  )
}
