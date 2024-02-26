import DataTable from '../../components/dash/dataTable'
import React, { useState } from "react";
import useSelectId from '../../Hooks/useSelectId'
import useSelectRow from '../../Hooks/useSelectRow'
import Botonera from '../../components/dash/botonera'
import { FormServisGroomer } from '../../components/groomer/agregarDataServis';
import { PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import AlertaEliminar from '../../components/dash/alertaEliminar';
import AlertaVer from './modalVerGroo';


const columns = [
    { field: 'nombreDueno', headerName: 'Nombre del dueño', width: 200 },
    { field: 'nombreMascota', headerName: 'Nombre de la mascota', width: 200 },
    { field: 'fechaAplicacion', headerName: 'Fecha', width: 170 },
    { field: 'servicio', headerName: 'Servicio', width: 170 },
    { field: 'tipomascota', headerName: 'Tipo de mascota', width: 120 },
    { field: 'descripcionEstado', headerName: 'Estado', width: 120 }
];

const defaultValues = {
    id: '',
    nombreDueno: '',
    nombreMascota: '',
    fechaAplicacion: '',
    servicio: '',
    tipomascota: '',
    idEstado: 1,
    descripcionEstado: '',
    idDocumento: 'C.C',
    numeroDocumento: '',
    notaServicio: '',
    idServicio:1,
}

const rows = [
    {
        id: '1',
        nombreDueno: 'Juan Carlos González Pérezz',
        nombreMascota: 'Firulais',
        fechaAplicacion: '2023-07-20',
        servicio: 'Baño',
        tipomascota: 'Perro',
        idEstado: 0,
        descripcionEstado: 'finalizado',
        idDocumento: 'C.C',
        numeroDocumento: '1234567890',
        notaServicio: ' Fecha: 2024 02 01 Servicio excelente, el perro quedó muy limpio y feliz.  Fecha: 2024 02 01 Servicio excelente, el perro quedó muy limpio y feliz.  Fecha: 2024 02 01 Servicio excelente, el perro quedó muy limpio y feliz.',
        idServicio: '1'
    },
    {
        id: '2',
        nombreDueno: 'Samuel Alejandro Vasquez Hernandez',
        nombreMascota: 'SACHA',
        fechaAplicacion: '2023-07-20',
        servicio: 'Baño',
        tipomascota: 'Perro',
        idEstado: 1,
        descripcionEstado: 'activo',
        idDocumento: 'C.E',
        numeroDocumento: '0987654321',
        notaServicio: 'Baño relajante, el perro disfrutó cada momento.',
        idServicio: '1'
    },
    {
        id: '3',
        nombreDueno: 'María Fernández López',
        nombreMascota: 'Pelusa',
        fechaAplicacion: '2023-07-21',
        servicio: 'Corte de pelo',
        tipomascota: 'Gato',
        idEstado: 0,
        descripcionEstado: 'finalizado',
        idDocumento: 'C.C',
        numeroDocumento: '5678901234',
        notaServicio: 'Corte de pelo impecable, la gata se ve muy elegante.',
        idServicio: '2'
    },
    {
        id: '4',
        nombreDueno: 'Roberto Ramírez',
        nombreMascota: 'Rocky',
        fechaAplicacion: '2023-07-21',
        servicio: 'Baño y cepillado',
        tipomascota: 'Perro',
        idEstado: 1,
        descripcionEstado: 'activo',
        idDocumento: 'C.E',
        numeroDocumento: '3456789012',
        notaServicio: 'Baño y cepillado completo, el perro está radiante.',
        idServicio: '3'
    },
    {
        id: '5',
        nombreDueno: 'Laura Gómez',
        nombreMascota: 'Nube',
        fechaAplicacion: '2023-07-22',
        servicio: 'Baño',
        tipomascota: 'Conejo',
        idEstado: 0,
        descripcionEstado: 'finalizado',
        idDocumento: 'C.C',
        numeroDocumento: '6789012345',
        notaServicio: 'Baño suave y cuidadoso, la conejita está encantada.',
        idServicio: '1'
    },
    {
        id: '6',
        nombreDueno: 'Ana Martínez',
        nombreMascota: 'Luna',
        fechaAplicacion: '2023-07-23',
        servicio: 'Corte de uñas',
        tipomascota: 'Gato',
        idEstado: 1,
        descripcionEstado: 'activo',
        idDocumento: 'C.E',
        numeroDocumento: '2345678901',
        notaServicio: 'Corte de uñas sin problemas, la gata está más cómoda ahora.',
        idServicio: '4'
    },
    {
        id: '7',
        nombreDueno: 'Carlos Sánchez',
        nombreMascota: 'Max',
        fechaAplicacion: '2023-07-23',
        servicio: 'Baño y peluquería',
        tipomascota: 'Perro',
        idEstado: 0,
        descripcionEstado: 'finalizado',
        idDocumento: 'C.C',
        numeroDocumento: '4567890123',
        notaServicio: 'Baño y peluquería de calidad, el perro luce increíble.',
        idServicio: '5'
    },
    {
        id: '8',
        nombreDueno: 'Isabel Torres',
        nombreMascota: 'Coco',
        fechaAplicacion: '2023-07-24',
        servicio: 'Baño',
        tipomascota: 'Perro',
        idEstado: 1,
        descripcionEstado: 'activo',
        idDocumento: 'C.E',
        numeroDocumento: '9012345678',
        notaServicio: 'Baño refrescante, el perro está contento y limpio.',
        idServicio: '1'
    },
    {
        id: '9',
        nombreDueno: 'Javier Rodríguez',
        nombreMascota: 'Kiara',
        fechaAplicacion: '2023-07-24',
        servicio: 'Corte de pelo',
        tipomascota: 'Gato',
        idEstado: 0,
        descripcionEstado: 'finalizado',
        idDocumento: 'C.C',
        numeroDocumento: '2345678901',
        notaServicio: 'Corte de pelo preciso, la gata se ve más elegante.',
        idServicio: '2'
    },
    {
        id: '10',
        nombreDueno: 'Marta Pérez',
        nombreMascota: 'Buddy',
        fechaAplicacion: '2023-07-25',
        servicio: 'Baño y cepillado',
        tipomascota: 'Perro',
        idEstado: 1,
        descripcionEstado: 'activo',
        idDocumento: 'C.E',
        numeroDocumento: '5678901234',
        notaServicio: 'Baño y cepillado completo, el perro está feliz y radiante.',
        idServicio: '3'
    }
];

export default function VacunasRegistradas() {
    const { selectId, saveSelectId } = useSelectId()
    const { selectRow, saveSelectRow } = useSelectRow()
    return (
        <>
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
                    ver={<AlertaVer idSeleccionado={selectId} rows={rows} tooltip='Ver' />}
                />
                <DataTable rows={rows} columns={columns} selectId={saveSelectId} selectRow={saveSelectRow} />
        </>
    )
}
