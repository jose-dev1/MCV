import { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebarComponent'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import { FormAgregarCertificado } from '../../components/veterinario/agregarCertificadoComponente';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertEliminar from '../../components/dash/alertEliminar'
import Stack from '@mui/material/Stack';
import axios from 'axios';
import dayjs from 'dayjs';
import AlertPrincipal from '../../components/dash/alertPrincipal';
import { DescargaCertificado } from '../../components/veterinario/descargarCertificado';
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
const columns = [
  {field: 'documento_cliente', headerName: 'Nombre Cliente', width: 230},
  {field: 'nombre_completo', headerName: 'Telefono contacto', width: 230},
  { field: 'nombre_mascota', headerName: 'Nombre Mascota', width: 200 },
  { field: 'fecha_certificado', headerName: 'Fecha Creacion', width: 160,
  valueGetter: (params) =>
  `${dayjs(params.row.fecha_certificado).format('MM-DD-YYYY HH:MM')}`},
];

export default function Certificado () {

  const { selectId, saveSelectId } = useSelectId()
  const [dataMostrar, setDataMostrar] = useState([]);
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)
  const [success,setSuccess] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/certificados/');
        setDataMostrar(result.data)
      } catch (error) {
        setDataMostrar([])
        error.response ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
      }
    };
  
    fetchData();
  }, [actualizar]);

  return (
    <div className='flex gap-9'>
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
          title='Certificados registradas'
          agregar={<FormAgregarCertificado
            icon={<PlusIcon className='w-6 h-6' /> }
            tooltip='Agregar Certificado'
            bgColor='secondary'
            label='Agregar Certificado'
            actualizar= {setActualizar}
            dato={actualizar}
            id={null}
            successMessage={setSuccess}
            errorMessage={setError}/>}
          editar={
            <FormAgregarCertificado 
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Certificado'
              bgColor='primary'
              label='Editar Certificado'
              id={selectId}
              actualizar= {setActualizar}
              dato={actualizar}
              successMessage={setSuccess}nerar la previsualizacion del PDF
              errorMessage={setError}
            />
          } 
          eliminar={<AlertEliminar 
            idSeleccionado={selectId} 
            tooltip='Desactivar Certificado' 
            titulo='¿Desea desactivar el certificado?'
            endPoint='certificados/delete'
            menssage='Por favor, especifique el motivo por el cual desea desactivar el certificado. Tenga en cuenta que este cambio es irreversible.'
            actualizar= {setActualizar}
            dato={actualizar}/>}
            descarga={<DescargaCertificado
              selectId={selectId}
              tooltip='Descargar Certificado'
              bgColor='success'
              icon={<DocumentArrowDownIcon className='w-6 h-6' />}
              />}
          />
        <DataTable rows={dataMostrar} columns={columns} selectId={saveSelectId} />
        </Stack>
        <AlertPrincipal severity='error' message={error}/>
        <AlertPrincipal severity='success' message={success}/>
    </div>
  )
}
