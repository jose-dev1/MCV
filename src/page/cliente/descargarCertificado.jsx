import React from 'react'
import Sidebar from "../../components/sidebarComponent"
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import Swal from "sweetalert2";
import Boton from "../../components/dash/boton";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import WhatsAppComponent from '../../components/whatsappComponent';
import axios from 'axios';
const columns = [
  { field: 'informacion_sanitaria_certificado', headerName: 'Informacion sanitaria', width: 270 },
  { field: 'fecha_certificado', headerName: 'Fecha del certificado', width: 230 },
  { field: 'estado_certificado', headerName: 'Estado del certificado', width: 160 },

]


function AlertaDescargar(props) {
  const { idSeleccionado, tooltip } = props
  const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)

  useEffect(() => {
    setDesabilitado(idSeleccionado.length === 0)
  }, [idSeleccionado, setDesabilitado])

  const handleClick = () => {
    Swal.fire({
      title: '¿Deseas descargar el certificado?',
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Descargando el certificado", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se ha descargado el certificado", "", "error");
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

export default function DescargarCertificado() {
  const { selectId, saveSelectId } = useSelectId()
  const { selectRow, saveSelectRow } = useSelectRow()
  const [examen, setExamen] = useState([]);

  useEffect(() => {
    const fetchDataCertificado = async () => {
      try {
        const response = await axios.get('http://localhost:4321/registro/descarga_examen')
        setExamen(response.data);
      } catch (error) {
        console.log("No hay datos disponibles", error)
      }
    }
    fetchDataCertificado();
  }, []);

  return (
    <div className='flex gap-20'>
      <Sidebar />
      <div className='mt-10'>
        <Botonera
          title='Descargar Certificados'
          descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Certificado' />}
        />
        <DataTable rows={examen} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
      </div>
      <WhatsAppComponent />
    </div>
  )
}


