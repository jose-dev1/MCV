import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

export default function Botonera (props) {
    const { descarga, agregar, editar, eliminar, ver , title } = props
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
            m: 1
          }
        }}
      >
        <h1 className='text-center content-center text-5xl'>{title}</h1>
        <ButtonGroup className='justify-end' variant='outlined' aria-label='outlined button group'>
          {agregar}
          {editar}
          {descarga}
          {eliminar}
          {ver}
        </ButtonGroup>
      </Box>
    )
  }