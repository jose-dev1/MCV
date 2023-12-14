import React from 'react'
import Sidebar from "../../components/sidebarComponent"
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { FormAgregarFactura } from '../../components/auxiliar/agregarFactura';
import AlertaEliminar from '../../components/dash/alertaEliminar';
import dayjs from 'dayjs';

const columns = [
    { field: 'tipo_documento', headerName: 'Tipo documento', width: 170 },
    { field: 'N_documento', headerName: 'Numero de documento', width: 170 },
    { field: 'fecha_creacion', headerName: 'Fechas de facturacion', width: 180 },
    { field: 'primer_nombre', headerName: 'Nombre del cliente', width: 150 },
    { field: 'primer_apellido', headerName: 'Apellido del cliente', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 160 },
]

const rows = [
    {
        id: 1,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 2,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 3,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 4,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 5,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 6,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 7,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 8,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 9,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
    {
        id: 10,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        fecha_creacion: '10-02-2023',
        primer_nombre: 'Jose',
        primer_apellido: 'Castaño',
        valor: '$15.000',
    },
];

const defaultValues = {
    id: '',
    tipo_documento: '',
    N_documento: '',
    fecha_creacion: dayjs(),
    primer_nombre: '',
    primer_apellido: '',
    valor: '',
}

export default function Factura() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <div className='flex gap-9'>
            <Sidebar />
            <div className='mt-10'>
                <Botonera
                    title='Historial de facturas'
                    agregar={<FormAgregarFactura
                        datosEditables={defaultValues}
                        icon={<PlusIcon className='w-6 h-6' />}
                        tooltip='Agregar Factura'
                        bgColor='secondary'
                        label='Agregar Factura' />}
                    editar={
                        <FormAgregarFactura
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Editar Factura'
                            bgColor='primary'
                            label='Editar Factura'
                            datosEditables={selectRow}
                        />
                    }
                    eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Hospitalización' />}
                />
                <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
            </div>

        </div>
    )
}


