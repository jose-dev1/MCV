import React from 'react';

const PieChart = () => {
    const perrosPorcentaje = 40;
    const gatosPorcentaje = 100 - perrosPorcentaje;

    return (
        <div className="mt-10 flex flex-col items-center w-96 h-64 mx-48 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-4">
                <div className="w-4 h-4 mr-2 bg-blue-500"></div>
                <span>Perros</span>
                <div className="w-4 h-4 ml-4 mr-2 bg-purple-500"></div>
                <span>Gatos</span>
            </div>
            <div className="relative w-32 h-32">
                <div
                    className="absolute w-full h-full bg-blue-500 rounded-full transform origin-center rotate-0"
                    style={{ transform: `rotate(${(perrosPorcentaje / 100) * 360}deg)` }}
                ></div>
                <div
                    className="absolute w-full h-full bg-purple-500 rounded-full transform origin-center rotate-0"
                    style={{ transform: `rotate(${(gatosPorcentaje / 100) * 360}deg)` }}
                ></div>
            </div>
        </div>
    );
};

export default PieChart;
