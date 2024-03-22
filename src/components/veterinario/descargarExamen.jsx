import React, { useEffect, useState } from 'react'
import Boton from "../dash/boton";
import axios from 'axios';
import Swal from 'sweetalert2';

export function DescargaExamen(props) {
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
        try {
            const response = await axios.get(`http://localhost:4321/examenesVeterinario/${selectId}`)
            if (response.data.link_archivo_examen) {
                window.open(response.data.link_archivo_examen, '_blank');
            } else {
                Swal.fire({
                    title: "Error",
                    text: "No hay ningun archivo cargado para este examen",
                    icon: "error"
                });
            }

        } catch (error) {
            console.log(error)
        }
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