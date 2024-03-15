import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import Sidebar from '../../components/sidebarComponent'
import Logo from '../../assets/img/gatito.avif'
import WhatsAppComponent from '../../components/whatsappComponent';


export default function Mascota() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
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
                <div className="bg-[#ffffff] flex justify-left items-left  mt-10">
                    <div className="w-full ml-1 mr-1 flex flex-col justify-center items-center sm:w-96 border-gray-700 text-center">
                        <div className="w-full rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-44 relative">
                            <h1 className="text-xl mb-4">Hola {user.usuario}</h1>
                            <p>Este es el estado de tu mascota.</p>
                            <p>Nacionalidad: Colombiana</p>
                            <p>Fecha de Nacimiento: 10/30/2022</p>
                        </div>
                        <div className="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col">
                            <h2 className="font-semibold text-xl">Tommy</h2>
                            <img
                                src={Logo}
                                className="w-40 h-40 shrink-0 rounded-full mt-2"
                                alt=""
                            />
                            <p className="mt-3 font-semibold text-lg">Gato Siberiano</p>
                            <span className="text-slate-500 rounded-xl border-slate-100 text-sm mt-2 pl-3 pr-3 border-[1px]">
                                <span className="bg-green-500 w-2 h-2 rounded-full mt-0.5 inline-block"></span> Activo
                            </span>
                            <button className="w-full bg-green-500 rounded-md text-white p-4 mt-4 hover:shadow-xl transition-all duration-200 ease-in flex items-center justify-center">
                                Descargar Carnet
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Stack>
            <WhatsAppComponent />
        </div>
    )
}
