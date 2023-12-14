import React from 'react'
import Sidebar from '../../components/sidebarComponent'
import Botonera from '../../components/dash/botonera'
import { AgrearExamen } from '../../components/veterinario/agrearExamen'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import AlertaEliminar from '../../components/dash/alertaEliminar'
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion'
import { Stack } from '@mui/material'

const columns = [
    { field: 'nombreMascota', headerName: 'Nombre Mascota', width: 180 },
    { field: 'nombreDueño', headerName: 'Nombre Dueño', width: 200, 
    valueGetter: (params) =>
    `${params.row.nombreDueño || ''} ${params.row.apellidoDueño || ''}`},
    { field: 'N_documento', headerName: 'Documento Del Dueño', width: 200 },
    { field: 'tipoExamen', headerName: 'Tipo de Examen', width: 180 },
    { field: 'fecha_creacion', headerName: 'Fecha de Toma', width: 190 },
];

const rows = [
    { 
        id: 1,
        fecha_creacion: '2023-01-15',
        estado:'activo',
        idestado: 1,
        idmascota:'',
        nombreMascota: 'Max', 
        nombreDueño: 'Juan',
        apellidoDueño:'Pérez', 
        N_documento:'123',
        tipo_documento:'C.C',
        tipoExamen: 'CDV Ag Test',
    },
    { 
        id: 2, 
        fecha_creacion: '2023-02-03',
        estado:'activo',
        idestado: 1,
        idmascota:'',
        nombreMascota: 'Luna', 
        nombreDueño: 'Ana', 
        apellidoDueño:'García',
        N_documento:'1234',
        tipo_documento:'C.C',
        tipoExamen: 'FIV AB/FeLV',
    },
    { 
        id: 3, 
        fecha_creacion: '2023-03-10', 
        estado:'activo',
        idestado: 1,
        idmascota:'',
        nombreMascota: 'Rocky', 
        nombreDueño: 'Carlos ', 
        apellidoDueño:'López',
        N_documento:'12345',
        tipo_documento:'C.C',
        tipoExamen: 'Test CPV',
    },
    { 
        id: 4, 
        fecha_creacion: '2023-04-22', 
        estado:'activo',
        idestado: 1,
        idmascota:'',
        nombreMascota: 'Bella', 
        nombreDueño: 'María', 
        apellidoDueño:'Rodríguez',
        N_documento:'123456',
        tipo_documento:'C.C',
        tipoExamen: 'CDV Ag Test',
    },
    { 
        id: 5, 
        fecha_creacion: '2023-05-07', 
        estado:'activo',
        idestado: 1,
        idmascota:'',
        nombreMascota: 'Charlie', 
        nombreDueño: 'Pedro', 
        apellidoDueño:'González',
        N_documento:'1234567',
        tipo_documento:'C.C',
        tipoExamen: 'FIV AB/FeLV',
    },
    { 
        id: 6, 
        fecha_creacion: '2023-06-18', 
        estado:'activo',
        idestado: 1,
        idmascota:'',
        nombreMascota: 'Milo', 
        nombreDueño: 'Laura', 
        apellidoDueño:'Martínez',
        N_documento:'12345678',
        tipo_documento:'C.C',
        tipoExamen: 'Test CPV',
    },

];

const defaultValues = {
  id: '',
  fecha_creacion: dayjs(),
  estado: '',
  idestado: 1,
  idMascota: '',
  nombreMascota: '',
  nombreDueño: '',
  apellidoDueño:'',
  N_documento: '',
  tipo_documento: 'C.C',
  idTipoExamen:'',
  tipoExamen:''
}

function Examenes() {
    const {selectId, saveSelectId} = useSelectId()
  const {selectRow, saveSelectRow} = useSelectRow()
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
            datosEditables={defaultValues}
            icon={<PlusIcon className='w-6 h-6' /> }
            tooltip='Agregar Examen'
            bgColor='secondary'
            label='Agregar Examen Medico'/>
          }
          editar={
            <AgrearExamen
              icon={<PencilSquareIcon className='w-6 h-6' />}
              tooltip='Editar Examen'
              bgColor='primary'
              label='Editar Examen'
              datosEditables={selectRow}
            />
          }
          descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Examen' />}
          eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Desactivar Examen' />}
        />
        <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
      </Stack>
    </div>
  )
}

export default Examenes