import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Contacto() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const estadoForm = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const envio = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await axios.post('http://localhost:4000/contacto', formulario);

            if (respuesta.status === 200) {
                alert('Mensaje enviado con éxito');
            } else {
                alert('Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error al enviar el mensaje', error);
        }
    };

    return (
        <div>
            <div className='infor-cont' style={{ textAlign: 'center' }}>
                <h2>Contáctanos</h2>
                <p>La salud y el bienestar de tu mascota son nuestra principal prioridad, contáctanos si tienes alguna duda.</p>
            </div>
            <div className='container'>
                <form onSubmit={envio}>
                    <div className="row">
                        <div className="col-md-4 mb-2">
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={estadoForm}
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="telefono"
                                value={formulario.telefono}
                                onChange={estadoForm}
                            />
                        </div>
                        <div className="col-md-4 mb-2">
                            <TextField
                                label="Correo Electrónico"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={formulario.email}
                                onChange={estadoForm}
                            />
                        </div>
                    </div>
                    <TextField
                        label="Mensaje"
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        margin="normal"
                        name="mensaje"
                        value={formulario.mensaje}
                        onChange={estadoForm}
                    />
                    <input type="submit" className='btn' value="Enviar" />
                </form>
            </div>
        </div>
    );
}
