import React, { useState } from 'react';
import axios from 'axios';
import { Switch } from '@headlessui/react';
import TextField from '@mui/material/TextField';

export default function Ejemplo({ id }) {
    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        celular: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormulario({ ...formulario, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4321/envio-email/contactanos', formulario)
            .then((response) => {
                console.log('Correo enviado con éxito', response.data);
            })
            .catch((error) => {
                console.error('Error al enviar el correo', error);
            });
    };

    return (
        <div id={id} className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contactar a MCV</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Estamos aquí para responder a todas sus preguntas y preocupaciones sobre la salud de sus mascotas. No dude en contactarnos en cualquier momento.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <TextField
                            id="nombre"
                            label="Primer Nombre"
                            variant="outlined"
                            fullWidth
                            value={formulario.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="apellido"
                            label="Primer Apellido"
                            variant="outlined"
                            fullWidth
                            value={formulario.apellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={formulario.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <div className="relative mt-2.5">
                            <TextField
                                id="celular"
                                label="Celular"
                                variant="outlined"
                                fullWidth
                                value={formulario.celular}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <TextField
                            id="mensaje"
                            label="Mensaje"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={formulario.mensaje}
                            onChange={handleChange}
                        />
                    </div>
                    <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                    </Switch.Group>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}
