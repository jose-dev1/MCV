import React, { useState } from "react";
import Input from '../../components/admin/Input'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Selects from '../../components/admin/Selects'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VacunasRegistardas from '..//..//components/veterinario/vacunasRegistrados'

const vacunas = [
    { id: 1, value: 'Parvovirosi' },
    { id: 2, value: 'Pentavalente' },
    { id: 3, value: 'Pentavalente + coronavirus' },
    { id: 4, value: 'Pentavalente + coronavirus' },
    { id: 5, value: 'Rabia' },
    { id: 6, value: 'Tos de perreras (opcional) (KC)*' },
]
const VacunasComponent = ({ mascota, onSubmit }) => {
    const [fecha, setFecha] = useState("");
    const [laboratorio, setLaboratorio] = useState("");
    const [tipoVacuna, setTipoVacuna] = useState("");
    const [codigoMascota, setCodigoMascota] = useState("");
    const [datosFormulario, setDatosFormulario] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        fechaExpedicion: dayjs(),
        direccion: '',
        telefono: '',
        lugarNacimiento: '',
    });

    const manejarCambio = (campo, valor) => {
        setDatosFormulario((datosAnteriores) => ({
            ...datosAnteriores,
            [campo]: valor,
        }));
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleLaboratorioChange = (event) => {
        setLaboratorio(event.target.value);
    };

    const handleTipoVacunaChange = (event) => {
        setTipoVacuna(event.target.value);
    };

    const handleCodigoMascotaChange = (event) => {
        setCodigoMascota(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ fecha, laboratorio, tipoVacuna, codigoMascota, mascota });
    };

    return (
        <div className={("bg-gray-50 rounded p-4  w-3/5 mx-20")}>
            <h2 className="text-xl" >Registrar vacuna</h2>
            <div className=" flex">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ flex: '1 1 30%', minWidth: '295px' }}
                        label="Fecha de expedicion"
                        value={datosFormulario.fechaExpedicion || dayjs()}
                        onChange={(date) => manejarCambio('fechaExpedicion', date)}
                    />
                </LocalizationProvider>
            </div>


            <div className="mt-5">
                <Input
                    id='document'
                    fullWidth
                    label='Cod Mascota'
                    name='document'
                    required
                />
            </div>
            <div className="mt-5">
                <Input
                    id='document'
                    fullWidth
                    label='Laboratorio'
                    name='laboratorio'
                    required
                />
            </div>
            <div className="mt-5">

                <Selects
                    id='vacuna'
                    label='Vacuna'
                    name='vacuna'
                    value={vacunas.id}
                    items={vacunas}
                    required
                />
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded mt-5"
            >
                Registrar
            </button>

            <div className="w-full">
                <h1 className="text-center  text-xl mt-10 " >Vacunas registradas</h1>
                <div className="mt-5 w-28 ">
                    <Input
                        id='inputBuscar'
                        fullWidth
                        label='Buscar'
                        name='buscar'
                        required
                    />
                </div>
                <VacunasRegistardas />
            </div>
        </div>
    );
};

export default VacunasComponent;
