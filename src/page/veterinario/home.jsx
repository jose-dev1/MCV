import Sidebar from '../../components/sidebarComponent'
import { DashboardCard } from '../../components/dash/dashboardCart';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExclamationTriangleIcon, ClipboardDocumentCheckIcon, CalendarDaysIcon, BugAntIcon } from '@heroicons/react/24/outline';
import AlertPrincipal from '../../components/dash/alertPrincipal';
const defaultValues={
    hospitalizaciones_activas: '',
    citas_dia: '',
    examenes_pendientes: '',
    cantidad_mascotas: ''
}

export default function Home() {
    const [data, setData] = useState(defaultValues)
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:4321/inicio-vet');
                setData(data);
                setLastUpdateTime(new Date());
            } catch (error) {
                error.response.data.message ? setError(error.response.data.message) : setError('Error al conectar con el servidor')
            }
        };

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 15 * 60 * 1000); 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const elapsedTime = Math.floor((now - lastUpdateTime) / 1000);
            setTimeElapsed(elapsedTime);
        }, 1000); 

        return () => clearInterval(timer);
    }, [lastUpdateTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} m`;
    };

    const infoCard = [
        {
            titulo: "Hospitalizaciones Activas",
            Info: data.hospitalizaciones_activas,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-blue-600-to-blue-400",
            icon: <ClipboardDocumentCheckIcon className='w-6 h-6' />,
        },

        {
            titulo: "Citas del dia",
            Info: data.citas_dia,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-pink-600-to-pink-400",
            icon: <CalendarDaysIcon className='w-6 h-6' />,
        },
        {
            titulo: "Examenes sin resultado",
            Info: data.examenes_pendientes,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-orange-600-to-orange-400",
            icon: <ExclamationTriangleIcon className='w-6 h-6' />,
        },
        {
            titulo: "Mascotas registradas",
            Info: data.cantidad_mascotas,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-green-600-to-green-400",
            icon: <BugAntIcon className='w-6 h-6' />,
        },


    ]
    return (
        <div>
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
                }}>
                <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">
                    Informacion Principal
                </h2>
                <div className="mt-15">
                    <div className="mb-15 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                        {infoCard.map((data, index) => (
                            <DashboardCard key={index} {...data} />
                        ))}
                    </div>
                </div>
            </Stack>
            <AlertPrincipal severity='error' message={error}/>
        </div>

    );
}