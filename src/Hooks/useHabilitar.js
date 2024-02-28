import { useEffect, useState } from "react";

export const useHabilitar = ({id}) => {
  const [desabilitado, setDesabilitado] = useState(false)
  const [validarId, setValidarId] = useState(false)

  useEffect(() => {
      setDesabilitado(!(id === null || (id !== null && id)))
      setValidarId((id!== null && id))
  },[id])

  return {desabilitado, validarId}
};
