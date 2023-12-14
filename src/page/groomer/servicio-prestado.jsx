import Sidebar from '../../components/sidebarComponent'
import Table from '../../components/groomer/serviprestado'
export default function HomeGroomer() {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <Table />
        </div>
    );
}