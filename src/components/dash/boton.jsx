import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

export default function Boton(props){
  const {bgColor, icon, tooltip, onClick, desable} = props
  return(
    <Tooltip title={tooltip}>
      <span>
        <Button onClick={onClick} color={bgColor} disabled={desable}>
          {icon}
        </Button>
      </span>
    </Tooltip>
  )
}