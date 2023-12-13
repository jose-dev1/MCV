import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function Selects (props) {
  const { id, label, name, onChange, value, items, required, disabled } = props
  return (

    <FormControl fullWidth>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        items={items}
        disabled={disabled}
      >
        {
        items.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
          >
            {item.value}
          </MenuItem>
        ))
      }
      </Select>
    </FormControl>
  )
}

export default Selects
