import { TextField } from '@mui/material';

export default function TextArea(props) {
  const { id, label, name, value, onChange, required, disabled} = props;
    return (
            <TextField
              id={id}
              label={label}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              disabled={disabled}
              multiline
              maxRows={7}
              fullWidth
            />
          );
}
