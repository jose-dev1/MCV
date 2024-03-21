import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserPlusIcon, BookmarkSquareIcon, ClipboardDocumentCheckIcon, HomeIcon, CheckBadgeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import '../../src/assets/css/sidebar.css'
import Swal from 'sweetalert2';
import axios from 'axios';


const Sidebar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [clientData, setClientData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [datosFormulario, setDatosFormulario] = useState({
        correo_u: user.correo_usuario,
    });
    useEffect(() => {

        const clientDataFromLocalStorage = localStorage.getItem('client');
        if (clientDataFromLocalStorage) {
            try {
                const parsedClientData = JSON.parse(clientDataFromLocalStorage);
                setClientData(parsedClientData);
            } catch (error) {
                console.error('Error al analizar los datos del cliente como JSON:', error);
                localStorage.removeItem('client');
            }
        }
    }, []);




    const handleDesactivar = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡Tu cuenta será desactivada y este cambio no será reversible en 30 días!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, desactivarla',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post('http://localhost:4321/registro/desactivar', datosFormulario);
                    if (response.status === 200) {
                        Swal.fire('¡Desactivada!', 'Tu cuenta ha sido desactivada.', 'success');
                        localStorage.removeItem('user');
                        localStorage.removeItem('client');
                        navigate('/');
                    } else {
                        Swal.fire('Error', 'Hubo un problema al desactivar la cuenta. Por favor, inténtalo de nuevo más tarde.', 'error');
                    }
                } catch (error) {
                    console.error('Error al desactivar cuenta:', error);
                    Swal.fire('Error', 'Hubo un problema al desactivar la cuenta. Por favor, inténtalo de nuevo más tarde.', 'error');
                }
            }
        });
    };


    const isActive = (path) => {
        return location.pathname === path;
    };

    const cerrarSession = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('client');
        setClientData(null);
        setUser(null);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-start mt-10 justify-start ml-10 w-full md:w-1/4 lg:w-1/5">
            <div className="w-full max-w-sm rounded-lg bg-white p-3 drop-shadow-xl divide-y">
                <div aria-label="header" className="flex space-x-4 items-center p-4">
                    <div aria-label="avatar" className="flex mr-auto items-center space-x-4">
                        <img
                            src="https://avatars.githubusercontent.com/u/499550?v=4"
                            alt="JC"
                            className="w-16 h-16 shrink-0 rounded-full"
                        />
                        <div className="space-y-2 flex flex-col flex-1 truncate">
                            <div className="font-medium relative text-xl leading-tight text-gray-900">
                                <span className="flex">
                                    <span className="truncate relative pr-8">
                                        {clientData && (
                                            <>
                                                {clientData.primer_nombre_cliente} {clientData.primer_apellido_cliente}
                                            </>
                                        )}
                                        <span
                                            aria-label="verified"
                                            className="absolute top-1/2 -translate-y-1/2 right-0 inline-block rounded-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                className="w-6 h-6 ml-1 text-cyan-400"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path
                                                    d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                                    stroke-width="0"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            <p className="font-normal text-base leading-tight text-gray-500 truncate">
                                {user.correo_usuario}
                            </p>
                        </div>
                    </div>
                </div>
                <div aria-label="navigation" className="py-2">
                    <nav className="grid gap-1">
                        {user.id_tipo_usuario === 1 && (
                            <Link
                                to="/admin"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/admin' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <UserPlusIcon className='w-6 h-6' />
                                <span>Gestionar Empleado</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 2 && (
                            <Link
                                to="/"
                                className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span>Pagina principal</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 3 && (
                            <Link
                                to="/inicio-auxiliar"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-800 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${isActive('/inicio-auxiliar') ? 'bg-gray-100 text-blue-700' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                <span>Inicio Auxiliar</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 4 && (
                            <Link
                                to="/veterinario"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/veterinario' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <HomeIcon className='w-6 h-6' />

                                <span>Inicio</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 5 && (
                            <Link
                                to="/inicio-groomer"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/inicio-groomer' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <HomeIcon className='w-6 h-6' />
                                <span>Inicio</span>
                            </Link>
                        )}
                    </nav>
                </div>
                <div aria-label="navigation" className="py-4 h-rem">
                    <nav className='grip gap-1'>
                        {user.id_tipo_usuario === 2 && (
                            <Link
                                to="/perfil-usuario"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-800 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${isActive('/perfil-usuario') ? 'bg-gray-100 text-blue-800' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>Informacion del perfil</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 2 && (
                            <Link
                                to="/descargar-certificado"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-green-700 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/descargar-certificado' ? 'bg-gray-100 text-green-700' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                <span>Descargar Certificado</span>
                            </Link>
                        )}

                        {user.id_tipo_usuario === 2 && (
                            <Link
                                to="/descargar-examen"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-green-700 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/descargar-examen' ? 'bg-gray-100 text-green-700' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                <span>Descargar Exames</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 2 && (
                            <Link
                                to="/mascota-registrada"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-purple-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/mascota-registrada' ? 'bg-gray-100 text-purple-400' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                                </svg>

                                <span>Mascotas y Carnet</span>
                            </Link>
                        )}

                        {user.id_tipo_usuario === 2 && (
                            <Link
                                to=""
                                onClick={handleDesactivar}
                                className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-yellow-600 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className='text-yellow-500 w-6 h-6' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>

                                <span> Desactivar Cuenta</span>
                            </Link>
                        )}

                        {/* Opción para el rol 3 */}
                        {user.id_tipo_usuario === 3 && (
                            <Link
                                to="/gestionar-asistencia"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/gestionar-asistencia' ? 'bg-gray-100 text-blue-700' : ''
                                    }`}
                            >
                                <CheckBadgeIcon className='w-6 h-6' />
                                <span>Gestionar Asistencia</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 3 && (
                            <Link
                                to="/gestionar-agenda"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-orange-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/gestionar-agenda' ? 'bg-gray-100 text-red-800' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <span>Gestionar Agenda</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 3 && (
                            <Link
                                to="/factura"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-red-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/factura' ? 'bg-gray-100 text-red-800' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                                </svg>
                                <span>Facturacion</span>
                            </Link>
                        )}
                        {/* Opción para el rol 4 */}
                        {user.id_tipo_usuario === 4 && (
                            <Link
                                to="/hospitalizaciones"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/hospitalizaciones' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <BookmarkSquareIcon className='w-6 h-6' />
                                <span>Hospitalizaciones</span>
                            </Link>
                        )}

                        {user.id_tipo_usuario === 4 && (
                            <Link
                                to="/Carnet-vacunas"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/Carnet-vacunas' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}

                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                </svg>


                                <span>Carnet </span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 3 && (
                            <Link
                                to="/historia-clinica"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/historia-clinica' ? 'bg-gray-100 text-blue-600' : ''
                                    }`}

                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <span>Historia Clinica</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 4 && (
                            <Link
                                to="/examenes-medicos"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/examenes-medicos' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <ClipboardDocumentCheckIcon className='w-6 h-6' />
                                <span>Examenes Medicos</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 4 && (
                            <Link
                                to="/agenda-veterinario"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/agenda-veterinario' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <CalendarIcon className='w-6 h-6' />
                                <span>Agenda</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 4 && (
                            <Link
                                to="/desparacitacion"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/desparacitacion' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" />
                                </svg>

                                <span>Desparacitacion</span>
                            </Link>
                        )}

                        {/* Opción para el rol 5 */}
                        {user.id_tipo_usuario === 5 && (
                            <Link
                                to="/servicio-prestado"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/servicio-prestado' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>

                                <span>Servicio prestado</span>
                            </Link>
                        )}
                        {user.id_tipo_usuario === 5 && (
                            <Link
                                to="/agenda-groomer"
                                className={`flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-blue-500 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${location.pathname === '/agenda-groomer' ? 'bg-gray-100 text-blue-500' : ''
                                    }`}
                            >
                                <CalendarIcon className='w-6 h-6' />
                                <span>Agenda</span>
                            </Link>
                        )}
                    </nav>
                </div>
                <div aria-label="footer" className="pt-2">
                    <button
                        onClick={cerrarSession}
                        type="button"
                        className="flex items-center space-x-3 py-3 px-4 w-full leading-6 text-lg text-gray-600 focus:outline-none hover:bg-gray-100 hover:text-red-700 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span>Cerrar Session</span>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
