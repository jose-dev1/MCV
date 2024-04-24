import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../../components/sidebarComponent';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import '../../assets/css/sidebar.css';
import Infocard from '../../components/client/infoComponent';
import Swal from 'sweetalert2';
import WhatsAppComponent from '../../components/whatsappComponent';

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

function Perfil() {
  // Estados
  const [mostrarAlerta] = useState(true);
  const [error, setError] = useState('');
  const [usuario] = useState(JSON.parse(localStorage.getItem('user')));
  const [cliente, setCliente] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [contraseña, setContraseña] = useState('');
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
    id_usuario: usuario.correo_usuario,
  });
  const [datosActualizados, setDatosActualizados] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await axios.get('http://localhost:4321/registro/documento');
      setDocumentos(response.data);

      const clientDataFromLocalStorage = localStorage.getItem('client');
      if (clientDataFromLocalStorage) {
        const parsedClientData = JSON.parse(clientDataFromLocalStorage);
        setCliente(parsedClientData);
        setDatosFormulario(parsedClientData);
      }
    } catch (error) {
      console.log('error al obtener los datos:', error);
    }
  };

  const validarCampos = () => {
    const {
      primer_nombre_cliente,
      primer_apellido_cliente,
      id_tipo_documento,
      numero_documento_cliente,
      lugar_expedicion_documento,
      direccion_cliente,
      telefono_cliente,
    } = datosFormulario;

    if (
      primer_nombre_cliente === '' ||
      primer_apellido_cliente === '' ||
      id_tipo_documento === '' ||
      numero_documento_cliente === '' ||
      lugar_expedicion_documento === '' ||
      direccion_cliente === '' ||
      telefono_cliente === ''
    ) {
      setError('Todos los campos son requeridos.');
      return false;
    }

    if (numero_documento_cliente.length !== 10 || isNaN(numero_documento_cliente)) {
      setError('El número de documento colombiano debe tener exactamente 10 dígitos numéricos.');
      return false;
    }

    return true;
  };

  const manejarCambio = (campo, valor) => {
    setDatosFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [campo]: valor,
    }));
    setDatosActualizados((datosAnteriores) => ({
      ...datosAnteriores,
      [campo]: valor,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContraseña(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    try {
      if (cliente) {
        console.log(contraseña)
        await axios.put(`http://localhost:4321/registro/actualizar_cliente/${cliente.id_cliente}`, {
          correo_usuario: usuario.correo_usuario,
          contraseña: contraseña,
          ...datosActualizados
        });
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Se han actualizado los datos del cliente los cambios se veran cuando vuelva a iniciar session.",
          icon: "success"
        });
        setCliente({ ...cliente, ...datosFormulario });
      } else {
        const response = await axios.post('http://localhost:4321/registro/registro_cliente', datosFormulario);
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Se ha registrado como cliente.",
          icon: "success"
        });
        const nuevoCliente = response.data;
        setCliente(nuevoCliente);
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error);
      setError('Error al enviar la petición.');
    }
  };

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
        <Infocard />
        {mostrarAlerta && (
          <Alert severity="info">
            Información importante Si desea obtener todos los beneficios que ofrece la aplicación mi can veterinaria (MCV) —{' '}
            <strong>¡Completa tu registro!</strong>
          </Alert>
        )}
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"'>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <TextField
                  label="Primer nombre"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '250px' }}
                  onChange={(e) => manejarCambio('primer_nombre_cliente', e.target.value)}
                  value={datosFormulario.primer_nombre_cliente}
                />
                <TextField
                  label="Segundo nombre"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '250px' }}
                  onChange={(e) => manejarCambio('segundo_nombre_cliente', e.target.value)}
                  value={datosFormulario.segundo_nombre_cliente}
                />
                <TextField
                  label="Primer apellido"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '230px' }}
                  onChange={(e) => manejarCambio('primer_apellido_cliente', e.target.value)}
                  value={datosFormulario.primer_apellido_cliente}
                />
                <TextField
                  label="Segundo apellido"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  onChange={(e) => manejarCambio('segundo_apellido_cliente', e.target.value)}
                  value={datosFormulario.segundo_apellido_cliente}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 30%', minWidth: '295px' }} >
                  <InputLabel id="tipo-documento-label">Tipo de documento</InputLabel>
                  <Select
                    labelId="tipo-documento-label"
                    id="tipo-documento"
                    label="Tipo de documento"
                    onChange={(e) => manejarCambio('id_tipo_documento', e.target.value)}
                    value={datosFormulario.id_tipo_documento}
                  >
                    {documentos.map((documento, index) => (
                      <MenuItem key={index} value={documento.id_tipo_documento}>{documento.descripcion_documento}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Numero de documento"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '450px' }}
                  onChange={(e) => manejarCambio('numero_documento_cliente', e.target.value)}
                  value={datosFormulario.numero_documento_cliente}
                />

                <TextField
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  label="Lugar de expedicion"
                  variant='outlined'
                  onChange={(e) => manejarCambio('lugar_expedicion_documento', e.target.value)}
                  value={datosFormulario.lugar_expedicion_documento}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <TextField
                  label="Direccion"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '450px' }}
                  onChange={(e) => manejarCambio('direccion_cliente', e.target.value)}
                  value={datosFormulario.direccion_cliente}
                />

                <TextField
                  label="Telefono"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  onChange={(e) => manejarCambio('telefono_cliente', e.target.value)}
                  value={datosFormulario.telefono_cliente}
                />
                <TextField
                  label="Correo electronico"
                  value={usuario.correo_usuario}
                  disabled
                  fullWidth
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                />

              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <TextField
                  label="Contraseña"
                  name='contraseña'
                  fullWidth
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '450px', display: cliente ? 'inline-block' : 'none' }}
                />
              </Box>
            </Box>

            <div className="flex mt-5 gap-4 ml-auto">
              <button
                type="submit"
                className="w-48 inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-500 to-violet-500 leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md"
                style={{ display: cliente ? 'none' : 'inline-block' }}
              >
                Registrar
              </button>
              <button
                className="w-48 mr-3 inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-blue-700 to-cyan-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-normal text-xs ease-in tracking-tight-rem shadow-xs bg-150 bg-x-25 hover:-translate-y-px active:opacity-85 hover:shadow-md text-white"
                style={{ display: cliente ? 'inline-block' : 'none' }}
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </Stack>
      <WhatsAppComponent />
    </div>
  );
}

export default Perfil;
