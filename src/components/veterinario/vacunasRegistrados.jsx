import DataTable from '../../components/dash/dataTable'
import React, { useState } from "react";


const columns = [
    { field: 'firstName', headerName: 'Primer Nombre', width: 130 },
    { field: 'firstLastName', headerName: 'Primer Apellido', width: 130 },
    { field: 'document', headerName: 'Numero de documento', width: 130 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'rol', headerName: 'Cargo', width: 170 },
    { field: 'estado', headerName: 'Estado', width: 120 }
];


const rows = [
    {
        id: '1',
        firstName: 'Juan',
        secondName: 'Carlos',
        firstLastName: 'González',
        secondLastName: 'Pérez',
        document: '123456789',
        documentType: 'C.C',
        userName: 'juancar123',
        password: 'contraseña123',
        email: 'juancarlos@example.com',
        emailType: 1,
        position: 1,
        rol: 'Groomer',
        idEstado: 1,
        estado: 'Activo'
    },
    {
        id: '2',
        firstName: 'María',
        secondName: 'Elena',
        firstLastName: 'López',
        secondLastName: 'García',
        document: '987654321',
        documentType: 'C.C',
        userName: 'marialo',
        password: 'clave456',
        email: 'marialopez@example.com',
        emailType: 1,
        position: 2,
        rol: 'Asistente Veterinario',
        idEstado: 1,
        estado: 'Activo'
    },
    {
        id: '3',
        firstName: 'Pedro',
        secondName: 'José',
        firstLastName: 'Martínez',
        secondLastName: 'Sánchez',
        document: '456123789',
        documentType: 'C.C',
        userName: 'pedromar',
        password: 'pedro123',
        email: 'pedromartinez@example.com',
        emailType: 1,
        position: 1,
        rol: 'Groomer',
        idEstado: 0,
        estado: 'Inactivo'
    },
    {
        id: '4',
        firstName: 'Luisa',
        secondName: 'Fernanda',
        firstLastName: 'Ramírez',
        secondLastName: 'Díaz',
        document: '789456123',
        documentType: 'C.C',
        userName: 'luradi',
        password: 'luisa456',
        email: 'luisaramirez@example.com',
        emailType: 1,
        position: 2,
        rol: 'Asistente Veterinario',
        idEstado: 1,
        estado: 'Activo'
    },
    {
        id: '5',
        firstName: 'Andrés',
        secondName: 'Felipe',
        firstLastName: 'Santos',
        secondLastName: 'Castro',
        document: '321654987',
        documentType: 'C.C',
        userName: 'andresfc',
        password: 'andres123',
        email: 'andresfelipe@example.com',
        emailType: 1,
        position: 1,
        rol: 'Groomer',
        idEstado: 0,
        estado: 'Inactivo'
    }
];


export default function vacunasRegis() {
    <div className="mt-20">
        <DataTable rows={rows} columns={columns} />
    </div>
}