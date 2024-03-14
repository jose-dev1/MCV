import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebarComponent";
import DataTable from '../../components/dash/dataTable';
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera';
import useSelectRow from '../../Hooks/useSelectRow';
import Swal from "sweetalert2";
import Boton from "../../components/dash/boton";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

const columns = [
  { field: 'fecha_registro_resultados_examen', headerName: 'Fecha de resultado del examen', width: 270 },
  { field: 'fecha_toma_muestra_examen', headerName: 'Fecha de muestra del examen', width: 230 },
  { field: 'resultado_examen', headerName: 'Resultado del examen', width: 180 },
  { field: 'estado_examen', headerName: 'Estado del examen', width: 180 },
]

function AlertaDescargar(props) {
  const { idSeleccionado, tooltip } = props;
  const [desabilitado, setDesabilitado] = useState(idSeleccionado ? idSeleccionado.length === 0 : true);

  useEffect(() => {
    setDesabilitado(idSeleccionado ? idSeleccionado.length === 0 : true);
  }, [idSeleccionado]);

  const handleClick = () => {
    Swal.fire({
      title: '¿Deseas descargar examen?',
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Descargando el examen medico", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se ha descargado el examen", "", "error");
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
        disabled={desabilitado}
      />
    </>
  )
}

export default function DescargarExamen() {
  const { selectId, saveSelectId } = useSelectId();
  const { selectRow, saveSelectRow } = useSelectRow();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4321/registro/descargar_examen");
        setDatos(response.data);
        console.log(response);
      } catch (error) {
        console.error("No estoy trayendo los datos", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex gap-40'>
      <Sidebar />
      <div className='mt-10'>
        <Botonera
          title='Descargar Examen Medicos'
          descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Certificado' />}
        />
        <DataTable rows={datos} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
      </div>
    </div>
  )
}
