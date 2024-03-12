import Sidebar from '../../components/sidebarComponent'
import { DashboardCard } from '../../components/dash/dashboardCart';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarIcon, ClockIcon, CalendarDaysIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';
const defaultValues = {
    citas_dia: 1,
    citas_restantes: 1,
    servicios_pendientes: 0,
    servicios_agregados: 1
}

export default function Home() {
    const [data, setData] = useState(defaultValues)
    const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('http://localhost:4321/inicio-gro');
                setData(data);
                setLastUpdateTime(new Date());
            } catch (error) {
                console.log(error);
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
            titulo: "Citas restantes",
            Info: data.citas_dia,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-blue-600-to-blue-400",
            icon: <CalendarIcon className='w-6 h-6' />,
        },

        {
            titulo: "Citas totales",
            Info: data.citas_restantes,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-pink-600-to-pink-400",
            icon: <CalendarDaysIcon className='w-6 h-6' />,
        },
        {
            titulo: "Servicios pendientes",
            Info: data.servicios_pendientes,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-orange-600-to-orange-400",
            icon: <ClockIcon className='w-6 h-6' />,
        },
        {
            titulo: "Servicios agregados hoy",
            Info: data.servicios_agregados,
            estado: formatTime(timeElapsed),
            iconColor: "bg-gradient-from-green-600-to-green-400",
            icon: <DocumentPlusIcon className='w-6 h-6' />,
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
        </div>

    );
}