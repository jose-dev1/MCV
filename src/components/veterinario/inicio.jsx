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

export default function Inicio(props) {
    const {opciones, citas} = props
    return (

        <div className=" bg-white w-full flex lg:grid-cols-2">
            <div className=" lg:max-w-7x2 ">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Opciones</h2>

                <div className=" w-96  grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-2">
                    {opciones.map((item) => (
                        <div className="max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow ">
                            {item.icon}

                            <div className="flex justify-center">
                                <a href={item.href} >
                                    <h5 className=" text-base  tracking-tight text-gray-900 "> {item.titulo} </h5>
                                </a>
                            </div>
                            <p className="mb-3 font-normal text-gray-500 ">{item.subtitiulo}</p>

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
