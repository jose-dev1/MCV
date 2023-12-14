import React from 'react'
import Sidebar from "../../components/sidebarComponent"
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';
import dayjs from 'dayjs';
import { FromAgregarDesparacitacion } from '../../components/veterinario/agregarDesparacitacion';

const columns = [
    { field: 'N_documento', headerName: 'Numero documento', width: 150 },
    { field: 'mascota', headerName: 'Nombre de la mascota', width: 250 },
    { field: 'tipo_desparacitacion', headerName: 'Tipo', width: 100 },
    { field: 'fecha_control', headerName: 'Fecha de control', width: 250 },
    { field: 'tipo_vacuna', headerName: 'Tipo Vacuna', width: 150 },


]

const rows = [
    {
        id: 1,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        mascota: 'Tommy',
        tipo_desparacitacion: 'Interna',
        fecha_control: '2023-01-01',
        peso: '25kg',
        tipo_vacuna: 'Rabia',
        proximo_control: '2023-04-012',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 2,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        mascota: 'Tommy',
        tipo_desparacitacion: 'Interna',
        fecha_control: '2023-01-01',
        peso: '25kg',
        tipo_vacuna: 'Rabia',
        proximo_control: '2023-04-012',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 3,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        mascota: 'Tommy',
        tipo_desparacitacion: 'Externa',
        fecha_control: '2023-01-01',
        peso: '25kg',
        tipo_vacuna: 'Rabia',
        proximo_control: '2023-04-012',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 4,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        mascota: 'Tommy',
        tipo_desparacitacion: 'Externa',
        fecha_control: '2023-01-01',
        peso: '25kg',
        tipo_vacuna: 'Rabia',
        proximo_control: '2023-04-012',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 5,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        mascota: 'Tommy',
        tipo_desparacitacion: 'Externa',
        fecha_control: '2023-01-01',
        peso: '25kg',
        tipo_vacuna: 'Rabia',
        proximo_control: '2023-04-012',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
];

const defaultValues = {
    id: "",
    tipo_documento: '',
    N_documento: '',
    mascota: '',
    tipo_desparacitacion: '',
    fecha_control: dayjs(),
    peso: '',
    tipo_vacuna: '',
    proximo_control: dayjs(),
    observaciones: ''

}

export default function Desparacitacion() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <div className='flex gap-20'>
            <Sidebar />
            <div className='mt-10'>
                <Botonera
                    title='Desparacitacion'
                    agregar={<FromAgregarDesparacitacion
                        datosEditables={defaultValues}
                        icon={<PlusIcon className='w-6 h-6' />}
                        tooltip='Agregar Desparacitacion'
                        bgColor='secondary'
                        label='Agregar Desparacitacion' />}
                    editar={
                        <FromAgregarDesparacitacion
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Agregar Desparacitacion'
                            bgColor='primary'
                            label='Editar Desparacitacion'
                            datosEditables={selectRow}
                        />
                    }
                    eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Historia' />}
                    descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Registro' />}
                />
                <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
            </div>

        </div>
    )
}


