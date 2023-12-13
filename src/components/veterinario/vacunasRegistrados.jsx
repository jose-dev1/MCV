import DataTable from '../../components/dash/dataTable'
import React, { useState } from "react";


const columns = [
    { field: 'nombreDueno', headerName: 'Nombre del dueño', width: 130 },
    { field: 'codigoMascota', headerName: 'Código de la mascota', width: 130 },
    { field: 'nombreMascota', headerName: 'Nombre de la mascota', width: 130 },
    { field: 'numeroDueno', headerName: 'Número del dueño', width: 130 },
    { field: 'correoDueno', headerName: 'Correo del dueño', width: 250 },
    { field: 'fechaAplicacion', headerName: 'Fecha de aplicación', width: 130 },
    { field: 'vacunaAplicada', headerName: 'Vacuna aplicada', width: 170 },
    { field: 'laboratorio', headerName: 'Laboratorio', width: 120 }
];

const rows = [
    {
        id: '1',
        nombreDueno: 'Juan Carlos González Pérez',
        codigoMascota: '123456789',
        nombreMascota: 'Firulais',
        numeroDueno: '3214567890',
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
    return (
        <>
            <div className="mt-10 w-full">
                <DataTable rows={rows} columns={columns} />
            </div>
        </>
    )
}