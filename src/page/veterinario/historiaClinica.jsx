import React from 'react'
import Sidebar from "../../components/sidebarComponent"
import DataTable from '../../components/dash/dataTable'
import useSelectId from '../../Hooks/useSelectId';
import Botonera from '../../components/dash/botonera'
import useSelectRow from '../../Hooks/useSelectRow';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { FormAgregarHistoriaClinica } from "../../components/veterinario/agregarHistoria"
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';
import dayjs from 'dayjs';

const columns = [
    { field: 'tipo_documento', headerName: 'Tipo documento', width: 120 },
    { field: 'N_documento', headerName: 'Numero documento', width: 130 },
    { field: 'nombre', headerName: 'Nombre de la mascota', width: 120 },
    { field: 'especie', headerName: 'Especie', width: 130 },
    { field: 'raza', headerName: 'Raza', width: 100 },
    { field: 'color', headerName: 'Color', width: 100 },
    { field: 'sexo', headerName: 'Sexo', width: 100 },
    { field: 'fecha_control', headerName: 'Fecha de control', width: 100 },
    { field: 'observaciones', headerName: 'Observaciones', width: 150 },

]

const rows = [
    {
        id: 1,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        nombre: 'Tommy',
        especie: 'Gato',
        raza: 'Siberiano',
        color: 'Negro y gris',
        sexo: 'Macho',
        fecha_control: '20-10-2023',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 2,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        nombre: 'Tommy',
        especie: 'Gato',
        raza: 'Siberiano',
        color: 'Negro y gris',
        sexo: 'Macho',
        fecha_control: '20-10-2023',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 3,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        nombre: 'Tommy',
        especie: 'Gato',
        raza: 'Siberiano',
        color: 'Negro y gris',
        sexo: 'Macho',
        fecha_control: '20-10-2023',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 4,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        nombre: 'Tommy',
        especie: 'Gato',
        raza: 'Siberiano',
        color: 'Negro y gris',
        sexo: 'Macho',
        fecha_control: '20-10-2023',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
    {
        id: 5,
        tipo_documento: 'C.C',
        N_documento: '1012438733',
        nombre: 'Tommy',
        especie: 'Gato',
        raza: 'Siberiano',
        color: 'Negro y gris',
        sexo: 'Macho',
        fecha_control: '20-10-2023',
        observaciones: 'se obeserva que el gato es muy feliz'
    },
];

const defaultValues = {
    id: "",
    tipo_documento: '',
    N_documento: '',
    nombre: '',
    especie: '',
    raza: '',
    color: '',
    sexo: '',
    fecha_control: dayjs(),
    observaciones: ''

}

export default function Factura() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <div className='flex gap-9'>
            <Sidebar />
            <div className='mt-10'>
                <Botonera
                    title='Historia Clinica'
                    agregar={<FormAgregarHistoriaClinica
                        datosEditables={defaultValues}
                        icon={<PlusIcon className='w-6 h-6' />}
                        tooltip='Agregar Historia'
                        bgColor='secondary'
                        label='Agregar Historia Clinica' />}
                    editar={
                        <FormAgregarHistoriaClinica
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Editar Historia'
                            bgColor='primary'
                            label='Editar Historia Clinica'
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


