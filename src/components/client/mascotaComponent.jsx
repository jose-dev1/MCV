
import '../../assets/css/cliente/mascota.css'
import React from 'react';

export default function MascotaPerfil() {
    const infoMascota = [
        {
            nombre: 'Tommy',
            descripcion: 'Tommy es un gato bonito y duerme mucho, se le han aplicado dos vacunas, se recomienda tener cuidado',
            estado: 'Activo',
            sangre: 'B +',
            raza: 'Siberiano',
            imagen: '/src/assets/img/Tommy.jpg',
        },
    ];

    return (
        <div className="flex">
            {infoMascota.map((mascota, index) => (
                <div key={index} className='w-full max-w-lg py-8 flex flex-row items-center justify-center mx-2 bg-white rounded-lg shadow-md'>
                    <div className="flex flex-col md:flex-row w-3/4 md:w-5/6 space-x-0 md:space-x-8">
                        <div className="w-full md:w-2/5 flex flex-col items-center justify-center relative">
                            <figure className="w-1/2 md:w-full  rounded-full overflow-hidden">
                                <img src="" alt={mascota.nombre} />
                            </figure>
                        </div>
                        <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-center md:text-left text-2xl font-bold text-gray-900">{mascota.nombre}</h1>
                                <p className="inline text-gray-700 font-normal leading-6 w-full text-base">{mascota.descripcion}</p>
                            </div>
                            <ul className="space-y-4 md:space-y-0 space-x-0 md:space-x-4 flex flex-col md:flex-row text-left justify-center">
                                <li className="text-sm"><i className="iconoir-pin-alt mr-2"></i>{mascota.estado}</li>
                                <li className="text-sm"><i className="iconoir-pin-alt mr-2"></i>{mascota.sangre}</li>
                                <li className="text-sm"><i className="iconoir-pin-alt mr-2"></i>{mascota.raza}</li>
                            </ul>
                            <button className="transition-colors bg-blue-700 hover:bg-blue-800 p-2 rounded-sm w-full text-white text-hover shadow-md shadow-blue-900">
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
