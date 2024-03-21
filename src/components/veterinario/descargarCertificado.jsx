import React, { useEffect, useState } from 'react'
import Boton from "../dash/boton";
import { handleCertificadoGeneralPdf } from '../../utils/formatoCertificado';

export function DescargaCertificado(props) {
    const { selectId, bgColor, icon, tooltip } = props
    const [desabilitado, setDesabilitado] = useState(selectId === null ? false : true)
    //const [data, setData] = useState(null)

    useEffect(() => {
        if (selectId === null) {
            setDesabilitado(false)
        }
        else if (selectId !== null && selectId) {
            setDesabilitado(false)
        }
        else {
            setDesabilitado(true)
        }
    }, [selectId])

    const handleModal = async () => {
      handleCertificadoGeneralPdf(selectId)
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
        </div>
    )
}
