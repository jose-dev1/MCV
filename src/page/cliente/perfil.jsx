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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import MacotaPerfil from '../../components/client/mascotaComponent';
import '../../assets/css/sidebar.css';
import Infocard from '../../components/client/infoComponent';

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

function Perfil() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [error, setError] = useState('');
  const [usuario] = useState(JSON.parse(localStorage.getItem('user')));
  const [datosFormulario, setDatosFormulario] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaExpedicion: dayjs(),
    direccion: '',
    telefono: '',
    lugarNacimiento: '',
  });

  const manejarCambio = (campo, valor) => {
    setDatosFormulario((datosAnteriores) => ({
      ...datosAnteriores,
      [campo]: valor,
    }));
  };

  const manejarEnvioFormulario = async (e) => {
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
      const respuesta = await axios.post('http://localhost:4000/post-registro', datosFormulario);
      console.log('Peticion enviada exitosamente:', respuesta.data);
    } catch (error) {
      console.error('Error al enviar la petición:', error);
      setError('Error al enviar la petición.');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMostrarAlerta(false);
    }, 30000);
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
        <div className='p-4 shadow-md rounded-xl'>
          <form onSubmit={manejarEnvioFormulario}>
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
                  onChange={(e) => manejarCambio('primerNombre', e.target.value)}
                />
                <TextField
                  label="Segundo nombre"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '250px' }}
                  onChange={(e) => manejarCambio('segundoNombre', e.target.value)}
                />
                <TextField
                  label="Primer apellido"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '230px' }}
                  onChange={(e) => manejarCambio('primerApellido', e.target.value)}
                />
                <TextField
                  label="Segundo apellido"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  onChange={(e) => manejarCambio('segundoApellido', e.target.value)}
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
                    onChange={(e) => manejarCambio('tipoDocumento', e.target.value)}

                  >
                    <MenuItem value="C.C">Cedula de Ciudadania (C.C)</MenuItem>
                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                    <MenuItem value="C.E">Carnet de Extrangeria (C.E)</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Numero de documento"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '450px' }}
                  onChange={(e) => manejarCambio('numeroDocumento', e.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ flex: '1 1 30%', minWidth: '295px' }}
                    label="Fecha de expedicion"
                    value={datosFormulario.fechaExpedicion || dayjs()}
                    onChange={(date) => manejarCambio('fechaExpedicion', date)}
                  />
                </LocalizationProvider>
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
                  onChange={(e) => manejarCambio('direccion', e.target.value)}
                />

                <TextField
                  label="Telefono"
                  variant="outlined"
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                  onChange={(e) => manejarCambio('telefono', e.target.value)}
                />

                <FormControl fullWidth variant="outlined" sx={{ flex: '1 1 30%', minWidth: '295px' }}>
                  <InputLabel id="lugar-nacimiento-label">Lugar de nacimiento</InputLabel>
                  <Select
                    labelId="lugar-nacimiento-label"
                    id="lugar-nacimiento"
                    label="Lugar de nacimiento"
                    value={datosFormulario.lugarNacimiento}
                    onChange={(e) => manejarCambio('lugarNacimiento', e.target.value)}
                  >
                    <MenuItem value="Bogota">Bogota (DC)</MenuItem>
                    <MenuItem value="Cucuta">Cucuta</MenuItem>
                    <MenuItem value="Cartagena">Cartagena</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: '1rem',
                }}
              >
                <TextField
                  label="Correo electronico"
                  value={usuario.u_correo}
                  fullWidth
                  variant="outlined"
                  disabled
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                />

                <TextField
                  label="Nombre usuario"
                  value={usuario.usuario}
                  type='text'
                  fullWidth
                  variant="outlined"
                  disabled
                  sx={{ flex: '1 1 30%', minWidth: '295px' }}
                />

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
