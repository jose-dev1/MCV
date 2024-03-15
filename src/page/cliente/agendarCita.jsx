import React from 'react';
import Sidebar from '../../components/sidebarComponent';
import { Stack } from '@mui/material';
import FormAgendarCitas from '../../components/client/formAgendarCitas';
import WhatsAppComponent from '../../components/whatsappComponent';

export default function AgendarCita() {

  return (
    <div className="flex">
      <Sidebar />
      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          top: 10,
          right: 4,
          bottom: 5,
          left: 'calc(22% + 3px)',
          p: [2, 3, 4],
          width: '77%',
          display: 'flex',
          overflow: 'auto'
        }}
      >
        <FormAgendarCitas />
        <WhatsAppComponent />
      </Stack>
    </div>
  );
}