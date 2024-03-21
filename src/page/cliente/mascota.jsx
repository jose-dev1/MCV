import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Sidebar from '../../components/sidebarComponent';
import Logo from '../../assets/img/gatito.avif';
import WhatsAppComponent from '../../components/whatsappComponent';
import axios from 'axios';
import dayjs from 'dayjs';
import useSelectId from '../../Hooks/useSelectId';
import MascotaPerfil from '../../components/client/mascotaComponent';
import ServiciosGroomer from '../../components/client/ServiciosGroomer';
import { EyeIcon } from "@heroicons/react/24/outline";

export default function Mascota() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [cliente, setCliente] = useState({});
    const [datosFormulario, setDatosFormulario] = useState({});
    const { selectId, saveSelectId } = useSelectId()
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        const clientDataFromLocalStorage = localStorage.getItem('client');

        if (clientDataFromLocalStorage) {
            try {
                const parsedClientData = JSON.parse(clientDataFromLocalStorage);
                setCliente(parsedClientData);
                setDatosFormulario(parsedClientData);
            } catch (error) {
                console.error('Error al analizar los datos del cliente como JSON:', error);
                localStorage.removeItem('client');
            }
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4321/info_mascotas/${cliente.id}`);
                setMascotas(response.data);
            } catch (error) {
                console.log("no se pueden cargar los datos", error);
            }
        };

        fetchData();
    }, [cliente.id]);


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Stack
                spacing={2}
                sx={{
                    position: 'fixed',
                    top: 10,
                    right: 6,
                    bottom: 5,
                    left: 'calc(22% + 3px)',
                    p: [2, 3, 4],
                    width: '77%',
                    display: 'flex',
                    overflow: 'auto'
                }}
            >
                <div className="w-full flex justify-left items-left  mt-10">
                    {mascotas && mascotas.length > 0 ? (
                        mascotas.map((mascota, index) => (
                            <div key={index} className="mb-2  p-4  max-w-full">
                                <div className="card md:flex max-w-lg">
                                    <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                                        <img className="w-20 h-20 rounded-full" src={Logo} />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="font-bold">{cliente.primer_nombre_cliente} {cliente.primer_apellido_cliente} </p>
                                        <h3 className="text-xl heading">Nombre de la mascota: {mascota.nombre_mascota}</h3>
                                        <h3 className="text-xl heading">Raza: {mascota.raza_mascota}</h3>
                                        <p className="mt-2 mb-3">Esta es su mascota registrada con fecha de nacimiento: {dayjs(mascota.fecha_nacimiento_mascota).format('DD/MM/YYYY')} ,tipo de sangre ({mascota.tipo_sangre_mascota})</p>
                                        <div className="flex justify-center md:justify-start gap-2">
                                            <button className="w-50 bg-green-500 rounded-md text-white p-2 mt-4 hover:shadow-xl transition-all duration-200 ease-in flex items-center justify-center">
                                                Carnet
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                </svg>
                                            </button>
                                            <MascotaPerfil
                                                bgColor="secondary"
                                                icon={<EyeIcon className="w-6 h-6 mt-4" />}
                                                tooltip="Ver Historial Medico"
                                                id={mascota.id}
                                                name={mascota.nombre_mascota}
                                            />
                                            <ServiciosGroomer
                                                bgColor="secondary"
                                                icon={<EyeIcon className="w-6 h-6 mt-4" />}
                                                tooltip="Historial de Servicios de Groomer"
                                                id={mascota.id}
                                                name={mascota.nombre_mascota}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron mascotas.</p>
                    )}
                </div>
            </Stack>
            <WhatsAppComponent />
        </div>
    );
}
