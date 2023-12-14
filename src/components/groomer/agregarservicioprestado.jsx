import DataTable from '../../components/dash/dataTable'
import React, { useState } from "react";
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import Botonera from '../../components/dash/botonera'
import { FormServisGroomer } from '../../components/groomer/agregarDataServis';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaDescargar from '../../components/veterinario/descargarHospitalizacion';


const columns = [
    { field: 'nombreDueno', headerName: 'Nombre del dueño', width: 130 },
    { field: 'nombreMascota', headerName: 'Nombre de la mascota', width: 130 },
    { field: 'fechaAplicacion', headerName: 'Fecha', width: 130 },
    { field: 'servicio', headerName: 'Servicio', width: 170 },
    { field: 'tipomascota', headerName: 'Tipo de mascota', width: 120 }
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
        fechaAplicacion: '2023-07-20',
        servicio: 'Baño ',
        tipomascota: 'Perro'
    },
    {
        id: '2',
        nombreDueno: 'Samuel Alejandro Vasquez Hernandez',
        nombreMascota: 'SACHA',
        fechaAplicacion: '2023-07-20',
        servicio: 'Baño ',
        tipomascota: 'Perro'
    },
    {
        id: '3',
        nombreDueno: 'María Fernández López',
        nombreMascota: 'Pelusa',
        fechaAplicacion: '2023-07-21',
        servicio: 'Corte de pelo',
        tipomascota: 'Gato'
    },
    {
        id: '4',
        nombreDueno: 'Roberto Ramírez',
        nombreMascota: 'Rocky',
        fechaAplicacion: '2023-07-21',
        servicio: 'Baño y cepillado',
        tipomascota: 'Perro'
    },
    {
        id: '5',
        nombreDueno: 'Laura Gómez',
        nombreMascota: 'Nube',
        fechaAplicacion: '2023-07-22',
        servicio: 'Baño',
        tipomascota: 'Conejo'
    },
    {
        id: '6',
        nombreDueno: 'Ana Martínez',
        nombreMascota: 'Luna',
        fechaAplicacion: '2023-07-23',
        servicio: 'Corte de uñas',
        tipomascota: 'Gato'
    },
    {
        id: '7',
        nombreDueno: 'Carlos Sánchez',
        nombreMascota: 'Max',
        fechaAplicacion: '2023-07-23',
        servicio: 'Baño y peluquería',
        tipomascota: 'Perro'
    },
    {
        id: '8',
        nombreDueno: 'Isabel Torres',
        nombreMascota: 'Coco',
        fechaAplicacion: '2023-07-24',
        servicio: 'Baño',
        tipomascota: 'Perro'
    },
    {
        id: '9',
        nombreDueno: 'Javier Rodríguez',
        nombreMascota: 'Kiara',
        fechaAplicacion: '2023-07-24',
        servicio: 'Corte de pelo',
        tipomascota: 'Gato'
    },
    {
        id: '10',
        nombreDueno: 'Marta Pérez',
        nombreMascota: 'Buddy',
        fechaAplicacion: '2023-07-25',
        servicio: 'Baño y cepillado',
        tipomascota: 'Perro'
    },
    {
        id: '11',
        nombreDueno: 'Pedro Gutiérrez',
        nombreMascota: 'Lucky',
        fechaAplicacion: '2023-07-25',
        servicio: 'Corte de uñas',
        tipomascota: 'Perro'
    },
    {
        id: '12',
        nombreDueno: 'Luisa Martínez',
        nombreMascota: 'Simba',
        fechaAplicacion: '2023-07-26',
        servicio: 'Baño y peluquería',
        tipomascota: 'Gato'
    },
    {
        id: '13',
        nombreDueno: 'Ricardo Soto',
        nombreMascota: 'Daisy',
        fechaAplicacion: '2023-07-26',
        servicio: 'Baño',
        tipomascota: 'Perro'
    },
    {
        id: '14',
        nombreDueno: 'Carmen López',
        nombreMascota: 'Toby',
        fechaAplicacion: '2023-07-27',
        servicio: 'Corte de pelo',
        tipomascota: 'Perro'
    },
    {
        id: '15',
        nombreDueno: 'Francisco Morales',
        nombreMascota: 'Nina',
        fechaAplicacion: '2023-07-27',
        servicio: 'Baño y cepillado',
        tipomascota: 'Gato'
    },
    {
        id: '16',
        nombreDueno: 'Beatriz Silva',
        nombreMascota: 'Lola',
        fechaAplicacion: '2023-07-28',
        servicio: 'Corte de uñas',
        tipomascota: 'Gato'
    },
    {
        id: '17',
        nombreDueno: 'Jorge Torres',
        nombreMascota: 'Charlie',
        fechaAplicacion: '2023-07-28',
        servicio: 'Baño y peluquería',
        tipomascota: 'Perro'
    },
    {
        id: '18',
        nombreDueno: 'Gloria Rodríguez',
        nombreMascota: 'Oreo',
        fechaAplicacion: '2023-07-29',
        servicio: 'Baño',
        tipomascota: 'Perro'
    },
    {
        id: '19',
        nombreDueno: 'Raúl Martínez',
        nombreMascota: 'Misty',
        fechaAplicacion: '2023-07-29',
        servicio: 'Corte de pelo',
        tipomascota: 'Gato'
    },
    {
        id: '20',
        nombreDueno: 'Patricia Pérez',
        nombreMascota: 'Bella',
        fechaAplicacion: '2023-07-30',
        servicio: 'Baño y cepillado',
        tipomascota: 'Perro'
    }

]

export default function VacunasRegistradas() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <>
            <div className="mt-10 w-full">
                <Botonera
                    title='Servicios registrados'
                    agregar={<FormServisGroomer
                        datosEditables={defaultValues}
                        icon={<PlusIcon className='w-6 h-6' />}
                        tooltip='Agregar Servicio'
                        bgColor='secondary'
                        label='Agregar Servicio' />}
                    editar={
                        <FormServisGroomer
                            icon={<PencilSquareIcon className='w-6 h-6' />}
                            tooltip='Editar servicio'
                            bgColor='primary'
                            label='Editar Servicio'
                            datosEditables={selectRow}
                        />
                    }
                    eliminar={<AlertaEliminar idSeleccionado={selectId} tooltip='Eliminar Servicio' />}
                    descarga={<AlertaDescargar idSeleccionado={selectId} tooltip='Descargar Registro' />}
                />
                <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
            </div>
        </>
    )
}
