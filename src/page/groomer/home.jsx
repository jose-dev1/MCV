import Sidebar from '../../components/sidebarComponent'
import Inicio from '../../components/veterinario/inicio'
import { BookOpenIcon, PencilSquareIcon, HomeIcon } from '@heroicons/react/24/outline'


const opciones = [
    {
        id: 1,
        titulo: 'Inicio',
        href: '/inicio-groomer',
        icon: <HomeIcon className='w-6 h-6' />
        ,
        subtitiulo: 'Inicio Auxiliar',
    },
    {
        id: 2,
        titulo: 'Servicio',
        href: '/servicio-prestado',
        icon: <PencilSquareIcon className='w-6 h-6' />        ,
        subtitiulo: 'Consulta o registra los servicos prestados',
    },
    {
        id: 3,
        titulo: 'Agenda',
        href: '#',
        icon: <BookOpenIcon className='w-6 h-6'/>,
        subtitiulo: 'Organiza tu agenda para gestionar tu tiempo',
    },
]

const citas = [
    {
        id: 1,
        name: 'Laura Martinez',
        href: '#',
        image: 'https://images.ecestaticos.com/4p56t84xWYPuXzT3ZBiUlj54RAs=/70x0:2638x1809/992x700/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F317%2Fae0%2F456%2F317ae0456e63bd37ce7fa809d5955672.jpg',
        Fecha: '10/15/2024',
    },

    {
        id: 2,
        name: 'Carlos Rodriguez',
        href: '#',
        image: 'https://www.redaccionmedica.com/images/destacados/las-personas-con-un-riesgo-genetico-bajo-de-tdah-son-mas-afortunadas--2868.jpg',
        Fecha: '11/20/2024',
    },

    {
        id: 3,
        name: 'Ana Ramirez',
        href: '#',
        image: 'https://pymstatic.com/5844/conversions/personas-emocionales-wide_webp.webp',
        Fecha: '12/25/2024',
    },
    {
        id: 4,
        name: 'David Lopez',
        href: '#',
        image: 'https://i0.wp.com/fundacionadecco.org/azimut/wp-content/uploads/2019/02/FESSER-2.jpg?fit=664%2C362&ssl=1',
        Fecha: '01/01/2025',
    },
];


export default function HomeGroomer() {
    return (
        <div className='flex gap-9'>
            <Sidebar />
            <div className='mt-10'>
                <Inicio opciones={opciones} citas={citas} />
            </div>
        </div>
    );
}