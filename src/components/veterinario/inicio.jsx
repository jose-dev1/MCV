import * as React from 'react';
import '../../index.css';
import Grafica from '..//..//components/veterinario/veterinarioGrafica'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GraficaMes from '../../components/veterinario/graficaMes'


export default function Inicio(props) {
    const { opciones, citas } = props;
    return (
        <div className="w-full mt-10">
            <div className="flex flex-wrap justify-center">
                {opciones.map((item) => (
                    <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 p-1">
                        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow  px-5 py-3">
                            {item.icon}

                            <div className="flex justify-start">
                                <a href={item.href}>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">{item.titulo}</h5>
                                </a>
                            </div>

                            <p className="mb-3 font-normal text-black ">{item.subtitiulo}</p>
                            <a href={item.href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none">
                                Ver más
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex max-w-[60%] mt-10 shadow-lg">
                <GraficaMes />
            </div>
        </div>
    );
}
