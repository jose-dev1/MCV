import { Modal } from '@mui/material'
import { useState } from 'react'
import Boton from '../dash/boton'
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import axios from 'axios';
import AlertEliminar from '../../components/dash/alertEliminar';
import AlertPrincipal from '../../components/dash/alertPrincipal';
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { DescargaFactura } from './descargaFactura'

const columns = [
    { field: 'nombre_cliente', headerName: 'Nombre Cliente', width: 150 },
    { field: 'numero_documento_cliente', headerName: 'Numero de documento', width: 150 },
    {
        field: 'fecha_factura', headerName: 'Fecha de Facturacion', width: 150, valueGetter: (params) => new Date(params.row.fecha_factura).toLocaleDateString('es-ES')
    },
    {
        field: 'valor_factura', headerName: 'Valor de la factura', width: 130,
    },
    {
        field: 'factura_iva', headerName: 'Valor de la factura con iva', width: 250,
    }
];

export default function ModalFactura(props) {
    const { bgColor, icon, tooltip } = props
    const [open, setOpen] = useState(false)
    const { selectId, saveSelectId } = useSelectId()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [actualizar, setActualizar] = useState(false)
    const [success, setSuccess] = useState('')
    const handleModal = async () => {
        try {
            setSuccess('')
            setError('')
            const result = await axios.get(`http://localhost:4321/factura`)
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

    }

    return (
        <div>
            <Boton
                onClick={handleModal}
                bgColor={bgColor}
                icon={icon}
                tooltip={tooltip}
            />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='min-h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-solid border-black rounded-lg shadow p-4 bg-white'>
                    <Botonera
                        title='Ver Facturas'
                        eliminar={<AlertEliminar
                            idSeleccionado={selectId}
                            tooltip='Desactivar Factura'
                            titulo='¿Desea desactivar la Factura seleccionada?'
                            endPoint='factura/delete'
                            menssage='Por favor, especifique el motivo por el cual desea desactivar esta factura. Tenga en cuenta que este cambio es irreversible.'
                            actualizar={setActualizar}
                            dato={actualizar}
                        />
                        }
                        descarga={<DescargaFactura
                            selectId={selectId}
                            tooltip='Descargar Factura'
                            bgColor='success'
                            icon={<DocumentArrowDownIcon className='w-6 h-6' />}
                        />}
                    />
                    <DataTable rows={data} columns={columns} selectId={saveSelectId} />
                    <AlertPrincipal severity='error' message={error} />
                    <AlertPrincipal severity='success' message={success} />
                </div>
            </Modal>
        </div>
    )
}
