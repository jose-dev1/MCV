import DataTable from '../../components/dash/dataTable'
import React, { useState } from "react";
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import Botonera from '../../components/dash/botonera'
import { Maurisio } from '../../components/veterinario/agregarVacuanciom';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';


const columns = [
    { field: 'nombreDueno', headerName: 'Nombre del dueño', width: 130 },
    { field: 'nombreMascota', headerName: 'Nombre de la mascota', width: 130 },
    { field: 'fechaAplicacion', headerName: 'Fecha de aplicación', width: 130 },
    { field: 'vacunaAplicada', headerName: 'Vacuna aplicada', width: 170 },
    { field: 'laboratorio', headerName: 'Laboratorio', width: 120 }
];

const defaultValues = {
    id: '',
    nombreDueno: '',
    codigoMascota: '',
    nombreMascota: '',
    numeroDueno: '',
    correoDueno: '',
    fechaAplicacion: '',
    vacunaAplicada: '',
    laboratorio: ''
}

const rows = [
    {
        id: '1',
        nombreDueno: 'Juan Carlos González Pérez',
        nombreMascota: 'Firulais',
        correoDueno: 'juancarlos@example.com',
        fechaAplicacion: '2023-07-20',
        vacunaAplicada: 'Vacuna contra la rabia',
        laboratorio: 'Pfizer'
    },
    {
        id: '2',
        nombreDueno: 'María Elena López García',
        codigoMascota: '987654321',
        nombreMascota: 'Luna',
        numeroDueno: '3105432178',
        correoDueno: 'marialopez@example.com',
        fechaAplicacion: '2023-08-03',
        vacunaAplicada: 'Vacuna triple felina',
        laboratorio: 'Merck'
    },
    {
        id: '3',
        nombreDueno: 'Pedro José Martínez Sánchez',
        codigoMascota: '456123789',
        nombreMascota: 'Rocky',
        numeroDueno: '3006543210',
        correoDueno: 'pedromartinez@example.com',
        fechaAplicacion: '2023-09-06',
        vacunaAplicada: 'Vacuna contra la parvovirosis',
        laboratorio: 'Zoetis'
    },
    {
        id: '4',
        nombreDueno: 'Luisa Fernanda Ramírez Díaz',
        codigoMascota: '789456123',
        nombreMascota: 'Daisy',
        numeroDueno: '3115432179',
        correoDueno: 'luisaramirez@example.com',
        fechaAplicacion: '2023-10-10',
        vacunaAplicada: 'Vacuna contra la leptospirosis',
        laboratorio: 'Boehringer Ingelheim'
    },
]

export default function VacunasRegistradas() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <>
            <div className="mt-10 w-full">
                <Botonera
                    title='Vacunas Registradas'
                    agregar={<Maurisio
                        datosEditables={defaultValues}
                        icon={<PlusIcon className='w-6 h-6' />}
                        tooltip='Agregar Vacuna'
                        bgColor='secondary'
                        label='Agregar vacuna' />}
                    editar={
                        <Maurisio
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Editar Hospitalizaci'
                            bgColor='primary'
                            label='Editar Vacuna'
                            datosEditables={selectRow}
                        />
                    }
                    eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Vacuna' />}
                    descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Registro' />}
                />
                <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
            </div>
        </>
    )
}
