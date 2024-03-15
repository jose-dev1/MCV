import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function redirectToWhatsApp() {
  const phoneNumber = '123456789';
  const url = `https://wa.me/${phoneNumber}`;
  window.open(url, '_blank');
}

export default function WhatsAppComponent (){
  return (
    <Box
    sx={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      '& > :not(style)': { m: 1 }
    }}
  >
    <Tooltip title="Agenda tu cita" aria-label="add">
      <Fab color="success" aria-label="add" onClick={redirectToWhatsApp}>
        <WhatsAppIcon />
      </Fab>
    </Tooltip>
  </Box>
  )
}