import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function InputTime(props) {
  const { label, hour, name, id, onChange, required, disabled } = props;
  
  // Parseamos la hora recibida a formato dayjs
  const initialHour = hour ? dayjs(hour, 'HH:mm') : dayjs();

  // Inicializamos el estado con la hora formateada
  const [value, setValue] = useState(initialHour.format('HH:mm'));

  useEffect(() => {
    // Actualizamos el estado si cambia la hora
    if (hour) {
      setValue(dayjs(hour, 'HH:mm').format('HH:mm'));
    }
  }, [hour]);

  const handleTimeChange = (time) => {
    setValue(time.format('HH:mm'));
    onChange(name, time.format('HH:mm'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        id={id}
        label={label}
        value={dayjs(value, 'HH:mm')} // Parseamos la hora actual al formato dayjs
        onChange={(time) => handleTimeChange(time)}
        required={required}
        disabled={disabled}
        fullWidth
      />
    </LocalizationProvider>
  );
}
