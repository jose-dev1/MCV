import React, { useEffect } from 'react';
import '../../index.css'
const ChartComponent = () => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        values: [50, 65, 80, 92, 78, 105, 120, 140, 180, 220.260, 450, 540, 580],
    };

    useEffect(() => {
        const chartContainer = document.getElementById("area-chart");
        chartContainer.style.width = "0%";

        const animateChart = () => {
            let width = 0;
            const animationInterval = setInterval(() => {
                width += 2;
                chartContainer.style.width = `${width}%`;
                if (width >= 70) clearInterval(animationInterval);
            }, 20);
        };

        animateChart();

    }, []);

    return (
        <div className="mx-5 mt-10 max-w-sm w-full  bg-white rounded-lg shadow  p-4 md:p-6">
            <div className="flex justify-between">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32 +</h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Nuevas Citas</p>
                </div>
                <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                    12%
                    <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                    </svg>
                </div>
            </div>
            <div id="area-chart" className="h-24 bg-gray-200  relative overflow-hidden">
                <svg className="w-11/12 h-max">
                    <path
                        d={`
                M0 100
                ${chartData.values.map((value, index) => `L${(index / (chartData.values.length - 1)) * 100} ${100 - (value / Math.max(...chartData.values)) * 100}`).join(' ')}
                L100 100 Z
            `}
                        fill="transparent"
                        stroke="blue"
                    />
                </svg>
            </div>

            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div className="flex justify-between items-center pt-5">
                    <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                        Ver reporte
                        <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
