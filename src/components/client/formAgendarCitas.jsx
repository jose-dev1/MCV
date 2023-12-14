import {
  LocalizationProvider,
  StaticDatePicker,
  TimePicker,
  esES,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/es";
import { Alert, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import Selects from '../admin/Selects';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import useForm from '../../Hooks/useForm';

const mascotas = [
  { id: 1, value: 'Max' },
  { id: 2, value: 'Luna' }
]

const serviciosVeterinario = [
  { id: 1, value: 'Consulta general' },
  { id: 2, value: 'Vacunación' },
  { id: 3, value: 'Cirugía menor' },
  { id: 4, value: 'Radiografía' },
  { id: 5, value: 'Análisis de sangre' }
];

const defaultValues={
  nombreMascota:1,
  tipoCita:1
}

export default function FormAgendarCitas() {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [error, setError] = useState('')
  const { values, handleInputChange } = useForm(defaultValues)
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const formErrores = {};
    Object.entries(values).forEach(([key, value]) => {
      if (!value || (typeof value.trim === 'function' && value.trim() === '')) {
          formErrores[key] = 'Error los campo no puede estar vacíos';
          
      }
    });

    if (Object.keys(formErrores).length > 0) {
      setError('Por favor, complete los campos nesesarios.');
      return;
    }else{
      setError('')
      return
    }
  }
  const theme = createTheme({
    palette: { primary: { main: '#1976d2' } },
  },esES);
  return (
    <ThemeProvider theme={theme}>
      <h1 className='text-6xl text-center mb-2' >Agendar Citas</h1>
      <div className='flex gap-20 items-center justify-center h-full'>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <StaticDatePicker
            className="border border-solid rounded-xl shadow-md hover:shadow-xl"
            defaultValue={dayjs()}
            label="Seleccione fecha"
          />
        </LocalizationProvider>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center border border-solid p-6 rounded-xl min-w-[500px] min-h-[400px] shadow-md hover:shadow-xl'>
          {error && (
            <Alert className='mb-2' severity="error">
              {error}
            </Alert>
          )}
          <h1 className='text-lg'>
            Dato adicionales
          </h1>
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sm={12}>
              <Selects
                id='nombreMascota'
                label='Mascota'
                name='nombreMascota'
                value={values.nombreMascota}
                items={mascotas}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Selects
                  id='tipoCita'
                  label='Tipo de servicio'
                  name='tipoCita'
                  value={values.tipoCita}
                  items={serviciosVeterinario}
                  onChange={handleInputChange}
                  required
                />
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  className='w-full'
                  defaultValue={dayjs()}  
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12}>
              <button
                type='submit'
                className='flex items-center justify-center w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-100 active:transform active:translate-y-1 gap-1'
                onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })} 
              >
                <EnvelopeIcon className='w-6 h-6'/> Agendar Cita
              </button>
            </Grid>
          </Grid>
      </form>
      </div>
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La cita ha sido agendada!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}
