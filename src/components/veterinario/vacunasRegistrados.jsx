import DataTable from '../../components/dash/dataTable'
import React from "react";
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import Botonera from '../../components/dash/botonera'
import { Maurisio } from '../../components/veterinario/agregarVacuanciom';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';


const columns = [
    { field: 'nombreDueno', headerName: 'Nombre del dueño', width: 210 },
    { field: 'nombreMascota', headerName: 'Nombre de la mascota', width: 180 },
    { field: 'fechaAplicacion', headerName: 'Fecha de aplicación', width: 180 },
    { field: 'vacunaAplicada', headerName: 'Vacuna aplicada', width: 250 },
    { field: 'laboratorio', headerName: 'Laboratorio', width: 230 }
];

const defaultValues =     {
    id: '',
    idDocumento: 'C.C',
    numeroDocumento: '',
    nombreDueno: 'J',
    nombreMascota: '',
    correoDueno: '',
    fechaAplicacion: '',
    vacunaAplicada: '',
    laboratorio: '',
    idVacuna: 0
}

const rows = [
    {
        id: '1',
        idDocumento: 'C.C',
        numeroDocumento: '1234567890',
        nombreDueno: 'Juan González',
        nombreMascota: 'Firulais',
        correoDueno: 'juancarlos@example.com',
        fechaAplicacion: '2023-07-20',
        vacunaAplicada: 'Vacuna contra la rabia',
        laboratorio: 'Pfizer',
        idVacuna: 5 // Rabia
    },
    {
        id: '2',
        idDocumento: 'C.C',
        numeroDocumento: '2345678901',
        nombreDueno: 'María López',
        codigoMascota: '987654321',
        nombreMascota: 'Luna',
        numeroDueno: '3105432178',
        correoDueno: 'marialopez@example.com',
        fechaAplicacion: '2023-08-03',
        vacunaAplicada: 'Vacuna triple felina',
        laboratorio: 'Merck',
        idVacuna: 2 // Pentavalente
    },
    {
        id: '3',
        idDocumento: 'C.C',
        numeroDocumento: '3456789012',
        nombreDueno: 'Pedro Martínez',
        codigoMascota: '456123789',
        nombreMascota: 'Rocky',
        numeroDueno: '3006543210',
        correoDueno: 'pedromartinez@example.com',
        fechaAplicacion: '2023-09-06',
        vacunaAplicada: 'Vacuna contra la parvovirosis',
        laboratorio: 'Zoetis',
        idVacuna: 1 // Parvovirosi
    },
    {
        id: '4',
        idDocumento: 'C.E',
        numeroDocumento: '4567890123',
        nombreDueno: 'Luisa Ramírez',
        codigoMascota: '789456123',
        nombreMascota: 'Daisy',
        numeroDueno: '3115432179',
        correoDueno: 'luisaramirez@example.com',
        fechaAplicacion: '2023-10-10',
        vacunaAplicada: 'Vacuna triple felina', // Replaced with a different vaccine from the list
        laboratorio: 'Boehringer Ingelheim',
        idVacuna: 2 // Pentavalente
    },
    {
        id: '5',
        idDocumento: 'C.C',
        numeroDocumento: '5678901234',
        nombreDueno: 'Carlos Rodríguez',
        codigoMascota: '321654987',
        nombreMascota: 'Buddy',
        numeroDueno: '3154321098',
        correoDueno: 'carlosrodriguez@example.com',
        fechaAplicacion: '2023-11-25',
        vacunaAplicada: 'Vacuna contra la tos de perreras (opcional) (KC)*', // Another entry
        laboratorio: 'SomeLab', // Replace with the actual laboratory name
        idVacuna: 6 // Tos de perreras (opcional) (KC)*
    },
    // Add your new object here with idDocumento, numeroDocumento, and idVacuna...
];

export default function VacunasRegistradas() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <>
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
        </>
    )
}
