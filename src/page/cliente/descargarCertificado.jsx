import React from 'react'
import Sidebar from "../../components/sidebarComponent"
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import Swal from "sweetalert2";
import Stack from '@mui/material/Stack';
import Boton from "../../components/dash/boton";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import WhatsAppComponent from '../../components/whatsappComponent';
import axios from 'axios';
import { DescargaCertificado } from '../../components/veterinario/descargarCertificado';
const columns = [
  { field: 'nombre_mascota', headerName: 'Mascota', width: 100 },
  { field: 'informacion_sanitaria_certificado', headerName: 'Informacion sanitaria', width: 270 },
  { field: 'fecha_certificado', headerName: 'Fecha del certificado', width: 230 },
  { field: 'anotacion_certificado', headerName: 'Anotacion', width: 160 },

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
  const [cliente, setCiente] = useState(JSON.parse(localStorage.getItem('client')));
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const fetchDataCertificado = async () => {
      try {
        console.log(cliente.id)
        const response = await axios.get(`http://localhost:4321/registro/descarga_certificado/${cliente.id}`);
        const rowsWithIds = response.data[0].map((row, index) => ({ ...row, id: index + 1 }));
        setDatos(rowsWithIds);
      } catch (error) {
        console.error("No estoy trayendo los datos", error);
      }
    };
    fetchDataCertificado();
  }, [])

  return (
    <div className='flex gap-3'>
      <Sidebar />
      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          top: 10,
          right: 6,
          bottom: 5,
          left: 'calc(22% + 3px)',
          p: [2, 3, 4],
          width: '77%',
          display: 'flex',
          overflow: 'auto'
        }}
      >
        <Botonera
          title='Descargar Certificados'
          descarga={<DescargaCertificado
            selectId={selectId}
            tooltip='Descargar Certificado'
            bgColor='success'
            icon={<DocumentArrowDownIcon className='w-6 h-6' />}
            />}
        />
        <DataTable rows={datos} columns={columns} selectId={saveSelectId} />
        <WhatsAppComponent />
      </Stack>
    </div>
  )
}


