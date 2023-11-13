import React from 'react';


const Sidebar = ({ user }) => {
    return (
        <div className="absolute top-16 left-10 z-40 bg-white w-64 shadow-lg rounded-lg mt-24">
            <div className="w-full h-16 bg-blue-600 flex items-center justify-center text-white text-2xl font-bold rounded-t-lg">
                MCV - {user.usuario}
            </div>

            <div className="p-4 mt-6">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">

                    </div>
                </div>

                <ul className="mt-4">
                    {user.fk_tipo_usuario === 1 && (
                        <li>
                            {/* Opción para el rol 1 */}
                        </li>
                    )}
                    {user.fk_tipo_usuario === 2 && (
                        <li>
                            <a href="/" className="flex items-center text-gray-700 hover:bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                                Informacion del Perfil
                            </a>
                            <a href="/" className="flex items-center text-gray-700 hover:bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                                Descargar Certificados
                            </a>
                            <a href="/" className="flex items-center text-gray-700 hover:bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                                Descargar Examenes
                            </a>
                            <a href="/" className="flex items-center text-gray-700 hover:bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 mr-2 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                                Agendar Cita
                            </a>
                        </li>
                    )}
                    {user.fk_tipo_usuario === 3 && (
                        <li>
                            {/* Opción para el rol 2 */}
                        </li>
                    )}
                    {user.fk_tipo_usuario === 4 && (
                        <li>
                            {/* Opción para el rol 2 */}
                        </li>
                    )}
                    {user.fk_tipo_usuario === 5 && (
                        <li>
                            {/* Opción para el rol 2 */}
                        </li>
                    )}

                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
