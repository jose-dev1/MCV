import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, FormControl, InputLabel, Typography, Card, CardContent, Stack, IconButton, Tooltip } from '@mui/material';
import Sidebar from '../../components/sidebarComponent';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import ModalFactura from '../../components/auxiliar/modalFactura';
import { Logo } from '../../assets/img/MVC.png'
import Botonera from '../../components/dash/botonera';
import { EyeIcon } from "@heroicons/react/24/outline";

const FormAgregarFactura = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        servicios: [],
        precioTotal: 0,
        estado: '1',
        fechaFacturacion: '',
        observaciones: ''
    });

    const [documento, setDocumento] = useState('');
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [precioServicio, setPrecioServicio] = useState(0);
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [servicios, setServicios] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleServicioSeleccionadoChange = (e) => {
        const selectedServiceId = e.target.value;
        setServicioSeleccionado(selectedServiceId);
        const selectedService = servicios.find(service => service.id_servicio === selectedServiceId);
        if (selectedService) {
            setPrecioServicio(selectedService.precio);
        } else {
            setPrecioServicio(0);
        }
    };

    const handleImprimirFactura = () => {
        const iva = cliente.precioTotal * 0.19;
        const totalConIva = cliente.precioTotal + iva;

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
                        <p><strong>Fecha de Emisión:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>NIT Veterinaria:</strong> 123456789-0</p>
                    </div>
                    <h2>Factura</h2>
                    <div class="cliente-info">
                        <p><strong>Nombre del Cliente:</strong> ${clienteEncontrado ? clienteEncontrado.primer_nombre_cliente + ' ' + clienteEncontrado.primer_apellido_cliente : ''}</p>
                        <p><strong>Fecha de Facturación:</strong> ${cliente.fechaFacturacion}</p>
                    </div>
                    <div class="observaciones">
                        <p><strong>Observaciones:</strong> ${cliente.observaciones}</p>
                    </div>
                    <table class="servicios">
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cliente.servicios.map((servicio, index) => `
                                <tr key=${index}>
                                    <td>${servicio.descripcion}</td>
                                    <td>$${servicio.precio.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="total">
                        <strong>Total:</strong> <span class="precio-total">$${totalConIva.toFixed(2)}</span>
                        <span class="iva">(IVA del 19%: $${iva.toFixed(2)})</span>
                    </div>
                </div>
            </body>
            </html>
        `;

        ventanaImpresion.document.write(contenidoImpresion);
        ventanaImpresion.print();
        ventanaImpresion.close();
    };





    useEffect(() => {
        axios.get('http://localhost:4321/factura/servicios')
            .then((response) => {
                setServicios(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleBuscarCliente = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:4321/registro-mascota/get_clientes/${documento}`)
            .then((response) => {
                const clienteData = response.data[0];
                if (clienteData) {
                    setClienteEncontrado({
                        primer_nombre_cliente: clienteData.primer_nombre_cliente,
                        primer_apellido_cliente: clienteData.primer_apellido_cliente
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleAgregarServicio = () => {
        if (servicioSeleccionado && precioServicio) {
            setCliente({
                ...cliente,
                servicios: [
                    ...cliente.servicios,
                    {
                        id_servicio: servicioSeleccionado.id_servicio,
                        descripcion: servicioSeleccionado.descripcion_servicio,
                        precio: precioServicio
                    }
                ],
                precioTotal: cliente.precioTotal + precioServicio
            });
            setServicioSeleccionado('');
            setPrecioServicio(0);
        }
    };

    const limpiarFormulario = () => {
        setDocumento('');
        setCliente({
            nombre: '',
            apellido: '',
            servicios: [],
            precioTotal: 0,
            estado: '1',
            fechaFacturacion: '',
            observaciones: ''
        });
        setServicioSeleccionado('');
        setPrecioServicio(0);
        setClienteEncontrado(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const iva = cliente.precioTotal * 0.19;
        const precioFinal = cliente.precioTotal + iva;

        const dataToSend = {
            cliente,
            servicios: cliente.servicios.map(servicio => ({
                id_servicio: servicio.id_servicio,
                precio: servicio.precio
            })),
            numero_documento: documento,
            precioFinal: precioFinal
        };
        console.log(dataToSend);
        axios.post('http://localhost:4321/factura/registrar_factura', dataToSend)
            .then((response) => {
                console.log('Factura guardada:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Factura guardada',
                    text: 'La factura ha sido guardada correctamente',
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleImprimirFactura();
                        limpiarFormulario();
                    }
                });
            })
            .catch((error) => {
                console.error('Error al guardar la factura:', error);
            });
    };


    return (
        <div>
            <Sidebar />
            <Stack
                spacing={2}
                sx={{
                    position: 'fixed',
                    top: 10,
                    right: 6,
                    bottom: 5,
                    left: 'calc(22% + 3px)',
                    p: [2, 3, 4],
                    width: '77%',
                    display: 'flex',
                    overflow: 'auto'
                }}>
                <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">
                    Facturacion
                </h2>
                <div className="flex flex-row justify-center">
                    <div className='w-full'>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w">
                            <div className="flex items-center space-x-4">
                                <TextField type="text" name="documento" label="Documento del Cliente" value={documento} onChange={(e) => setDocumento(e.target.value)} />
                                <Tooltip title="Buscar" color="success">
                                    <IconButton onClick={handleBuscarCliente}>
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                                <ModalFactura
                                    bgColor="secondary"
                                    icon={<EyeIcon className="w-6 h-6" />}
                                    tooltip='Visualizar Facturas'
                                />
                            </div>
                            <div className="flex space-x-4">
                                <TextField type="text" name="nombre" label="Nombre" value={clienteEncontrado ? clienteEncontrado.primer_nombre_cliente : ''} onChange={handleChange} />
                                <TextField type="text" name="apellido" label="Apellido" value={clienteEncontrado ? clienteEncontrado.primer_apellido_cliente : ''} onChange={handleChange} />
                            </div>
                            <div className="flex space-x-4">
                                <FormControl fullWidth>
                                    <InputLabel id="servicio-label">Seleccionar Servicio</InputLabel>
                                    <Select
                                        labelId="servicio-label"
                                        id="servicio"
                                        value={servicioSeleccionado}
                                        onChange={handleServicioSeleccionadoChange}
                                    >
                                        <MenuItem value="">Seleccionar Servicio</MenuItem>
                                        {servicios.map((servicio) => (
                                            <MenuItem key={servicio.id} value={servicio}>
                                                {servicio.descripcion_servicio}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField type="number" name="precio" label="Precio" value={precioServicio} onChange={(e) => setPrecioServicio(parseFloat(e.target.value))} />
                            </div>
                            <div className="flex justify-center">
                                <input variant="contained" className='mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white' color="primary" value="Agregar Servicio" onClick={handleAgregarServicio} />
                            </div>
                            <TextField type="date" focused name="fechaFacturacion" label="Fecha de Facturación" value={cliente.fechaFacturacion} onChange={handleChange} />
                            <TextField
                                name="observaciones"
                                label="Observaciones"
                                multiline
                                rows={4}
                                value={cliente.observaciones}
                                onChange={handleChange}
                            />
                            <input type="submit" className='mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-500 to-violet-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white' variant="contained" color="primary" value='Generar Factura' />
                        </form>
                    </div>
                    <div className="w-full">
                        <div className="bg-white rounded-lg shadow-md p-8 w-96">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold">Información de la Factura</h2>
                            </div>
                            <div className="mb-6">
                                <p><strong>Nombre:</strong> {clienteEncontrado ? clienteEncontrado.primer_nombre_cliente : ''} {clienteEncontrado ? clienteEncontrado.primer_apellido_cliente : ''}</p>
                                <p><strong>Fecha de Facturación:</strong> {cliente.fechaFacturacion}</p>
                                <p><strong>Observaciones:</strong> {cliente.observaciones}</p>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold">Servicios:</h3>
                                <ul className="list-disc pl-4">
                                    {cliente.servicios.map((servicio, index) => (
                                        <li key={index}>{servicio.descripcion} - ${servicio.precio}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-6">
                                <p><strong>Total:</strong> ${cliente.precioTotal}</p>
                            </div>
                            <div className="text-center">
                                <input
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-tl from-blue-500 to-violet-500 text-white font-bold uppercase rounded-lg cursor-pointer hover:from-blue-600 hover:to-violet-600 active:opacity-75 hover:shadow-md transition duration-300"
                                    value="Imprimir"
                                    onClick={handleImprimirFactura}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </Stack>
        </div>
    );
};

export default FormAgregarFactura;
