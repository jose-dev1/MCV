import Sidebar from '../../components/sidebarComponent'
import Table from '../../components/groomer/serviprestado'
import Stack from '@mui/material/Stack';
export default function HomeGroomer() {
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
            <Table />
            </Stack>
        </div>
    );
}