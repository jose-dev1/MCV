import React from 'react';


const Sidebar = () => {
    return (
        <div className="absolute top-16 left-10 z-40 bg-white w-64 shadow-lg rounded-lg mt-24">
            <div className="w-full h-16 bg-blue-600 flex items-center justify-center text-white text-2xl font-bold rounded-t-lg">
                MCV
            </div>

            <div className="p-4 mt-6">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">

                    </div>
                </div>

                <ul className="mt-4">
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
                            Dashboard
                        </a>
                    </li>


                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
