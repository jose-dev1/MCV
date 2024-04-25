import {useState, useEffect} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function InputDate(props) {
  const { label, fecha, name, id, onChange, required, disabled, blockPastDates } = props;
  const [value, setValue] = useState(fecha==='' ? dayjs() : dayjs(fecha));

  useEffect(() => {
      setValue(fecha==='' ? dayjs() : dayjs(fecha))
  }, [fecha])

  const handleDateChange = (date) => {
    setValue(date)
    onChange(name, dayjs(date).format('YYYY-MM-DD'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        id={id}
        label={label}
        value={value}
        onChange={(date) => handleDateChange(date)}
        required={required}
        disabled={disabled}
        minDate={blockPastDates ? dayjs() : null}
        fullWidth
      />
    </LocalizationProvider>
  );
}
