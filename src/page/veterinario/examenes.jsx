import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebarComponent'
import Botonera from '../../components/dash/botonera'
import { AgrearExamen } from '../../components/veterinario/agrearExamen'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId'
// import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion'
import { Stack } from '@mui/material'
import axios from 'axios'
import AlertEliminar from '../../components/dash/alertEliminar'
import dayjs from 'dayjs'
import AlertPrincipal from '../../components/dash/alertPrincipal'

const columns = [
    { field: 'nombre_mascota', headerName: 'Nombre Mascota', width: 150 },
    { field: 'nombreDueño', headerName: 'Nombre Dueño', width: 160, 
    valueGetter: (params) =>
    `${params.row.primer_nombre_cliente || ''} ${params.row.primer_apellido_cliente || ''}`},
    { field: 'numero_documento_cliente', headerName: 'Documento Del Dueño', width: 180 },
    { field: 'tipo_examen', headerName: 'Tipo de Examen', width: 150 },
    { field: 'fecha_toma_muestra_examen', headerName: 'Fecha de Toma', width: 200, 
    valueGetter: (params) =>
    `${dayjs(params.row.fecha_toma_muestra_examen).format('MM-DD-YYYY')}` },
    { field: 'registro_completo_examen', headerName: 'Examen Completo?', width: 140,valueGetter: (params) =>
    `${params.row.registro_completo_examen === 1 ? 'Si' : 'No'}` },
];

function Examenes() {
  const {selectId, saveSelectId} = useSelectId()
  const [rows, setRows] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
  const [actualizar, setActualizar] = useState(false)
  useEffect(() => {
    const fectchData = async () => {
      try {
        const result = await axios.get('http://localhost:4321/examenesVeterinario')
        setRows(result.data)
      } catch (error) {
        setError('Error' + error.message)
      }
    }
    fectchData()
  }, [actualizar])
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
          title='Examenes Medicos'
          agregar={<AgrearExamen
            icon={<PlusIcon className='w-6 h-6' /> }
            tooltip='Agregar Examen'
            bgColor='secondary'
            label='Agregar Examen Medico'
            actualizar={setActualizar}
            dato={actualizar}
            id={null}
            successMessage={setSuccess}
            errorMessage={setError}/>
            
          }
          editar={
            <AgrearExamen
            icon={<PencilSquareIcon className='w-6 h-6' /> }
            tooltip='Agregar Examen'
            bgColor='secondary'
            label='Agregar Examen Medico'
            actualizar={setActualizar}
            dato={actualizar}
            id={selectId}
            successMessage={setSuccess}
            errorMessage={setError}/>

          }
          // descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Examen' />}
          eliminar={<AlertEliminar 
            idSeleccionado={selectId} 
            tooltip='Desactivar Examen' 
            titulo='¿Desea desactivar el examen seleccionada?'
            endPoint='examenesVeterinario/delete'
            menssage='Por favor, especifique el motivo por el cual desea desactivar el examen. Tenga en cuenta que este cambio es irreversible.'
            actualizar= {setActualizar}
            dato={actualizar}/>}
        />
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} />
      </Stack>
      <AlertPrincipal severity='error' message={error}/>
      <AlertPrincipal severity='success' message={success}/>
    </div>
  )
}

export default Examenes