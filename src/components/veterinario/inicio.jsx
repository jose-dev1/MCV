import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../../index.css';
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const opciones = [
    {
        id: 1,
        titulo: 'Inicio',
        href: '/veterinario',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        ,
        subtitiulo: 'Inicio Veterinario',
    },
    {
        id: 2,
        titulo: 'Carnet',
        href: '/Carnet-vacunas',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        ,
        subtitiulo: 'Registrar Vacuna, consultar vacunas registradas',
    },
    {
        id: 3,
        titulo: 'Hospitalizaciones',
        href: '/hospitalizaciones',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        ,
        subtitiulo: 'Hospitalizaciones registradas',
    },



    // More products...
]

const citas = [
    {
        id: 1,
        name: 'Rodrigo Hernandez',
        href: '#',
        image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D',
        Fecha: '01/01/2024',
    },

    {
        id: 2,
        name: 'Julian Hernandez',
        href: '#',
        image: 'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg',
        Fecha: '02/05/2024',
    },

    {
        id: 3,
        name: 'Andrea Guzman',
        href: '#',
        image: 'https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg',
        Fecha: '04/05/2024',
    },
    {
        id: 3,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        Fecha: '05/05/2024',
    },

    // More products...
]

export default function Inicio() {
    return (

        <div className=" bg-white w-full flex lg:grid-cols-2">
            <div className=" lg:max-w-7x2 ">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Opciones</h2>

                <div className=" w-96  grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-2">
                    {opciones.map((item) => (
                        <div className="max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            {item.icon}

                            <div className="flex justify-center">
                                <a href={item.href} >
                                    <h5 className=" text-base  tracking-tight text-gray-900 dark:text-white"> {item.titulo} </h5>
                                </a>
                            </div>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{item.subtitiulo}</p>

                            <a href={item.href} className="inline-flex items-center text-blue-600 hover:underline">
                                Ver mas
                            </a>
                        </div>
                    ))}


                </div>

            </div>


            <div className=" ml-5 w-11/12  lg:max-w-7x2  px-32">
                <div className="w-full">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Citas agendadas</h2>

                    <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols- lg:grid-cols-1 xl:gap-x-8">
                        <div className="w-96 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Citas agendadas</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 ">
                                    {citas.map((item) => (
                                        <li className="py-3 sm:py-4">
                                            <div className="flex">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="w-10  rounded-full" src={item.image} />
                                                    </div>
                                                    <div className="flex-1 min-w-0 ms-4">
                                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                            {item.Fecha}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end w-3/5">
                                                    <Button variant="contained">Ver</Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}

                                    {/* Agrega más elementos de la lista según sea necesario */}
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>

            </div>





        </div>
    )
}
