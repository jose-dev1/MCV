import '../../index.css'
import Inicio from '../../components/veterinario/inicio'
import Sidebar from '../../components/sidebarComponent'

export default function Home() {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <Inicio />
        </div>
    );
}
