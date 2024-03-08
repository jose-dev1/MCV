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

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

function Perfil() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [error, setError] = useState('');
  const [usuario] = useState(JSON.parse(localStorage.getItem('user')));
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

  const manejarCambio = (campo, valor) => {
    setDatosFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [campo]: valor,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrores = {};
    Object.entries(datosFormulario).forEach(([key, value]) => {
      if (!value || (typeof value.trim === 'function' && value.trim() === '')) {
        formErrores[key] = 'Error los campo no puede estar vacío';
      }
    });

    if (Object.keys(formErrores).length > 0) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const respuesta = await axios.post('http://localhost:4321/registro/registro_cliente', datosFormulario);
      console.log('Peticion enviada exitosamente:', respuesta.data);
    } catch (error) {
      console.error('Error al enviar la petición:', error);
      setError('Error al enviar la petición.');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMostrarAlerta(true);
    },);

    axios.get('http://localhost:4321/registro/documento').then((response) => {
      setDocumentos(response.data);
    })
      .catch((error) => {
        console.log('error al obtener los datos:', error);
      })
  }, []);

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
                />
                <TextField
                  label="Segundo nombre"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '250px' }}
                  onChange={(e) => manejarCambio('segundo_nombre_cliente', e.target.value)}
                />
                <TextField
                  label="Primer apellido"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '230px' }}
                  onChange={(e) => manejarCambio('primer_apellido_cliente', e.target.value)}
                />
                <TextField
                  label="Segundo apellido"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  onChange={(e) => manejarCambio('segundo_apellido_cliente', e.target.value)}
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
                />

                <TextField
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  label="Lugar de expedicion"
                  variant='outlined'
                  onChange={(e) => manejarCambio('lugar_expedicion_documento', e.target.value)}
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
                />

                <TextField
                  label="Telefono"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  onChange={(e) => manejarCambio('telefono_cliente', e.target.value)}
                />
                <TextField
                  label="Correo electronico"
                  value={usuario.correo_usuario}
                  fullWidth
                  variant="outlined"
                  disabled
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
                  fullWidth
                  value={usuario.u_password}
                  type="password"
                  variant="outlined"
                  disabled
                  sx={{ flex: '1 1 30%', minWidth: '450px' }}
                />
              </Box>
            </Box>

            <div className="mt-4 ml-auto">
              <button
                type="submit"
                className="w-48 rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </Stack>
    </div>
  );
}

export default Perfil;
