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
         <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">{title}</h2>
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