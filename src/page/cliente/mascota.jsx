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
import { DescargaCarnet } from '../../components/veterinario/descargarVacuan'
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

export default function Mascota() {
    const [cliente, setCliente] = useState(JSON.parse(localStorage.getItem('client')));
    const [datosFormulario, setDatosFormulario] = useState({});
    const { selectId, saveSelectId } = useSelectId()
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientData = JSON.parse(localStorage.getItem('client'));
                if (clientData) {
                    setCliente(clientData);
                    const response = await axios.get(`http://localhost:4321/info_mascotas/${clientData.id}`);
                    setMascotas(response.data);
                    if (response.data.length === 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'No hay mascotas registradas',
                            text: 'Comunícate con la veterinaria para agregar tus mascotas.',
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'No hay mascotas registradas',
                        text: 'Comunícate con la veterinaria para agregar tus mascotas.',
                    });
                }
            } catch (error) {
                console.log("No se pueden cargar los datos", error);
            }
        };

        fetchData();
    }, []);

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
                <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">Mascotas y carnet</h2>
                <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {mascotas.length > 0 && mascotas.map((mascota, index) => (
                        <div key={index} className="p-4 max-w-full">
                            <div className="card rounded-lg overflow-hidden shadow-md border border-gray-200">
                                <div className="w-20 h-20 mx-auto mb-6 flex-shrink-0">
                                    <img className="w-20 h-20 rounded-full" src={Logo} alt="Mascota" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">{cliente?.primer_nombre_cliente} {cliente?.primer_apellido_cliente}</p>
                                    <h3 className="text-xl font-bold mb-2">Nombre de la mascota: {mascota.nombre_mascota}</h3>
                                    <p className="text-base">Raza: {mascota.raza_mascota}</p>
                                    <p className="text-base">Fecha de nacimiento: {dayjs(mascota.fecha_nacimiento_mascota).format('DD/MM/YYYY')}</p>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <DescargaCarnet
                                            selectId={mascota.id}
                                            tooltip='Descargar Carnet'
                                            bgColor='success'
                                            icon={<DocumentArrowDownIcon className='w-6 h-6 mt-1' />}
                                        />
                                        <MascotaPerfil
                                            bgColor="secondary"
                                            icon={<EyeIcon className="w-6 h-6 mt-1" />}
                                            tooltip="Ver Historial Medico"
                                            id={mascota.id_historia_clinica}
                                            name={mascota.nombre_mascota}
                                        />
                                        <ServiciosGroomer
                                            bgColor="secondary"
                                            icon={<EyeIcon className="w-6 h-6 mt-1" />}
                                            tooltip="Historial de Servicios de Groomer"
                                            id={mascota.id}
                                            name={mascota.nombre_mascota}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </Stack>
            <WhatsAppComponent />
        </div>
    );
}
