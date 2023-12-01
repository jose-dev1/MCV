import React from 'react';
import SideNav from '../../components/sidebarComponent';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
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
import '../../assets/css/sidebar.css'

dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

function Perfil() {


  return (
    <div style={{ display: 'flex' }}>
      <SideNav user={JSON.parse(localStorage.getItem('user'))} />
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
        <Alert severity="info">
          <AlertTitle>Información importante</AlertTitle>
          Si desea obtener todos los beneficios que ofrece la aplicación mi can veterinaria (MCV) —{' '}
          <strong>¡Completa tu registro!</strong>
        </Alert>

        <div className='p-4 shadow-md rounded-xl'>
          <from >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={3}>
                    <TextField label="Primer nombre" fullWidth variant="outlined" sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Segundo nombre" fullWidth variant="outlined" sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Primer apellido" variant="outlined" sx={{ marginBottom: 1 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Segundo apellido" fullWidth variant="outlined" sx={{ marginBottom: 2 }} />
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="tipo-documento-label">Tipo de documento</InputLabel>
                      <Select
                        labelId="tipo-documento-label"
                        id="tipo-documento"
                        label="Tipo de documento"
                        fullWidth
                      >
                        <MenuItem value="C.C">Cedula de Ciudadania (C.C)</MenuItem>
                        <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                        <MenuItem value="C.E">Carnet de Extrangeria (C.E)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="Numero de documento" fullWidth variant="outlined" sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Fecha de expedicion" />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={6}>
                    <TextField label="Direccion" fullWidth variant="outlined" sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Telefono" fullWidth variant="outlined" sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="tipo-documento-label">Lugar de nacimiento</InputLabel>
                      <Select
                        labelId="tipo-documento-label"
                        id="tipo-documento"
                        label="Tipo de documento"
                        fullWidth
                      >
                        <MenuItem value="Bogota">Bogota (DC)</MenuItem>
                        <MenuItem value="Cucuta">Cucuta</MenuItem>
                        <MenuItem value="Cartagena">Cartagena</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <button
              type="submit"
              className="block mx-auto w-48 rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Enviar
            </button>
          </from>
        </div>
      </Stack>
      <div className='mt-rem ml-3'>
        <MacotaPerfil />
      </div>
    </div>
  );
}

export default Perfil;
