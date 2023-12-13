import '../../index.css'
import Carnet from '../../components/veterinario/carnetVacunas'
import Sidebar from '../../components/sidebarComponent'

export default function Home() {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <Carnet />
        </div>
    );
}
