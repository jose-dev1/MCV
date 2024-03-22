import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebarComponent";
import DataTable from '../../components/dash/dataTable';
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera';
import Swal from "sweetalert2";
import Stack from '@mui/material/Stack';
import Boton from "../../components/dash/boton";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import WhatsAppComponent from '../../components/whatsappComponent';
import axios from 'axios';
import { DescargaExamen } from '../../components/veterinario/descargarExamen'

const columns = [
  { field: 'nombre_mascota', headerName: 'Mascota', width: 100 },
  { field: 'fecha_toma_muestra_examen', headerName: 'Fecha del examen', width: 150, valueGetter: (params) => new Date(params.row.fecha_toma_muestra_examen).toLocaleDateString('es-ES') },
  { field: 'tipo_examen', headerName: 'Tipo del examen', width: 150 },
  { field: 'registro_completo_examen', headerName: 'Estado del examen', width: 160, valueGetter: (params) => params.row.registro_completo_examen === 1 ? 'Examen Completado' : 'Examen Pendiente' },
  { field: 'resultado_examen', headerName: 'Resultado del examen', width: 300 },
];

export default function DescargarExamen() {
  const { selectId, saveSelectId } = useSelectId();
  const [rows, setRows] = useState([]);
  const [cliente, setCliente] = useState(JSON.parse(localStorage.getItem('client')));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`http://localhost:4321/registro/descarga_examen/${cliente?.id}`);
        setRows(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (!cliente) {
      Swal.fire({
        title: 'No registrado como cliente',
        text: 'Por favor regístrese como cliente para acceder a esta funcionalidad.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    } else {
      fetchData1();
    }
  }, [cliente]);

  console.log(rows);

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
          title='Descargar Examenes'
          descarga={<DescargaExamen
            selectId={selectId}
            tooltip='Descargar Certificado'
            bgColor='success'
            icon={<DocumentArrowDownIcon className='w-6 h-6' />}
          />}
        />
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} />
        <WhatsAppComponent />
      </Stack>
    </div>
  )
}
