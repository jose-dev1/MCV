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
  { field: 'fecha_certificado', headerName: 'Fecha del certificado', width: 230, width: 150, valueGetter: (params) => new Date(params.row.fecha_certificado).toLocaleDateString('es-ES') },
  { field: 'informacion_adicional_certificado', headerName: 'Informacion Adicional', width: 270 },

]

export default function DescargarCertificado() {
  const { selectId, saveSelectId } = useSelectId();
  const [cliente, setCliente] = useState(JSON.parse(localStorage.getItem('client')));

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetchData();
  }, [cliente]);

  const fetchData = async () => {
    try {
      if (cliente && cliente.id) {
        const responseCertificado = await axios.get(`http://localhost:4321/registro/descarga_certificado/${cliente?.id}`);
        setDatos(responseCertificado.data[0]);
      } else {
        setDatos([]);
      }
    } catch (error) {
      console.error("No se pueden cargar los datos", error);
    }
  };


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
  );
}


