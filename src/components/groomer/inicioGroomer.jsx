import * as React from 'react';
import '../../index.css';
import Grafica from '..//..//components/veterinario/veterinarioGrafica'
import Banner from '..//..//components/veterinario/banerVeterinario'
import GraficaMascota from '../../components/veterinario/graficaMascotas'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Inicio(props) {
    const { opciones, citas } = props;
    return (
        <div className="w-full mt-10">
            <div className="flex flex-wrap justify-center">
                {opciones.map((item) => (
                    <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 p-1">
                        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 px-5 py-3">
                            {item.icon}

                            <div className="flex justify-center">
                                <a href={item.href}>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.titulo}</h5>
                                </a>
                            </div>

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.subtitiulo}</p>
                            <a href={item.href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Ver más
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex">
                <Grafica />
                <div className="w-full mt-10">
                    <div className=" ml-5 w-full  lg:max-w-7x2 ">
                        <div className="w-full">

                            <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols- lg:grid-cols-1 xl:gap-x-8">
                                <div className="w-96 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 ">Citas agendadas</h5>
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
                                                                <p className="text-sm font-medium text-gray-900 truncate ">
                                                                    {item.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 truncate ">
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

                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
}
