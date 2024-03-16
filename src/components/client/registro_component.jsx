import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import Grid from '@mui/material/Unstable_Grid2';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import Modal from '@mui/material/Modal';
import { Typography, Divider } from '@mui/material';
import '../../assets/css/sidebar.css';
import Swal from 'sweetalert2';

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

function RegistroComponent({ isOpen, onClose }) {
    const [mostrarAlerta, setMostrarAlerta] = useState(true);
    const [error, setError] = useState('');
    const [documentos, setDocumentos] = useState([]);
    const [datosFormulario, setDatosFormulario] = useState({
        primer_nombre_cliente: '',
        segundo_nombre_cliente: '',
        primer_apellido_cliente: '',
        segundo_apellido_cliente: '',
        id_tipo_documento: '',
        numero_documento_cliente: '',
        lugar_expedicion_documento: '',
        direccion_cliente: '',
        telefono_cliente: '',
        estado_cliente: '1',
    });

    useEffect(() => {
        setTimeout(() => {
            setMostrarAlerta(true);
        });
        axios.get('http://localhost:4321/registro/documento')
            .then((response) => {
                setDocumentos(response.data);
            })
            .catch((error) => {
                console.log('error al obtener los datos:', error);
            });
    }, []);

    const manejarCambio = (campo, valor) => {
        setDatosFormulario((datosAnteriores) => ({
            ...datosAnteriores,
            [campo]: valor,
        }));
    };

    const Handshale1 = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:4321/registro/registro_cliente', datosFormulario);
            Swal.fire({
                text: "Se ha registrado el cliente!",
                icon: "success"
            });
            onClose();
        } catch (error) {
            console.error('Error al enviar la petición:', error);
            setError('Error al enviar la petición.');
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="registro-modal"
            aria-describedby="formulario-de-registro"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 10,
                    p: 5,
                    borderRadius: 5,
                    outline: 'none',
                    transition: 'transform 0.5s ease-in-out',
                    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
                }}
            >
                <Typography variant="h5" gutterBottom align="center">
                    Registrar Cliente
                </Typography>
                <Divider />
                <form onSubmit={Handshale1}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Primer nombre"
                                    variant="outlined"
                                    onChange={(e) => manejarCambio('primer_nombre_cliente', e.target.value)}
                                />
                                <TextField
                                    label="Segundo nombre"
                                    variant="outlined"
                                    maxWith
                                    onChange={(e) => manejarCambio('segundo_nombre_cliente', e.target.value)}

                                />
                                <TextField
                                    label="Primer apellido"
                                    variant="outlined"
                                    maxWith
                                    onChange={(e) => manejarCambio('primer_apellido_cliente', e.target.value)}

                                />
                                <TextField
                                    label="Segundo apellido"
                                    variant="outlined"
                                    maxWith
                                    onChange={(e) => manejarCambio('segundo_apellido_cliente', e.target.value)}

                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="tipo-documento-label">Tipo de documento</InputLabel>
                                    <Select
                                        labelId="tipo-documento-label"
                                        id="tipo-documento"
                                        label="Tipo de documento"
                                        onChange={(e) => manejarCambio('id_tipo_documento', e.target.value)}

                                    >
                                        {documentos.map((documento, index) => (
                                            <MenuItem key={index} value={documento.id_tipo_documento}>{documento.descripcion_documento}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Numero de documento"
                                    variant="outlined"
                                    maxWith
                                    onChange={(e) => manejarCambio('numero_documento_cliente', e.target.value)}

                                />
                                <TextField
                                    label="Lugar de expedicion"
                                    variant='outlined'
                                    maxWith
                                    onChange={(e) => manejarCambio('lugar_expedicion_documento', e.target.value)}

                                />
                                <TextField
                                    label="Direccion"
                                    variant="outlined"
                                    maxWith
                                    onChange={(e) => manejarCambio('direccion_cliente', e.target.value)}

                                />
                                <TextField
                                    label="Telefono"
                                    variant="outlined"
                                    maxWith
                                    onChange={(e) => manejarCambio('telefono_cliente', e.target.value)}

                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                        <div className="flex items-center mt-5 gap-4 ml-auto">
                            <button
                                type="submit"
                                className="w-48 inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md"
                            >
                                Registrar
                            </button>
                        </div>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default RegistroComponent;
