import '../../index.css'
import Carnet from '../../components/veterinario/carnetVacunas'
import Sidebar from '../../components/sidebarComponent'
import Stack from '@mui/material/Stack';

export default function Home() {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <Stack
    spacing={2}
    sx={{
      position: 'fixed',
      top: 10,
      right: 6,
      bottom: 5,
      left: 'calc(22% + 3px)',
      p: [2, 3, 4],
      width: '77%',
      display: 'flex',
      overflow: 'auto'
    }}
  >
            <Carnet />
            </Stack>
        </div>
    );
}
