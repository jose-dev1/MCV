import React from 'react';

const TablaFactura = () => {
    const info = [
        {
            nombre: 'Hospitalizacion',
            precio: '$14,000',
            estado: 'Pagado',
        },
        {
            nombre: 'Vacunacion',
            precio: '$13,000',
            estado: 'Pagado',
        },
        {
            nombre: 'Certificado',
            precio: '$45.000',
            estado: 'Pagado',
        },
        {
            nombre: 'Peluqueria',
            precio: '$20,500',
            estado: 'Pagado',
        },
        {
            nombre: 'Desparacitacion',
            precio: '$50.000',
            estado: 'Pagado',
        },
    ];

    return (
        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2 max-w-[60%] mx-auto rounded-xl shadow-md">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">Concepto de factura</p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">Precio</p>
                        </th>
                        <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <p className="block antialiased  text-[11px] font-medium uppercase text-blue-gray-400">Estado</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((factura, index) => (
                        <tr key={index}>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                <div className="flex items-center gap-4">
                                    <p className="block antialiased  text-sm leading-normal text-blue-gray-900 font-bold">{factura.nombre}</p>
                                </div>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                <p className="block antialiased  text-xs font-medium text-blue-gray-600">{factura.precio}</p>
                            </td>
                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                <div className="w-10/12">
                                    <p className="antialiased  mb-1 block text-xs font-medium text-blue-gray-600">{factura.estado}</p>
                                    <div className="flex flex-start bg-blue-gray-50 overflow-hidden w-full rounded-sm  text-xs font-medium h-1">
                                        <div
                                            className="flex justify-center items-center h-full -gradient-to-tr from-blue-600 to-blue-400 text-white"
                                            style={{ width: factura.estado }}
                                        ></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaFactura;
