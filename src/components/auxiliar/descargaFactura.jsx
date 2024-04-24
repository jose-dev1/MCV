import React, { useEffect, useState } from 'react'
import Boton from "../dash/boton";
import axios from 'axios';
import dayjs from 'dayjs';


export function DescargaFactura(props) {
    const { selectId, bgColor, icon, tooltip } = props
    const [desabilitado, setDesabilitado] = useState(selectId === null ? false : true)

    useEffect(() => {
        if (selectId === null) {
            setDesabilitado(false)
        }
        else if (selectId !== null && selectId) {
            setDesabilitado(false)
        }
        else {
            setDesabilitado(true)
        }
    }, [selectId])


    const handleImprimirFactura = (data) => {
        const ventanaImpresion = window.open('', '_blank');
        const contenidoImpresion = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Factura Electrónica</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 300px; /* Ancho máximo de la impresora térmica */
                        margin: 0 auto;
                        padding: 10px;
                    }
                    .header img {
                        width: 100px;
                        height: auto;
                        margin-bottom: 5px;
                        display: block;
                        margin: 0 auto;
                    }
                    .header, .factura-info, .cliente-info, .observaciones, .servicios, .total {
                        margin-bottom: 10px;
                        
                    }

                    .factura-info{
                        text-align: center;
                    }
                    .servicios th, .servicios td {
                        border: none;
                        padding: 3px 0;
                    }
                    .servicios th {
                        font-weight: bold;
                    }
                    .total {
                        text-align: left;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .iva {
                        display: block;
                        font-size: 14px;
                        color: #666;
                        text-align: left;
                    }
                    .precio-total {
                        display: block;
                        font-size: 18px;
                        text-align: left;
                        margin-top: 10px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="../../assets/img/MVC.png" alt="Logo de la Veterinaria">
                        <div class="nombre-veterinaria">MCV - Mi Can Veterinaria</div>
                        <div class="direccion-veterinaria">123 Calle Principal, Bogotá, Colombia</div>
                    </div>
                    <div class="factura-info">
                        <p><strong>Fecha de Emisión:</strong> ${data.fecha_factura}</p>
                        <p><strong>NIT Veterinaria:</strong> 123456789-0</p>
                    </div>
                    <h2>Factura</h2>
                    <div class="cliente-info">
                        <p><strong>Nombre del Cliente:</strong> ${data.nombre_cliente}</p>
                        <p><strong>Fecha de reimpresion:</strong> ${dayjs().format('DD/MM/YYYY')}</p>
                    </div>
                    <div class="observaciones">
                        <p><strong>Observaciones:</strong> ${data.descripcion_factura}</p>
                    </div>
                    <table class="servicios">
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.servicio.map((servicio, index) => `
                                <tr key=${index}>
                                    <td>${servicio.descripcion_servicio}</td>
                                    <td>$${servicio.valor_servicio}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="total">
                        <strong>Total:</strong> <span class="precio-total">$${data.valor_factura}</span>
                        <span class="iva">(total con IVA: $${data.factura_iva})</span>
                    </div>
                </div>
            </body>
            </html>
        `;

        ventanaImpresion.document.write(contenidoImpresion);
        ventanaImpresion.print();
        ventanaImpresion.close();
    };

    const handleModal = async () => {
        console.log(selectId)
        try {
            const result = await axios.get(`http://localhost:4321/factura/${selectId}`)
            const data = result.data
            handleImprimirFactura(data)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            <Boton
                onClick={handleModal}
                bgColor={bgColor}
                icon={icon}
                tooltip={tooltip}
                desable={desabilitado}
            />
        </div>
    )
}
