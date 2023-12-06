import React from 'react';
import Cardpet from '../../assets/img/petcard.png'
import Cardcerti from '../../assets/img/certificate.png'
import Examen from '../../assets/img/medical-certificate.png'
import Agenda from '../../assets/img/calendar.png'

const Infocard = () => {
    return (
        <div className="flex flex-col">
            <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">
                Perfil principal
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center">
                        <img src={Cardpet} className="h-50 w-50" alt="" />
                    </div>

                    <div className="ml-4">
                        <h2 className="font-semibold">2 Mascotas registradas</h2>
                        <p className="mt-2 text-sm text-gray-500">Actualizado hace 2 dias.</p>
                    </div>
                </div>

                <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center">
                        <img src={Cardcerti} className="h-50 w-50" alt="" />
                    </div>

                    <div className="ml-4">
                        <h2 className="font-semibold">3 Cerficados generados</h2>
                        <p className="mt-2 text-sm text-gray-500">Actualizado hace 2 dias.</p>
                    </div>
                </div>
                <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center">
                        <img src={Examen} className="h-50 w-50" alt="" />
                    </div>

                    <div className="ml-4">
                        <h2 className="font-semibold">4 Examenes generados</h2>
                        <p className="mt-2 text-sm text-gray-500">Actualizado hace 2 dias.</p>
                    </div>
                </div>
                <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center">
                        <img src={Agenda} className="h-50 w-50" alt="" />
                    </div>

                    <div className="ml-4">
                        <h2 className="font-semibold">3 Citas agendadas</h2>
                        <p className="mt-2 text-sm text-gray-500">Actualizado hace 2 dias.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Infocard;

