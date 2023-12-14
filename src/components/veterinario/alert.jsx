import React, { useState } from 'react';

const AlertComponent = ({ id, color, title, content }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    return isVisible ? (
        <div
            id={id}
            className={`bg-white fixed right-0 top-0 p-4 text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-50  dark:text-${color}-400 dark:border-${color}-800`}
            role="alert"
        >
            <div className="flex items-center">
                <svg
                    className="flex-shrink-0 w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className={`text-lg font-medium text-${color}-800`}>{title}</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">{content}</div>
            <div className="flex">
                <button
                    type="button"
                    className={`text-slate-50  focus:ring-4 focus:outline-none focus:ring-${color}-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
                    onClick={handleClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    Cerrar
                </button>
                {/* Add other buttons as needed */}
            </div>
        </div>
    ) : null;
};

export default AlertComponent;
