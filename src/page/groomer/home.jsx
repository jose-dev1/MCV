import '../../index.css'
import Inicio from '../../components/groomer/inicioGroomer'
import Sidebar from '../../components/sidebarComponent'
import AlertComponent from '../../components/veterinario/alert';

const opciones = [
    {
        id: 1,
        titulo: 'Inicio',
        href: '/inicio-groomer',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        ,
        subtitiulo: 'Inicio Veterinario',
    },
    {
        id: 2,
        titulo: 'Servicio prestado',
        href: '/servicio-prestado',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
        ,
        subtitiulo: 'Inicio Veterinario',
    },




    // More products...
]

const citas = [
    {
        id: 1,
        name: 'Rodrigo Hernandez',
        href: '#',
        image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D',
        Fecha: '01/01/2024',
    },

    {
        id: 2,
        name: 'Julian Hernandez',
        href: '#',
        image: 'https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg',
        Fecha: '02/05/2024',
    },

    {
        id: 3,
        name: 'Andrea Guzman',
        href: '#',
        image: 'https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg',
        Fecha: '04/05/2024',
    },
    {
        id: 3,
        name: 'Samuel Vasquez',
        href: '#',
        image: 'https://pbs.twimg.com/media/EUXgF4hWkAEL2HE.jpg',
        Fecha: '05/05/2024',
    },

    // More products...
]




export default function Home() {

    return (

        <div className="w-full">

            <div className='flex gap-9'>
                <Sidebar />
                <div className='mt-10'>
                    <div className='fixed bg-white mt-10	w-80 mx-96' >
                        <AlertComponent
                            id="alert-additional-content-1"
                            color="blue"
                            title="Alert"
                            content=" Proximo servicio: 3:30 paciente: Sacha servicio: Baño "
                        />
                        {/* Add other AlertComponent instances as needed */}
                    </div>
                    <h2 className="mb-1 mt-1 text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-700 text-white p-2 rounded-lg">
                        Informacion Principal
                    </h2>
                    <Inicio opciones={opciones} citas={citas} />
                </div>
            </div>
        </div>

    );
}
