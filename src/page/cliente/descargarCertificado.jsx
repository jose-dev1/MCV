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

const columns = [
    { field: 'nombre', headerName: 'Nombre del la mascota', width: 270 },
    { field: 'Fecha', headerName: 'Fecha de expedidicon del certificado', width: 230 },
    { field: 'documento', headerName: 'Numero de documento', width: 160 },
    { field: 'tipo', headerName: 'Tipo de certificado', width: 180 },
  ]

  const rows = [
    {
      id: 1,
      nombre: 'Tommy',
      Fecha: '20-10-2023',
      documento: '1012438733',
      tipo:"Viaje"
    },
    {
      id: 2,
      nombre: 'Tommy',
      Fecha: '20-10-2023',
      documento: '1012438733',
      tipo:"Certificado de desparacitacion"
    },
    {
      id: 3,
      nombre: 'Tommy',
      Fecha: '20-10-2023',
      documento: '1012438733',
      tipo:"Vacunacion"
    },
    {
      id: 4,
      nombre: 'Tommy',
      Fecha: '20-10-2023',
      documento: '1012438733',
      tipo:"Vacunacion"
    },
    {
      id: 5,
      nombre: 'Tommy',
      Fecha: '20-10-2023',
      documento: '1012438733',
      tipo:"Certificado de desparacitacion"
    },
    {
      id: 6,
      nombre: 'Tommy',
      Fecha: '20/10/2023',
      documento: '1012438733',
      tipo:"Viaje"
    },
    {
      id: 7,
      nombre: 'Tommy',
      Fecha: '20/10/2023',
      documento: '1012438733',
      tipo:"Viaje"
    },
    {
      id: 8,
      nombre: 'Tommy',
      Fecha: '20/10/2023',
      documento: '1012438733',
      tipo:"Viaje"
    },
    {
      id: 9,
      nombre: 'Tommy',
      Fecha: '20/10/2023',
      documento: '1012438733',
      tipo:"Viaje"
    },
    {
      id: 10,
      nombre: 'Tommy',
      Fecha: '20/10/2023',
      documento: '1012438733',
      tipo:"Viaje"
    }
  ];

function AlertaDescargar(props) {
    const {idSeleccionado, tooltip } = props
    const [desabilitado, setDesabilitado] = useState(idSeleccionado.length === 0)
  
    useEffect(() => {
      setDesabilitado(idSeleccionado.length === 0)
    }, [idSeleccionado, setDesabilitado])
  
    const handleClick = () =>{
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
    const {selectId, saveSelectId} = useSelectId()
    const {selectRow, saveSelectRow} = useSelectRow() 
  return (
    <div className='flex gap-9'>
      <Sidebar/>
        <div className='mt-10'>
        <Botonera
          title='Descargar Certificados'
          descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Certificado' />}
          />
           <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
        </div>
    
    </div>
  )
}


