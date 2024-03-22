import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Avatar, Stack, Modal } from '@mui/material';
import SideNav from '../../components/sidebarComponent';
import RegistroCliente from '../../components/client/registro_component';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegistroMascota = () => {
    const [avatar, setAvatar] = useState(null);
    const [razas, setRazas] = useState([]);
    const [generoMascota, setGeneroMascota] = useState([]);
    const [tipooMascota, setTipoMascota] = useState([]);
    const [documento, setDocumento] = useState('');
    const [clienteData, setClienteData] = useState(null);
    const [data, setData] = useState({
        nombre_mascota: '',
        fecha_nacimiento_mascota: '',
        tipo_sangre_mascota: '',
        color_mascota: '',
        raza_mascota: '',
        peso_mascota: '',
        tamanno_mascota: '',
        microship_mascota: '1',
        foto_mascota: 'esto_es_una_url',
        estado_mascota: '1',
        anotacion_mascota: '',
        id_cliente_mascota: '',
        id_tipo_mascota: '',
        id_genero_mascota: '',
    });
    const [clienteEncontrado, setClienteEncontrado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleAvatarChange = (event) => {
        setAvatar(URL.createObjectURL(event.target.files[0]));
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const idCliente = clienteData && clienteData.numero_documento_cliente ? clienteData.numero_documento_cliente : '';
        const newData = {
            ...data,
            id_cliente_mascota: idCliente
        };
        axios.post('http://localhost:4321/registro-mascota/generar_1', newData)
            .then((response) => {
                Swal.fire({
                    title: "Buen trabajo!",
                    text: "Su mascota ha sido registrada pertenece al cliente: " + clienteData.primer_nombre_cliente,
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        clearForm();
                    }
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al registrar mascota',
                    text: 'Necesita de un numero de documento.',
                });
            });
    };

    const buscarCliente = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:4321/registro-mascota/get_clientes/${documento}`)
            .then((response) => {
                const clienteData = response.data[0];
                if (clienteData) {
                    localStorage.setItem('clienteEncontrado', JSON.stringify(clienteData));
                    setClienteData(clienteData);
                    setClienteEncontrado(clienteData);
                    console.log('Datos recibidos:', clienteData.numero_documento_cliente);
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Cliente no encontrado',
                    text: 'El cliente no se encuentra registrado, regístralo o verifica el documento',
                });
            });
    };

    const clearForm = () => {
        setData({
            nombre_mascota: '',
            fecha_nacimiento_mascota: '',
            tipo_sangre_mascota: '',
            color_mascota: '',
            raza_mascota: '',
            peso_mascota: '',
            tamanno_mascota: '',
            microship_mascota: '1',
            foto_mascota: 'esto_es_una_url',
            estado_mascota: '1',
            anotacion_mascota: '',
            id_cliente_mascota: '',
            id_tipo_mascota: '',
            id_genero_mascota: '',
        });
        setAvatar(null);
        setDocumento('');
        setClienteEncontrado(null);
    };

    useEffect(() => {
        axios.get('http://localhost:4321/registro-mascota/raza')
            .then((response) => {
                setTipoMascota(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        axios.get('http://localhost:4321/registro-mascota/genero_mascota')
            .then((response) => {
                setGeneroMascota(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div style={{ display: 'flex' }}>
            <SideNav usuario={JSON.parse(localStorage.getItem('user'))} />
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
                }}
            >
                <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">
                    Registro Mascota
                </h2>
                <div className="my-6">
                    <div className="grid sm:grid-cols-2 gap-16 p-8 mx-auto max-w-4xl bg-white  rounded-md text-[#333] font-[sans-serif]">
                        <div className='flex flex-col gap-8'>
                            <div className="mt-4">
                                <div className="flex flex-col items-center">
                                    <Avatar alt="Avatar" src={avatar} sx={{ width: 150, height: 150 }} />
                                    <input id="avatar-input" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                    <label htmlFor="avatar-input" className="mt-3 mb-4  mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white ">
                                        Subir Imagen
                                    </label>
                                    <TextField
                                        label="Número de Documento"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 2 }}
                                        onChange={(e) => setDocumento(e.target.value)}
                                    />
                                    <input
                                        className='mt-2 mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-emerald-500 to-teal-400 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white'
                                        fullWidth
                                        value="Buscar"
                                        onClick={buscarCliente}
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                    />
                                    {clienteEncontrado && (
                                        <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                                            <p className="mb-2">Nombre: {clienteEncontrado.primer_nombre_cliente}</p>
                                            <p className="mb-2">Número de Documento: {clienteEncontrado.numero_documento_cliente}</p>
                                            <p className="mb-2">Teléfono: {clienteEncontrado.telefono_cliente}</p>
                                            <p className='mb-2'> Dirección: {clienteEncontrado.direccion_cliente}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <form className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <TextField
                                    name="nombre_mascota"
                                    label="Nombre Mascota"
                                    value={data.nombre_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                                <TextField
                                    name="fecha_nacimiento_mascota"
                                    label="Fechas de Nacimiento"
                                    value={data.fecha_nacimiento_mascota}
                                    focused
                                    onChange={handleChange}
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                                <TextField
                                    name="tipo_sangre_mascota"
                                    label="Tipo de Sangre"
                                    value={data.tipo_sangre_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                                <TextField
                                    name="color_mascota"
                                    label="Color"
                                    value={data.color_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                                <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 30%', minWidth: '359px' }} >
                                    <InputLabel id="tipo-mascota-label">Tipo de Mascota</InputLabel>
                                    <Select
                                        labelId="tipo-mascota-label"
                                        id="tipo"
                                        label="Tipo de mascota"
                                        onChange={handleChange}
                                        value={data.id_tipo_mascota}
                                        name="id_tipo_mascota"
                                    >
                                        {tipooMascota.map((raza, index) => (
                                            <MenuItem key={index} value={raza.id_tipo_mascota}>{raza.tipo_mascota}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="space-y-4">
                                <TextField
                                    name="peso_mascota"
                                    label="Peso"
                                    value={data.peso_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                                <TextField
                                    name="tamanno_mascota"
                                    label="Tamaño"
                                    value={data.tamanno_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                                <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 30%', minWidth: '100px' }} >
                                    <InputLabel id="genero-label">Género</InputLabel>
                                    <Select
                                        labelId="genero-label"
                                        id="genero"
                                        label="Género"
                                        onChange={handleChange}
                                        value={data.id_genero_mascota}
                                        name="id_genero_mascota"
                                    >
                                        {generoMascota.map((genero, index) => (
                                            <MenuItem key={index} value={genero.id_genero_mascota}>{genero.genero_mascota}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    name="raza_mascota"
                                    label="Raza"
                                    value={data.raza_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ width: '100%' }}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="anotacion_mascota"
                                    label="Anotaciones"
                                    value={data.anotacion_mascota}
                                    onChange={handleChange}
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    fullWidth
                                    sx={{ width: '210%' }}
                                />
                                <RegistroCliente isOpen={modalOpen} onClose={closeModal} />
                                <div className='mt-4 flex justify-right gap-2'>
                                    <input type="submit" onClick={handleSubmit} className='inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md' value="Registrar Mascota" />
                                    <input type="button" className='mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white' value="Registrar Cliente" onClick={openModal} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Stack>
        </div>
    );
};

export default RegistroMascota;
