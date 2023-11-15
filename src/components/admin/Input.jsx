import { TextField } from '@mui/material'

export default function Input (props) {
  const { id, label, name, value, onChange, required } = props
  return (
    <TextField
      id={id}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
    />
  )
}
