import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

export default function Botonera (props) {
    const { descarga, agregar, editar, eliminar } = props
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          '& > *': {
            m: 1
          }
        }}
      >
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          {agregar}
          {editar}
          {descarga}
          {eliminar}
        </ButtonGroup>
      </Box>
    )
  }