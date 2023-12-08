import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

export default function Boton(props){
  const {bgColor, icon, tooltip, onClick} = props
  return(
    <Tooltip title={tooltip}>
      <Button onClick={onClick} color={bgColor}>
        {icon}
      </Button>
    </Tooltip>
  )
}