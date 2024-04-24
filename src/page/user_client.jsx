import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Logo from "../assets/img/MVC.png"
import { FormControl } from '@mui/material';
import 'remixicon/fonts/remixicon.css'
import '../assets/css/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const UserCliente = () => {
    const [documentos, setDocumentos] = useState([]);
    const [usuario] = useState(JSON.parse(localStorage.getItem('user')));
    const [numero_documento, setNumeroDocumento] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const response = await axios.get('http://localhost:4321/registro/documento');
            setDocumentos(response.data);
        } catch (error) {
            console.log('error al obtener los datos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('este es el usuario:', usuario.id_usuario)
        try {
            console.log(numero_documento);
            const response = await axios.get(`http://localhost:4321/get_clientes/${numero_documento}`);
            if (response.data) {
                console.log('Cliente encontrado:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Información encontrada!',
                    text: 'Toda tu información ha sido encontrada.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    actualizarCliente();
                });
            } else {
                console.log('Cliente no encontrado');
                Swal.fire({
                    icon: 'info',
                    title: '¡No eres cliente!',
                    text: 'No se encontró tu información como cliente.',
                    confirmButtonText: 'OK',
                    onClose: () => {
                        navigate('/perfil-usuario');
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'info',
                title: '¡No eres cliente!',
                text: 'No se encontró tu información como cliente puedes completar tu registro.',
                confirmButtonText: 'OK',
            });
            navigate('/perfil-usuario');
        }
    };

    const actualizarCliente = async () => {
        try {
            const response = await axios.patch(`http://localhost:4321/get_clientes/actualizar/${numero_documento}`, {
                data: usuario.id_usuario
            });
            if (response.status === 200) {
                localStorage.setItem('client', JSON.stringify(response.data.client));
                navigate('/perfil-usuario');
            } else {
                console.log('Error al actualizar el cliente:', response.data.message);
            }
        } catch (error) {
            console.log('Error al actualizar el cliente:', error);
        }
    };



    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
        >
            <Box
                sx={{
                    boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.3)',
                    padding: '19px',
                    textAlign: 'center',
                    borderRadius: '10px',
                }}
            >
                <div>
                    <div className="login-content">
                        <form id="loginForm" onSubmit={handleSubmit}>
                            <img src={Logo} height="150" alt="" className='img-center' />
                            <h4 className="" style={{ marginBottom: '5px' }}>Bienvenido !</h4>
                            <p className="text-muted" style={{ marginBottom: '60px' }}>Queremos vincular tu cuenta con la informacion que se encuentra en el sistema, a continuacion digita tu numero de documento</p>
                            <div className="login">
                                <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 30%', minWidth: '295px', marginBottom: '20px', textAlign: 'left' }} >
                                    <InputLabel id="tipo-documento-label">Tipo de documento</InputLabel>
                                    <Select
                                        labelId="tipo-documento-label"
                                        id="tipo-documento"
                                        label="Tipo de documento"
                                    >
                                        {documentos.map((documento, index) => (
                                            <MenuItem key={index} value={documento.id_tipo_documento}>{documento.descripcion_documento}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth={true} sx={{ marginBottom: '20px' }}>
                                    <TextField
                                        label="Numero de documento"
                                        variant="outlined"
                                        fullWidth
                                        type="numero_documento"
                                        value={numero_documento}
                                        onChange={(e) => {
                                            setNumeroDocumento(e.target.value);
                                        }}
                                    />
                                </FormControl>
                                <input
                                    className='btn'
                                    type="submit"
                                    value="Enviar"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </Grid>
    );
};

export default UserCliente;
