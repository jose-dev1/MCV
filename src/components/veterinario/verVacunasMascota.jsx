import { Modal } from '@mui/material'
import { useState, useEffect } from 'react'
import Boton from '../dash/boton'
import { useHabilitar } from '../../Hooks/useHabilitar';
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import { Maurisio } from '../../components/veterinario/agregarVacuanciom'
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import AlertEliminar from '../../components/dash/alertEliminar';
import dayjs from 'dayjs';
import AlertPrincipal from '../../components/dash/alertPrincipal';

const columns = [
  { field: 'nombre_vacuna', headerName: 'Vacuna Aplicada', width: 150 },
  { field: 'laboratorio', headerName: 'Laboratorio', width: 150 },
  { field: 'lote_vacuna_aplicada', headerName: 'Lote Vacuna', width: 150 },
  {
    field: 'fecha_vacuna_aplicada', headerName: 'Fecha Aplicacion', width: 150,
    valueGetter: (params) =>
      `${dayjs(params.row.fecha_vacuna_aplicada).format('MM-DD-YYYY')}`
  },
  {
    field: 'estado_vacuna_aplicada', headerName: 'Estado', width: 130,
    valueGetter: (params) =>
      `${params.row.estado_vacuna_aplicada === 1 ? 'Activo' : 'Desactivado'}`
  }
];

export const VerVacunasMascota = (props) => {
  const { id, bgColor, icon, tooltip } = props

  const [open, setOpen] = useState(false)
  const { desabilitado } = useHabilitar({ id })
  const { selectId, saveSelectId } = useSelectId()
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [actualizar, setActualizar] = useState(false)
  const [success, setSuccess] = useState('')
  const [tablavisible, setTablavisible ] = useState('')
  

  useEffect(() => {
    const fectchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4321/carnet/ver/${id}`)
        setData(result.data)
      } catch (error) {
        setData([])
        error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
      }
    }
    if (id) fectchData()
  }, [actualizar])


  const handleModal = async () => {
    try {
      setSuccess('')
      setError('')
      const result = await axios.get(`http://localhost:4321/carnet/ver/${id}`)
      setData(result.data)
    } catch (error) {
      setData([])
      error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
    }
    setOpen(true)
  }


  const handleClose = () => {
    saveSelectId('')
    setOpen(false)
    setTablavisible(false)
    
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
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className='min-h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-black rounded-lg shadow p-4 bg-white'>
          <Botonera
            title='Gestionar Vacuna Mascota Seleccionada'
            agregar={<Maurisio
              icon={<PlusIcon className='w-6 h-6' />}
              tooltip='Agregar vacuna'
              bgColor='secondary'
              label='Agregar Vacuna'
              actualizar={setActualizar}
              dato={actualizar}
              id={null}
              idMascota={id}
              successMessage={setSuccess} />}
            editar={
              <Maurisio
                icon={<PencilSquareIcon className='w-6 h-6' />}
                tooltip='Editar Vacuna'
                bgColor='primary'
                label='Editar Vacuna'
                actualizar={setActualizar}
                dato={actualizar}
                id={selectId}
                idMascota={id}
                successMessage={setSuccess}
              />
            }
            eliminar={<AlertEliminar
              idSeleccionado={selectId}
              tooltip='Desactivar vacuna'
              titulo='¿Desea desactivar la vacuna seleccionada?'
              endPoint='carnet/delete'
              menssage='Por favor, especifique el motivo por el cual desea desactivar esta vacuna. Tenga en cuenta que este cambio es irreversible.'
              actualizar={setActualizar}
              dato={actualizar} 
              />
            }
          />
          <DataTable rows={data} columns={columns} selectId={saveSelectId} />
          <AlertPrincipal severity='error' message={error} />
          <AlertPrincipal severity='success' message={success} />
        </div>
      </Modal>
    </div>
  )
}
