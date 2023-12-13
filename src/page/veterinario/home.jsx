import '../../index.css'
import Inicio from '../../components/veterinario/inicio'
import Sidebar from '../../components/sidebarComponent'

export default function Home() {
    return (
        <div className='flex gap-9'>
            <Sidebar />
            <div className='mt-10'>
            <Inicio />
            </div>
        </div>
    );
}
